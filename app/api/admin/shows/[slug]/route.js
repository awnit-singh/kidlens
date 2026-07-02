import { getSession } from "@/lib/auth";
import { getShows, saveShows } from "@/lib/store";
import { normalizeShow, validateShow } from "@/lib/shows-io";

/* Update an existing show (slug itself is immutable). */
export async function PUT(request, { params }) {
  if (!(await getSession()))
    return Response.json({ error: "Not signed in." }, { status: 401 });

  const { slug } = await params;
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body." }, { status: 400 });
  }

  const show = normalizeShow({ ...body, slug });
  const errors = validateShow(show);
  if (errors.length) return Response.json({ errors }, { status: 400 });

  const shows = await getShows();
  const idx = shows.findIndex((s) => s.slug === slug);
  if (idx === -1)
    return Response.json(
      { errors: [`No show with slug "${slug}".`] },
      { status: 404 }
    );

  const next = [...shows];
  next[idx] = show;
  await saveShows(next);
  return Response.json({ ok: true, slug });
}

export async function DELETE(request, { params }) {
  if (!(await getSession()))
    return Response.json({ error: "Not signed in." }, { status: 401 });

  const { slug } = await params;
  const shows = await getShows();
  const next = shows.filter((s) => s.slug !== slug);
  if (next.length === shows.length)
    return Response.json(
      { errors: [`No show with slug "${slug}".`] },
      { status: 404 }
    );

  await saveShows(next);
  return Response.json({ ok: true });
}
