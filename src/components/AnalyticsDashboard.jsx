// =========================================================================
// AdaptLearn Performance Analytics & Diagnostic Dashboard Component
// Step 10: Analyze Student Strengths and Weaknesses
// Step 13: Create the Performance Analytics Dashboard
// =========================================================================

import React from 'react';
import {
  TrendingUp,
  Award,
  AlertCircle,
  CheckCircle2,
  Clock,
  Target,
  BarChart2,
  Zap,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function AnalyticsDashboard() {
  const {
    analyticsSummary,
    quizHistory,
    currentSubjects,
    openTopicStudy,
    startTopicQuiz,
    setCurrentView
  } = useApp();

  const {
    overallAccuracy,
    totalQuestionsAnswered,
    totalCorrect,
    topicStats,
    weakTopics,
    strongTopics
  } = analyticsSummary;

  // Flatten topics from current curriculum for reference
  const allCurrentTopics = [];
  currentSubjects.forEach(s => {
    s.units.forEach(u => {
      u.topics.forEach(t => {
        allCurrentTopics.push({ ...t, subject: s });
      });
    });
  });

  return (
    <div>
      {/* Top Banner */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px' }}>
          Performance Analytics & Diagnostic Dashboard (Steps 10 & 13)
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
          Continuous cognitive tracking, misconception diagnostics, and topic mastery modeling.
        </p>
      </div>

      {/* 4 Metric Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          marginBottom: '28px'
        }}
      >
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Overall Accuracy</span>
            <Target size={18} color="var(--accent-primary)" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)' }}>
            {overallAccuracy}%
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            {totalCorrect} of {totalQuestionsAnswered} questions correct
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Total Quizzes</span>
            <BarChart2 size={18} color="#3b82f6" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text-primary)' }}>
            {quizHistory.length}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Adaptive test sessions logged
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Mastered Topics</span>
            <Award size={18} color="var(--color-success)" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-success)' }}>
            {strongTopics.length}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Score ≥ 75% retention threshold
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Topics To Reinforce</span>
            <AlertCircle size={18} color="var(--color-warning)" />
          </div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--color-warning)' }}>
            {weakTopics.length}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
            Accuracy &lt; 60% (Priority Revision)
          </div>
        </div>
      </div>

      {/* Grid: Strengths & Weaknesses Breakdown (Step 10) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '20px',
          marginBottom: '28px'
        }}
      >
        {/* Identified Weak Areas */}
        <div className="card" style={{ borderLeft: '4px solid var(--color-warning)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <AlertCircle size={20} color="var(--color-warning)" />
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              Weak Topics & Misconceptions (Needs Work)
            </h3>
          </div>

          {weakTopics.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13.5px' }}>
              No critical weak areas identified! Take more quizzes to discover gaps.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {weakTopics.map(w => {
                const topicObj = allCurrentTopics.find(t => t.id === w.topicId);
                return (
                  <div
                    key={w.topicId}
                    style={{
                      padding: '12px 14px',
                      backgroundColor: 'var(--bg-surface-secondary)',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {topicObj?.title || w.topicId}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--color-danger)', fontWeight: 600 }}>
                        Mastery: {w.score}% ({w.tier})
                      </div>
                    </div>
                    {topicObj && (
                      <button
                        onClick={() => startTopicQuiz(topicObj.subject, topicObj)}
                        className="btn btn-outline btn-sm"
                        style={{ fontSize: '12px' }}
                      >
                        Targeted Quiz
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Identified Strengths */}
        <div className="card" style={{ borderLeft: '4px solid var(--color-success)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <CheckCircle2 size={20} color="var(--color-success)" />
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              Solid Strengths & Mastered Concepts
            </h3>
          </div>

          {strongTopics.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '13.5px' }}>
              Complete adaptive practice sessions to achieve mastery badges!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {strongTopics.map(s => {
                const topicObj = allCurrentTopics.find(t => t.id === s.topicId);
                return (
                  <div
                    key={s.topicId}
                    style={{
                      padding: '12px 14px',
                      backgroundColor: 'var(--bg-surface-secondary)',
                      borderRadius: 'var(--radius-md)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                        {topicObj?.title || s.topicId}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--color-success)', fontWeight: 600 }}>
                        Mastery: {s.score}% • {s.tier}
                      </div>
                    </div>
                    <span
                      style={{
                        padding: '4px 8px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: 'var(--color-success-bg)',
                        color: 'var(--color-success)',
                        fontSize: '11px',
                        fontWeight: 700
                      }}
                    >
                      ✓ Solid
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Curriculum Topic Mastery Progress Bars */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 700, marginBottom: '16px', color: 'var(--text-primary)' }}>
          Semester Topic Mastery Spectrum
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {allCurrentTopics.map(topic => {
            const stat = topicStats.find(ts => ts.topicId === topic.id);
            const score = stat ? stat.score : 0;
            const tier = stat ? stat.tier : 'Unassessed';

            let barColor = '#94a3b8';
            if (score >= 90) barColor = '#10b981';
            else if (score >= 75) barColor = '#3b82f6';
            else if (score >= 50) barColor = '#f59e0b';
            else if (score > 0) barColor = '#ef4444';

            return (
              <div key={topic.id}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {topic.title}
                  </span>
                  <span style={{ fontSize: '12.5px', color: 'var(--text-muted)', fontWeight: 500 }}>
                    {score}% ({tier})
                  </span>
                </div>
                <div
                  style={{
                    height: '8px',
                    backgroundColor: 'var(--bg-surface-secondary)',
                    borderRadius: 'var(--radius-full)',
                    overflow: 'hidden',
                    border: '1px solid var(--border-color)'
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      width: `${score}%`,
                      backgroundColor: barColor,
                      borderRadius: 'var(--radius-full)',
                      transition: 'width 0.5s ease'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
