// =========================================================================
// AdaptLearn Diagnostic Intake Assessment Component
// Requirement 4.b: Handle New Students with No History (Diagnostic Intake)
// =========================================================================

import React, { useState } from 'react';
import { Sparkles, CheckCircle2, ArrowRight, UserCheck, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function DiagnosticIntakeModal({ isOpen, onClose }) {
  const { handleUpdateProfile } = useApp();
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({});

  if (!isOpen) return null;

  const intakeQuestions = [
    {
      id: 'q1',
      text: 'What is your current familiarity with core programming and algorithms?',
      options: [
        'Complete beginner (learning syntax)',
        'Intermediate (know basic loops, arrays, functions)',
        'Advanced (comfortable with BSTs, graphs, dynamic programming)'
      ]
    },
    {
      id: 'q2',
      text: 'Which primary learning goal do you want this AI tutor to prioritize?',
      options: [
        'Semester University Exam Prep (focus on syllabus, past papers & citations)',
        'Competitive Programming & Gate/Placement Interviews',
        'Deep Conceptual Mastery from Textbooks & Research Slides'
      ]
    }
  ];

  const handleSelect = (qId, optionIdx) => {
    setAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleFinish = () => {
    handleUpdateProfile({
      diagnosticCompleted: true,
      baselineLevel: answers.q1 === 0 ? 'Novice' : answers.q1 === 1 ? 'Developing' : 'Proficient'
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '580px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={20} color="var(--accent-primary)" />
            <h2 style={{ fontSize: '18px', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              Diagnostic Student Intake (Requirement 4.b)
            </h2>
          </div>
          <button onClick={onClose} className="btn-icon">
            <X size={16} />
          </button>
        </div>

        <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Since you have no prior learning history on this platform, answer these 2 diagnostic questions to calibrate your initial Bayesian Knowledge Tracing prior $P(L_0)$.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '24px' }}>
          {intakeQuestions.map((q, idx) => (
            <div key={q.id}>
              <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                {idx + 1}. {q.text}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {q.options.map((opt, oIdx) => {
                  const isSelected = answers[q.id] === oIdx;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleSelect(q.id, oIdx)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: 'var(--radius-md)',
                        border: `1.5px solid ${isSelected ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                        backgroundColor: isSelected ? 'var(--accent-light)' : 'var(--bg-surface-secondary)',
                        color: 'var(--text-primary)',
                        textAlign: 'left',
                        fontSize: '13.5px',
                        cursor: 'pointer'
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button onClick={onClose} className="btn btn-secondary btn-sm">
            Skip Calibration
          </button>
          <button
            onClick={handleFinish}
            disabled={Object.keys(answers).length < intakeQuestions.length}
            className="btn btn-primary btn-sm"
          >
            <span>Calibrate Learner Model</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
