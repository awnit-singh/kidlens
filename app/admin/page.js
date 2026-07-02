import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getShows } from "@/lib/store";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const metadata = { title: "Admin — KidLens", robots: "noindex" };
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  const shows = await getShows();
  return <AdminDashboard shows={shows} email={session.email} />;
}
