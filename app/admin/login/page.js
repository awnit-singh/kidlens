import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import LoginForm from "@/components/admin/LoginForm";

export const metadata = { title: "Admin sign-in — KidLens", robots: "noindex" };

export default async function AdminLoginPage({ searchParams }) {
  if (await getSession()) redirect("/admin");
  const { error } = await searchParams;
  return <LoginForm expired={error === "expired"} />;
}
