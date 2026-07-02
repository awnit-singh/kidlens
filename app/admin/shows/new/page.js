import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import ShowForm from "@/components/admin/ShowForm";

export const metadata = { title: "Add show — KidLens admin", robots: "noindex" };
export const dynamic = "force-dynamic";

export default async function NewShowPage() {
  if (!(await getSession())) redirect("/admin/login");
  return <ShowForm mode="new" />;
}
