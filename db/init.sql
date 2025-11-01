-- Database initialization script for ULead portal
-- This script creates the core tables and seeds essential content for the zh/news page.

BEGIN;

CREATE TABLE IF NOT EXISTS team_members (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  order_index INTEGER NOT NULL DEFAULT 0,
  name_zh TEXT NOT NULL DEFAULT '',
  title_zh TEXT NOT NULL DEFAULT '',
  description_zh TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS mentor (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  degree TEXT,
  institution TEXT,
  research_domains TEXT,
  projects TEXT,
  supported_programs TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS offer (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL,
  logo TEXT NOT NULL,
  count INTEGER NOT NULL,
  name TEXT NOT NULL,
  name_cn TEXT,
  country TEXT,
  rank TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS summer_school (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  description TEXT NOT NULL,
  programs JSONB NOT NULL DEFAULT '[]'::JSONB,
  type TEXT NOT NULL CHECK (type IN ('university', 'highschool')),
  href TEXT,
  image TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS success_story (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('University', 'HighSchool')),
  name TEXT NOT NULL,
  image TEXT,
  school TEXT NOT NULL,
  labels TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  offers TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  evaluation TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS alumni (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  image TEXT NOT NULL,
  highschool TEXT NOT NULL,
  university TEXT NOT NULL,
  university_logo TEXT NOT NULL,
  title TEXT,
  highschool_cn TEXT,
  university_cn TEXT,
  labels TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  evaluation TEXT,
  plan TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS alumni_hs (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  school TEXT NOT NULL,
  school_logo TEXT NOT NULL,
  offers TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  tags TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS target_school (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  state TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tag_color (
  id SERIAL PRIMARY KEY,
  type TEXT NOT NULL UNIQUE,
  color TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS tag (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  type TEXT NOT NULL,
  pos TEXT NOT NULL CHECK (pos IN ('top', 'bottom')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS contact_us (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  contact TEXT NOT NULL,
  source TEXT,
  questions TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

DROP TABLE IF EXISTS news;

CREATE TABLE news (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT,
  badges TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  excerpt TEXT,
  published_at DATE NOT NULL,
  image_url TEXT NOT NULL,
  external_url TEXT NOT NULL,
  is_top BOOLEAN NOT NULL DEFAULT FALSE,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_news_published_at ON news (published_at DESC);

-- Seed zh news content

INSERT INTO news (
  title,
  author,
  badges,
  excerpt,
  published_at,
  image_url,
  external_url,
  is_top
) VALUES
  (
    '迈向哥伦比亚大学与朱莉亚音乐学院：从 Top 30 美高到学术与艺术的双重巅峰',
    '合领教育王晓丹',
    ARRAY['IECA认证专业顾问'],
    '在合领晓丹老师团队的陪伴下，这位就读于美国 Top 30 寄宿高中的女生成功收获了哥伦比亚大学与朱莉亚音乐学院的录取，成为我们今年最令人骄傲的综合型文理+艺术型申请案例之一。',
    '2025-07-25',
    '/img/news/n1.png',
    '/news/columbia-juilliard',
    TRUE
  ),
  (
    '晓丹老师2025英高录取成果',
    '合领教育王晓丹',
    ARRAY['IECA认证专业顾问'],
    '同学们、伙伴们，你们经受了勇气与拼搏，才迎来今天的成长与收获。每位家长用心陪伴，合领陪伴学生的选校规划、面试与申请，见证一学年的努力与跨越。',
    '2025-03-11',
    '/img/news/n2.png',
    '/news/kse-2025-admits',
    TRUE
  ),
  (
    '合领 × ETS veriii assessment 正式上线——破除学术成果认证难题，开启全球科研能力展示新通道',
    '合领教育王晓丹',
    ARRAY['IECA认证专业顾问'],
    '由 KSE Global 联合 ETS（美国教育考试服务中心）共同开发的 veriii assessment 科研能力评估平台今日正式上线，帮助学生以标准化方式展示研究能力与产出。',
    '2025-08-15',
    '/img/news/n3.png',
    '/news/veriii-assessment-launch',
    FALSE
  ),
  (
    '合领教育 × Duke｜独家科研计划 与顶尖教授接洽并肩科研写作并期刊发表',
    '合领教育王晓丹',
    ARRAY['IECA认证专业顾问'],
    '面向对科研写作有强烈兴趣的同学开放；与导师一对一打磨课题、完成研究设计与数据分析，并在导师指导下冲刺期刊发表，获得 RA 实战体验。',
    '2025-08-15',
    '/img/news/n4.png',
    '/news/duke-research-program-2025',
    FALSE
  )
ON CONFLICT DO NOTHING;

COMMIT;
