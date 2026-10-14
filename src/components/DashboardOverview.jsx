// =========================================================================
// AdaptLearn Main Dashboard Overview Component
// Step 1: Website UI & Dashboard
// Step 11: Personalized Topic Recommendations ("Next Best Action")
// Complete Integration with Multimodal Knowledge Base & Adaptive Engines
// =========================================================================

import React from 'react';
import {
  Sparkles,
  BookOpen,
  Zap,
  Target,
  Brain,
  UploadCloud,
  Layers,
  Calendar,
  ShieldCheck,
  ArrowRight,
  Flame,
  Award,
  Play
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import DepartmentSemesterSelector from './DepartmentSemesterSelector';

export default function DashboardOverview() {
  const {
    user,
    recommendations,
    analyticsSummary,
    setCurrentView,
    currentSubjects,
    openTopicStudy,
    startTopicQuiz
  } = useApp();

  return (
    <div>
      {/* Welcome Hero Banner */}
      <div
        className="card"
        style={{
          marginBottom: '24px',
          background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.12) 0%, rgba(124, 58, 237, 0.05) 100%)',
          borderLeft: '4px solid var(--accent-primary)',
          padding: '28px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-primary)' }}>
                STATEMENT 2: Personalized Tutoring with Adaptive Learning
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Multimodal Source-Grounded AI
              </span>
            </div>

            <h1 style={{ fontSize: '28px', fontWeight: 800, margin: '4px 0 8px', color: 'var(--text-primary)' }}>
              Welcome back, {user?.full_name?.split(' ')[0] || 'Learner'}!
            </h1>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '720px', margin: 0, lineHeight: 1.6 }}>
              Your academic companion unifies textbook chapters, lecture slides, and video archives into a verified, source-cited knowledge base with real-time Bayesian student mastery tracking.
            </p>
          </div>

          <div
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              padding: '12px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: 'var(--shadow-sm)'
            }}
          >
            <Flame size={24} color="#f59e0b" />
            <div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)' }}>
                {user?.streak || 5} Days
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Current Study Streak</div>
            </div>
          </div>
        </div>
      </div>

      {/* Department & Semester Selection Component (Steps 3 & 4) */}
      <DepartmentSemesterSelector />

      {/* Feature Navigation Hub (Official Statement 2 Deliverables) */}
      <div style={{ marginBottom: '28px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '14px' }}>
          Core AI Capabilities & Workbenches
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '14px' }}>
          {/* 1. Multimodal Knowledge Ingestion */}
          <div
            onClick={() => setCurrentView('ingest')}
            className="card card-clickable"
            style={{ display: 'flex', gap: '14px', alignItems: 'center' }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: 'var(--accent-light)',
                color: 'var(--accent-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <UploadCloud size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Knowledge Base Ingestion
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Ingest books, slides & timestamped videos (Req 1)
              </div>
            </div>
          </div>

          {/* 2. Source Grounded Tutor Chat */}
          <div
            onClick={() => setCurrentView('tutor-chat')}
            className="card card-clickable"
            style={{ display: 'flex', gap: '14px', alignItems: 'center' }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: 'var(--color-success-bg)',
                color: 'var(--color-success)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Brain size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Source-Grounded AI Tutor
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Exact page citations & audio speech (Req 2)
              </div>
            </div>
          </div>

          {/* 3. Course Flow Prerequisite Map */}
          <div
            onClick={() => setCurrentView('course-flow')}
            className="card card-clickable"
            style={{ display: 'flex', gap: '14px', alignItems: 'center' }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: '#fffbeb',
                color: '#d97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Layers size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Course Flow & Prerequisites
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Visual syllabus flow graph (Req 6.a)
              </div>
            </div>
          </div>

          {/* 4. Revision & Spaced Repetition */}
          <div
            onClick={() => setCurrentView('revision')}
            className="card card-clickable"
            style={{ display: 'flex', gap: '14px', alignItems: 'center' }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: '#eff6ff',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <Calendar size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                Revision & Spaced Repetition
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Flashcards & forgetting curves (Req 6.b/c)
              </div>
            </div>
          </div>

          {/* 5. System Evaluation Benchmarks */}
          <div
            onClick={() => setCurrentView('evaluation')}
            className="card card-clickable"
            style={{ display: 'flex', gap: '14px', alignItems: 'center' }}
          >
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '10px',
                backgroundColor: '#faf5ff',
                color: '#9333ea',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}
            >
              <ShieldCheck size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                System Evaluation & RAGAS
              </div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Faithfulness, Recall & Simulation (Req 5)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Personalized Topic Recommendations (Step 11: "Next Best Action") */}
      <div className="card" style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={18} color="var(--accent-primary)" />
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              Personalized Recommendations (Next Best Action - Step 11)
            </h3>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            AI-computed based on recent accuracy & Bayesian knowledge gaps
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {recommendations.slice(0, 3).map((rec) => {
            const subject = currentSubjects.find(s => s.id === rec.subjectId) || currentSubjects[0];
            let targetTopic = null;
            if (subject) {
              subject.units.forEach(u => {
                const found = u.topics.find(t => t.id === rec.topicId);
                if (found) targetTopic = found;
              });
            }

            return (
              <div
                key={rec.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  backgroundColor: 'var(--bg-surface-secondary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        padding: '2px 7px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: rec.priority === 'High' ? 'var(--color-danger-bg)' : 'var(--accent-light)',
                        color: rec.priority === 'High' ? 'var(--color-danger)' : 'var(--accent-primary)'
                      }}
                    >
                      {rec.priority} Priority
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {rec.topicTitle}
                    </span>
                  </div>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                    {rec.reason} • <b>{rec.subjectTitle}</b>
                  </div>
                </div>

                {targetTopic && (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => openTopicStudy(subject, targetTopic)}
                      className="btn btn-secondary btn-sm"
                    >
                      Review Material
                    </button>
                    <button
                      onClick={() => startTopicQuiz(subject, targetTopic)}
                      className="btn btn-primary btn-sm"
                    >
                      <Zap size={14} />
                      <span>{rec.actionLabel}</span>
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
