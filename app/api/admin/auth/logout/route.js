import { clearSessionCookieHeader } from "@/lib/auth";

export async function POST() {
  return new Response(null, {
    status: 303,
    headers: {
      Location: "/admin/login",
      "Set-Cookie": clearSessionCookieHeader(),
    },
  });
}
