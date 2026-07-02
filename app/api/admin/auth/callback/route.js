import {
  createSessionToken,
  isAdminEmail,
  sessionCookieHeader,
  verifyToken,
} from "@/lib/auth";

export async function GET(request) {
  const token = new URL(request.url).searchParams.get("token");
  const payload = token ? verifyToken(token) : null;

  if (!payload || payload.kind !== "login" || !isAdminEmail(payload.email)) {
    return new Response(null, {
      status: 303,
      headers: { Location: "/admin/login?error=expired" },
    });
  }

  return new Response(null, {
    status: 303,
    headers: {
      Location: "/admin",
      "Set-Cookie": sessionCookieHeader(createSessionToken(payload.email)),
    },
  });
}
