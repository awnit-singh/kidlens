import { getSession } from "@/lib/auth";
import { getShows } from "@/lib/store";
import { showsToCSV } from "@/lib/shows-io";

/* Download all shows as CSV — doubles as the import template. */
export async function GET() {
  if (!(await getSession()))
    return Response.json({ error: "Not signed in." }, { status: 401 });

  const shows = await getShows();
  return new Response(showsToCSV(shows), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="kidlens-shows.csv"`,
    },
  });
}
