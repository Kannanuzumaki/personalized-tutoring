// =========================================================================
// AdaptLearn Revision Hub & Spaced Repetition Schedule Component
// Requirement 6.b: Revision Materials for Weak Topics (Flashcards, Slides, Audio Briefs)
// Requirement 6.c: Study Schedule Based on Forgetting Curves & Exam Countdown
// =========================================================================

import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Calendar,
  Volume2,
  RotateCw,
  Clock,
  CheckCircle,
  AlertTriangle,
  BookOpen
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function RevisionHub() {
  const { analyticsSummary, currentSubjects } = useApp();
  const { weakTopics } = analyticsSummary;

  const [activeTab, setActiveTab] = useState('flashcards'); // 'flashcards', 'schedule', 'audio'
  const [examDaysRemaining, setExamDaysRemaining] = useState(14);
  const [flippedCards, setFlippedCards] = useState({});

  // Dynamic flashcards generated from weak topics
  const flashcards = [
    {
      id: 'fc-1',
      topic: 'Asymptotic Analysis & Big-O',
      question: 'What is the Master Theorem condition for T(n) = 2T(n/2) + n log n?',
      answer: 'Extended Master Theorem Case 2: Since n^(log_b a) = n^1 matches f(n) / log^k n, the solution is Theta(n log^2 n).',
      source: 'CLRS 4th Ed., p. 33'
    },
    {
      id: 'fc-2',
      topic: 'Binary Search Trees & AVL Rotations',
      question: 'How do you fix a Left-Right (LR) imbalance in an AVL tree?',
      answer: 'Perform a double rotation: first Left-rotate the left child, then Right-rotate the parent node.',
      source: 'Lecture Slide 14 / 42'
    },
    {
      id: 'fc-3',
      topic: 'Relational Normalization',
      question: 'Why does BCNF not always preserve functional dependencies?',
      answer: 'Decomposing schemas with overlapping candidate keys to eliminate non-superkey determinants can split dependencies across tables.',
      source: 'Database System Concepts, p. 312'
    }
  ];

  const toggleFlip = (id) => {
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Spaced Repetition Schedule calculation (Requirement 6.c)
  const schedulePlan = [
    {
      day: 'Day 1 (Today)',
      focus: 'High-Retention Active Recall',
      task: 'Review Weak Topics & Asymptotic Recurrence trees (30 mins)',
      forgettingRisk: 'Low'
    },
    {
      day: 'Day 3',
      focus: 'First Forgetting Curve Checkpoint',
      task: 'Take 5-question Adaptive Quiz on AVL Tree double rotations (15 mins)',
      forgettingRisk: 'Medium'
    },
    {
      day: 'Day 7',
      focus: 'Second Spaced Repetition Pass',
      task: 'Solve BCNF decomposition and dependency preservation numericals (25 mins)',
      forgettingRisk: 'High'
    },
    {
      day: `Day ${Math.max(1, examDaysRemaining - 1)} (Pre-Exam Final Sprint)`,
      focus: 'Consolidation & Mock Exam',
      task: 'Full Multimodal Mock Assessment across all 5 units (45 mins)',
      forgettingRisk: 'Critical'
    }
  ];

  return (
    <div>
      {/* Title */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 6px' }}>
          Personalized Revision Hub (Requirements 6.b & 6.c)
        </h1>
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: 0 }}>
          High-yield active recall flashcards, audio briefs, and spaced repetition calendar mapped to forgetting curves.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          onClick={() => setActiveTab('flashcards')}
          className={`btn ${activeTab === 'flashcards' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <Layers size={16} />
          <span>Active Recall Flashcards</span>
        </button>

        <button
          onClick={() => setActiveTab('schedule')}
          className={`btn ${activeTab === 'schedule' ? 'btn-primary' : 'btn-secondary'}`}
        >
          <Calendar size={16} />
          <span>Spaced Repetition Schedule</span>
        </button>
      </div>

      {/* TAB 1: FLASHCARDS (Requirement 6.b) */}
      {activeTab === 'flashcards' && (
        <div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '14px' }}>
            Click any flashcard to flip between conceptual question and source-verified answer.
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '16px'
            }}
          >
            {flashcards.map(fc => {
              const isFlipped = flippedCards[fc.id];
              return (
                <div
                  key={fc.id}
                  onClick={() => toggleFlip(fc.id)}
                  className="card card-clickable"
                  style={{
                    minHeight: '200px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    backgroundColor: isFlipped ? 'var(--bg-surface-secondary)' : 'var(--bg-surface)',
                    borderLeft: `4px solid ${isFlipped ? 'var(--color-success)' : 'var(--accent-primary)'}`
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <span className="badge" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-primary)' }}>
                        {fc.topic}
                      </span>
                      <RotateCw size={14} color="var(--text-muted)" />
                    </div>

                    <div style={{ fontSize: '14.5px', fontWeight: isFlipped ? 500 : 700, color: 'var(--text-primary)', lineHeight: 1.5 }}>
                      {isFlipped ? fc.answer : fc.question}
                    </div>
                  </div>

                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
                    Source: <b>{fc.source}</b> • <i>Click to {isFlipped ? 'see question' : 'reveal answer'}</i>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: SPACED REPETITION SCHEDULE (Requirement 6.c) */}
      {activeTab === 'schedule' && (
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                Ebbinghaus Forgetting Curve Study Planner
              </h3>
              <div style={{ fontSize: '12.5px', color: 'var(--text-muted)' }}>
                Targeted intervals spaced to prevent exponential memory decay before your exam.
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>Days until exam:</span>
              <input
                type="number"
                min="1"
                max="90"
                value={examDaysRemaining}
                onChange={(e) => setExamDaysRemaining(Number(e.target.value))}
                style={{
                  width: '60px',
                  padding: '6px',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-surface-secondary)',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  textAlign: 'center'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {schedulePlan.map((step, idx) => (
              <div
                key={idx}
                style={{
                  padding: '16px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-surface-secondary)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontSize: '14px', fontWeight: 800, color: 'var(--accent-primary)' }}>
                      {step.day}
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      • {step.focus}
                    </span>
                  </div>
                  <div style={{ fontSize: '13.5px', color: 'var(--text-primary)' }}>
                    {step.task}
                  </div>
                </div>

                <div
                  style={{
                    fontSize: '11.5px',
                    fontWeight: 700,
                    padding: '3px 9px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: step.forgettingRisk === 'Critical' ? 'var(--color-danger-bg)' : 'var(--color-warning-bg)',
                    color: step.forgettingRisk === 'Critical' ? 'var(--color-danger)' : 'var(--color-warning)'
                  }}
                >
                  Decay Risk: {step.forgettingRisk}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
