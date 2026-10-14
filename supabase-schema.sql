-- =========================================================================
-- AdaptLearn: Supabase Database Schema
-- Personalized Tutoring with Adaptive Learning Platform
-- =========================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table (Extends Supabase Auth or Standalone Users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE,
    full_name TEXT NOT NULL,
    avatar_url TEXT,
    department TEXT NOT NULL DEFAULT 'Computer Science & Engineering',
    semester INTEGER NOT NULL DEFAULT 4,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Topic Mastery Table (Stores real-time adaptive metrics per user and topic)
CREATE TABLE IF NOT EXISTS public.topic_mastery (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject_id TEXT NOT NULL,
    topic_id TEXT NOT NULL,
    attempts_count INTEGER DEFAULT 0,
    correct_count INTEGER DEFAULT 0,
    mastery_level TEXT DEFAULT 'Novice', -- 'Novice', 'Developing', 'Proficient', 'Master'
    mastery_score NUMERIC(5,2) DEFAULT 0.0, -- 0 to 100 percentage
    last_studied_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    misconceptions JSONB DEFAULT '[]'::jsonb,
    UNIQUE(user_id, topic_id)
);

-- 3. Quiz Attempts Table (Logs complete session histories)
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    subject_id TEXT NOT NULL,
    subject_title TEXT NOT NULL,
    topic_id TEXT,
    topic_title TEXT,
    mode TEXT NOT NULL DEFAULT 'adaptive', -- 'adaptive', 'practice', 'unit-test'
    total_questions INTEGER NOT NULL,
    correct_answers INTEGER NOT NULL,
    score_percentage NUMERIC(5,2) NOT NULL,
    avg_time_seconds NUMERIC(6,2),
    starting_difficulty TEXT,
    ending_difficulty TEXT,
    question_details JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Bookmarks Table (Saved topics, cheat sheets, and tricky questions)
CREATE TABLE IF NOT EXISTS public.bookmarks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    item_type TEXT NOT NULL, -- 'topic', 'question', 'note'
    item_id TEXT NOT NULL,
    title TEXT NOT NULL,
    meta JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, item_type, item_id)
);

-- 5. Row Level Security (RLS) Policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topic_mastery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

-- Anonymous and Authenticated read/write policies for frictionless demo access
CREATE POLICY "Allow public read on profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Allow public insert/update on profiles" ON public.profiles FOR ALL USING (true);

CREATE POLICY "Allow public all on topic_mastery" ON public.topic_mastery FOR ALL USING (true);
CREATE POLICY "Allow public all on quiz_attempts" ON public.quiz_attempts FOR ALL USING (true);
CREATE POLICY "Allow public all on bookmarks" ON public.bookmarks FOR ALL USING (true);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_topic_mastery_user ON public.topic_mastery(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user ON public.quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user ON public.bookmarks(user_id);
