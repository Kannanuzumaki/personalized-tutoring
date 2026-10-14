// =========================================================================
// AdaptLearn Quiz History & Progress Tracking Component
// Step 15: Add Quiz History and Progress Tracking
// =========================================================================

import React, { useState } from 'react';
import {
  History,
  Calendar,
  Clock,
  Award,
  CheckCircle2,
  XCircle,
  Eye,
  X,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function QuizHistoryView() {
  const { quizHistory } = useApp();
  const [selectedAttempt, setSelectedAttempt] = useState(null);

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px' }}>
          Quiz History & Performance Log (Step 15)
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
          Review past adaptive test sessions, question responses, time spent, and score trajectories.
        </p>
      </div>

      {quizHistory.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
          <History size={36} color="var(--text-muted)" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 6px', color: 'var(--text-primary)' }}>
            No Assessment History Yet
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Take an adaptive quiz on any topic to log historical attempts and track your knowledge retention.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {quizHistory.map((att) => {
            const isPassing = att.score_percentage >= 70;
            return (
              <div
                key={att.id}
                className="card card-clickable"
                onClick={() => setSelectedAttempt(att)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  borderLeft: `4px solid ${isPassing ? 'var(--color-success)' : 'var(--color-warning)'}`,
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {att.topic_title || att.subject_title}
                    </span>
                    <span className="badge" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-primary)' }}>
                      {att.mode || 'Adaptive'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={13} /> {new Date(att.created_at).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} /> Avg: {att.avg_time_seconds || 15}s / question
                    </span>
                    <span>•</span>
                    <span>Peak Level: <b style={{ textTransform: 'capitalize' }}>{att.ending_difficulty || 'Medium'}</b></span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '20px', fontWeight: 800, color: isPassing ? 'var(--color-success)' : 'var(--color-warning)' }}>
                      {att.score_percentage}%
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {att.correct_answers} of {att.total_questions} correct
                    </div>
                  </div>

                  <button className="btn btn-secondary btn-sm" style={{ padding: '6px 12px' }}>
                    <Eye size={14} />
                    <span>Review</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Review Past Attempt Modal */}
      {selectedAttempt && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '680px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '0 0 2px', color: 'var(--text-primary)' }}>
                  Session Attempt Review
                </h3>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {selectedAttempt.topic_title} • Score: {selectedAttempt.score_percentage}%
                </div>
              </div>
              <button onClick={() => setSelectedAttempt(null)} className="btn-icon">
                <X size={16} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxHeight: '60vh', overflowY: 'auto' }}>
              {selectedAttempt.question_details?.map((q, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-surface-secondary)',
                    border: `1px solid ${q.isCorrect ? 'var(--color-success)' : 'var(--color-danger)'}`,
                    fontSize: '13.5px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 700 }}>Question {idx + 1} ({q.difficulty})</span>
                    <span style={{ fontWeight: 700, color: q.isCorrect ? 'var(--color-success)' : 'var(--color-danger)' }}>
                      {q.isCorrect ? '✓ Correct' : '✗ Missed'}
                    </span>
                  </div>
                  <div style={{ color: 'var(--text-primary)', marginBottom: '8px' }}>{q.text}</div>
                  <div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: 1.4, backgroundColor: 'var(--bg-surface)', padding: '8px', borderRadius: '4px' }}>
                    <b>Explanation:</b> {q.explanation}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <button onClick={() => setSelectedAttempt(null)} className="btn btn-secondary btn-sm">
                Close Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
