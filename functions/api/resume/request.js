// POST /api/resume/request: saves who asked for the resume and returns a short-lived download link.
import { json, hmac, TOKEN_TTL_SECONDS } from '../../_lib.js';

const LIMITS = { name: 120, email: 200, company: 160, linkedin: 300, message: 1000 };
const clean = (v, max) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export async function onRequestPost({ request, env }) {
  let body;
  try { body = await request.json(); } catch { return json({ error: 'Invalid request.' }, 400); }
  if (body.website) return json({ error: 'Invalid request.' }, 400); // honeypot field, hidden from people

  const data = {};
  for (const [k, max] of Object.entries(LIMITS)) data[k] = clean(body[k], max);
  if (!data.name || !data.email || !data.company) return json({ error: 'Name, email and company are required.' }, 400);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return json({ error: 'Please enter a valid email address.' }, 400);
  if (data.linkedin && !/^https?:\/\//i.test(data.linkedin)) data.linkedin = `https://${data.linkedin}`;

  try {
    const cf = request.cf || {};
    const id = crypto.randomUUID();
    await env.DB.prepare(
      `INSERT INTO resume_requests (id, created_at, name, email, company, linkedin, message, country, city, user_agent, referer)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      id, new Date().toISOString(), data.name, data.email, data.company, data.linkedin, data.message,
      cf.country || '', cf.city || '', (request.headers.get('user-agent') || '').slice(0, 300),
      (request.headers.get('referer') || '').slice(0, 300)
    ).run();

    const exp = Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS;
    const sig = await hmac(env.RESUME_SECRET, `${id}.${exp}`);
    return json({ url: `/api/resume/download?id=${id}&exp=${exp}&sig=${sig}` });
  } catch (err) {
    console.error(err);
    return json({ error: 'Something went wrong. Please try again.' }, 500);
  }
}
