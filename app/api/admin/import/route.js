import { getSession } from "@/lib/auth";
import { getShows, saveShows } from "@/lib/store";
import { showsFromCSV } from "@/lib/shows-io";

/* Batch upsert from CSV. Rows match existing shows by slug (update)
   or create new ones. All-or-nothing: any invalid row aborts the
   whole import so a typo can't half-apply a spreadsheet. */
export async function POST(request) {
  if (!(await getSession()))
    return Response.json({ error: "Not signed in." }, { status: 401 });

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const csv = String(body?.csv || "");
  if (!csv.trim())
    return Response.json({ errors: ["No CSV content received."] }, { status: 400 });

  const { shows: incoming, errors } = showsFromCSV(csv);
  if (errors.length) return Response.json({ errors }, { status: 400 });
  if (!incoming.length)
    return Response.json({ errors: ["No data rows found."] }, { status: 400 });

  const existing = await getShows();
  const bySlug = new Map(existing.map((s) => [s.slug, s]));
  let created = 0;
  let updated = 0;
  for (const show of incoming) {
    if (bySlug.has(show.slug)) updated += 1;
    else created += 1;
    bySlug.set(show.slug, show);
  }

  await saveShows([...bySlug.values()]);
  return Response.json({ ok: true, created, updated });
}
