// Blocks direct access to anything under /private (the resume PDF). Only /api/resume/download serves it.
export const onRequest = () => new Response('Not found', { status: 404 });
