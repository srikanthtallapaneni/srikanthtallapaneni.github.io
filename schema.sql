-- Run once: npx wrangler d1 execute portfolio-resume --remote --file=schema.sql
CREATE TABLE IF NOT EXISTS resume_requests (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  linkedin TEXT,
  message TEXT,
  country TEXT,
  city TEXT,
  user_agent TEXT,
  referer TEXT,
  downloads INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_resume_requests_created ON resume_requests (created_at);
