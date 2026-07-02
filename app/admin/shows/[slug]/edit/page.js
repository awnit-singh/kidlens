import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getShowBySlug } from "@/lib/store";
import ShowForm from "@/components/admin/ShowForm";

export const metadata = { title: "Edit show — KidLens admin", robots: "noindex" };
export const dynamic = "force-dynamic";

export default async function EditShowPage({ params }) {
  if (!(await getSession())) redirect("/admin/login");
  const { slug } = await params;
  const show = await getShowBySlug(slug);
  if (!show) notFound();
  return <ShowForm mode="edit" show={show} />;
}
