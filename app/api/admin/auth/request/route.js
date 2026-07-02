import { Resend } from "resend";
import { createLoginToken, isAdminEmail } from "@/lib/auth";

const FROM_EMAIL =
  process.env.ADMIN_FROM_EMAIL || "KidLens <onboarding@resend.dev>";

function siteOrigin(request) {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, "");
  const proto = request.headers.get("x-forwarded-proto") || "http";
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  return `${proto}://${host}`;
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = String(body?.email || "").trim().toLowerCase();
  const genericOk = {
    ok: true,
    message: "If that address is the admin, a sign-in link is on its way.",
  };

  /* Never reveal which addresses are admins. */
  if (!isAdminEmail(email)) return Response.json(genericOk);

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set — cannot send sign-in link.");
    return Response.json(
      { error: "Email is not configured on the server." },
      { status: 500 }
    );
  }

  const link = `${siteOrigin(request)}/api/admin/auth/callback?token=${encodeURIComponent(
    createLoginToken(email)
  )}`;

  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Your KidLens admin sign-in link",
      text: `Sign in to the KidLens admin:\n\n${link}\n\nThis link expires in 15 minutes. If you didn't request it, ignore this email.`,
      html: `<div style="font-family: sans-serif; line-height: 1.6; color: #2E3D44;">
        <h2 style="margin: 0 0 12px;">Sign in to KidLens admin</h2>
        <p><a href="${link}" style="display:inline-block;background:#F1683C;color:#fff;font-weight:700;padding:12px 24px;border-radius:999px;text-decoration:none;">Sign in</a></p>
        <p style="color:#5C6D74;font-size:14px;">This link expires in 15 minutes. If you didn't request it, ignore this email.</p>
      </div>`,
    });
    if (error) {
      console.error("Resend error sending sign-in link:", error);
      return Response.json(
        { error: "Could not send the sign-in email. Check the server logs." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("Sign-in email failed:", err);
    return Response.json(
      { error: "Could not send the sign-in email. Check the server logs." },
      { status: 502 }
    );
  }

  return Response.json(genericOk);
}
