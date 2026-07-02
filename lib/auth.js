import crypto from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "kidlens_admin";
const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days
const LOGIN_TOKEN_MAX_AGE = 60 * 15; // 15 minutes

function secret() {
  const s = process.env.AUTH_SECRET;
  if (!s) throw new Error("AUTH_SECRET is not set");
  return s;
}

/* Comma-separated allowlist, e.g. ADMIN_EMAILS=awnit@stanford.edu */
export function adminEmails() {
  return (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email) {
  return adminEmails().includes(String(email || "").trim().toLowerCase());
}

function hmac(body) {
  return crypto.createHmac("sha256", secret()).update(body).digest();
}

export function signToken(payload, maxAgeSeconds) {
  const body = Buffer.from(
    JSON.stringify({ ...payload, exp: Date.now() + maxAgeSeconds * 1000 })
  ).toString("base64url");
  return `${body}.${hmac(body).toString("base64url")}`;
}

export function verifyToken(token) {
  if (typeof token !== "string") return null;
  const [body, mac] = token.split(".");
  if (!body || !mac) return null;
  let given;
  try {
    given = Buffer.from(mac, "base64url");
  } catch {
    return null;
  }
  const expected = hmac(body);
  if (given.length !== expected.length || !crypto.timingSafeEqual(given, expected))
    return null;
  let payload;
  try {
    payload = JSON.parse(Buffer.from(body, "base64url").toString());
  } catch {
    return null;
  }
  if (!payload.exp || Date.now() > payload.exp) return null;
  return payload;
}

export function createLoginToken(email) {
  return signToken({ kind: "login", email: email.toLowerCase() }, LOGIN_TOKEN_MAX_AGE);
}

export function createSessionToken(email) {
  return signToken({ kind: "session", email: email.toLowerCase() }, SESSION_MAX_AGE);
}

/* Session payload if the request carries a valid admin cookie, else null.
   Works in pages, layouts, and route handlers. */
export async function getSession() {
  const jar = await cookies();
  const raw = jar.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  const payload = verifyToken(raw);
  if (!payload || payload.kind !== "session" || !isAdminEmail(payload.email))
    return null;
  return payload;
}

export function sessionCookieHeader(token) {
  return `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${SESSION_MAX_AGE}`;
}

export function clearSessionCookieHeader() {
  return `${SESSION_COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`;
}
