// GET /api/admin/resume-requests?key=ADMIN_KEY: everyone who requested the resume, as CSV (or &format=json).
import { json, safeEqual } from '../../_lib.js';

const csvCell = v => `"${String(v ?? '').replace(/"/g, '""')}"`;

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  if (!env.ADMIN_KEY || !safeEqual(url.searchParams.get('key') || '', env.ADMIN_KEY)) return json({ error: 'Not found.' }, 404);
  const { results } = await env.DB.prepare('SELECT * FROM resume_requests ORDER BY created_at DESC LIMIT 1000').all();
  if (url.searchParams.get('format') === 'json') return json(results);
  const cols = ['created_at', 'name', 'email', 'company', 'linkedin', 'message', 'downloads', 'country', 'city', 'referer', 'user_agent'];
  const csv = [cols.join(','), ...results.map(r => cols.map(c => csvCell(r[c])).join(','))].join('\n');
  return new Response(csv, {
    headers: {
      'content-type': 'text/csv; charset=utf-8',
      'content-disposition': 'attachment; filename="resume-requests.csv"',
      'cache-control': 'no-store',
    },
  });
}
