import { getSession } from "@/lib/auth";
import { getShows, saveShows } from "@/lib/store";
import { normalizeShow, validateShow } from "@/lib/shows-io";

/* Create a new show. */
export async function POST(request) {
  if (!(await getSession()))
    return Response.json({ error: "Not signed in." }, { status: 401 });

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const show = normalizeShow(body);
  const errors = validateShow(show);
  if (errors.length) return Response.json({ errors }, { status: 400 });

  const shows = await getShows();
  if (shows.some((s) => s.slug === show.slug))
    return Response.json(
      { errors: [`A show with slug "${show.slug}" already exists.`] },
      { status: 409 }
    );

  await saveShows([...shows, show]);
  return Response.json({ ok: true, slug: show.slug });
}
