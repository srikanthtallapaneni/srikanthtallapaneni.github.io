// GET /api/resume/download?id&exp&sig: serves the PDF for a valid, unexpired link and counts the download.
import { json, hmac, safeEqual, FILE_NAME, PDF_PATH } from '../../_lib.js';

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const id = url.searchParams.get('id') || '';
  const exp = Number(url.searchParams.get('exp'));
  const sig = url.searchParams.get('sig') || '';
  if (!id || !exp || exp < Date.now() / 1000) return json({ error: 'This download link has expired. Please fill the form again.' }, 403);
  if (!safeEqual(sig, await hmac(env.RESUME_SECRET, `${id}.${exp}`))) return json({ error: 'Invalid download link.' }, 403);

  await env.DB.prepare('UPDATE resume_requests SET downloads = downloads + 1 WHERE id = ?').bind(id).run();
  const file = await env.ASSETS.fetch(new URL(PDF_PATH, url.origin));
  if (!file.ok) return json({ error: 'Resume not found.' }, 404);
  return new Response(file.body, {
    headers: {
      'content-type': 'application/pdf',
      'content-disposition': `attachment; filename="${FILE_NAME}"`,
      'cache-control': 'private, no-store',
    },
  });
}
