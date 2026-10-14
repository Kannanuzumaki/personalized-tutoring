// =========================================================================
// AdaptLearn Interactive Adaptive Quiz Modal Component
// Step 8: Interactive MCQ Quizzes
// Step 9: Display Correct Answers & Explanations (with distractor breakdowns)
// Step 10: Analyze Strengths & Weaknesses (misconception diagnosis)
// Step 12: Real-time Adaptive Quiz Difficulty Adjustment
// =========================================================================

import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Timer,
  Sparkles,
  HelpCircle,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Edit3,
  Award,
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  calculateNextDifficulty,
  selectAdaptiveQuestion,
  DIFFICULTY_LEVELS
} from '../services/adaptiveEngine';

export default function AdaptiveQuizModal() {
  const { activeQuiz, setActiveQuiz, handleCompleteQuiz } = useApp();

  if (!activeQuiz) return null;

  const { topic, subject } = activeQuiz;
  const questionsBank = topic.questions || [];

  // Quiz execution state
  const [currentDifficulty, setCurrentDifficulty] = useState('medium');
  const [difficultyHistory, setDifficultyHistory] = useState(['medium']);
  const [answeredQuestionIds, setAnsweredQuestionIds] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showScratchpad, setShowScratchpad] = useState(false);
  const [scratchpadText, setScratchpadText] = useState('');

  // Performance tracking
  const [questionStartTime, setQuestionStartTime] = useState(Date.now());
  const [streak, setStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [questionResults, setQuestionResults] = useState([]);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [adaptiveFeedbackMsg, setAdaptiveFeedbackMsg] = useState(null);

  // Timer
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const timerRef = useRef(null);

  // Maximum adaptive questions per session
  const MAX_QUESTIONS = Math.min(questionsBank.length, 5);

  // Initialize first question
  useEffect(() => {
    if (questionsBank.length > 0 && !currentQuestion) {
      const firstQ = selectAdaptiveQuestion(questionsBank, 'medium', []);
      setCurrentQuestion(firstQ || questionsBank[0]);
      setQuestionStartTime(Date.now());
    }

    timerRef.current = setInterval(() => {
      setSecondsElapsed(prev => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [questionsBank]);

  // Handle Option selection
  const handleSelectOption = (index) => {
    if (isSubmitted) return;
    setSelectedOption(index);
  };

  // Submit Answer & Calculate Adaptive Shift (Step 12 & Step 9)
  const handleSubmitAnswer = () => {
    if (selectedOption === null || !currentQuestion) return;

    const timeSpent = Math.max(1, Math.round((Date.now() - questionStartTime) / 1000));
    const isCorrect = selectedOption === currentQuestion.correctIndex;

    const newStreak = isCorrect ? streak + 1 : 0;
    setStreak(newStreak);
    if (isCorrect) setCorrectCount(prev => prev + 1);

    // Compute Next Difficulty Adaptively (Step 12)
    const nextDiff = calculateNextDifficulty(
      currentQuestion.difficulty || currentDifficulty,
      isCorrect,
      newStreak,
      timeSpent
    );

    let feedback = '';
    if (isCorrect) {
      if (nextDiff !== currentDifficulty) {
        feedback = `Great work! High accuracy promoted difficulty to ${nextDiff.toUpperCase()}!`;
      } else {
        feedback = `Correct answer! Holding at ${currentDifficulty.toUpperCase()} level.`;
      }
    } else {
      if (nextDiff !== currentDifficulty) {
        feedback = `Stepped difficulty down to ${nextDiff.toUpperCase()} to reinforce core concepts.`;
      } else {
        feedback = `Incorrect. Review the detailed explanation below before proceeding.`;
      }
    }

    setAdaptiveFeedbackMsg(feedback);

    // Record question result for strength/weakness analysis (Step 10)
    const resultItem = {
      questionId: currentQuestion.id,
      text: currentQuestion.text,
      userAnswer: selectedOption,
      correctAnswer: currentQuestion.correctIndex,
      isCorrect,
      difficulty: currentQuestion.difficulty,
      timeSpent,
      misconceptionTag: !isCorrect ? currentQuestion.bloomLevel : null,
      explanation: currentQuestion.explanation
    };

    setQuestionResults(prev => [...prev, resultItem]);
    setAnsweredQuestionIds(prev => [...prev, currentQuestion.id]);
    setIsSubmitted(true);
  };

  // Move to next adaptive question or complete quiz
  const handleNextQuestion = () => {
    if (questionResults.length >= MAX_QUESTIONS) {
      finishQuiz();
      return;
    }

    // Determine target difficulty from the latest outcome
    const lastResult = questionResults[questionResults.length - 1];
    const targetDiff = calculateNextDifficulty(
      lastResult.difficulty || currentDifficulty,
      lastResult.isCorrect,
      streak,
      lastResult.timeSpent
    );

    setCurrentDifficulty(targetDiff);
    setDifficultyHistory(prev => [...prev, targetDiff]);

    const nextQ = selectAdaptiveQuestion(questionsBank, targetDiff, answeredQuestionIds);

    if (!nextQ) {
      finishQuiz();
      return;
    }

    setCurrentQuestion(nextQ);
    setSelectedOption(null);
    setIsSubmitted(false);
    setShowHint(false);
    setAdaptiveFeedbackMsg(null);
    setQuestionStartTime(Date.now());
  };

  // Finish quiz and log results (Steps 10 & 14)
  const finishQuiz = () => {
    clearInterval(timerRef.current);
    setIsQuizComplete(true);

    const total = questionResults.length;
    const finalScore = total > 0 ? Math.round((correctCount / total) * 100) : 0;

    if (finalScore >= 70) {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    }

    const attemptPayload = {
      id: 'att-' + Date.now(),
      subject_id: subject.id,
      subject_title: subject.title,
      topic_id: topic.id,
      topic_title: topic.title,
      mode: 'adaptive',
      total_questions: total,
      correct_answers: correctCount,
      score_percentage: finalScore,
      avg_time_seconds: Math.round(secondsElapsed / Math.max(1, total)),
      starting_difficulty: difficultyHistory[0],
      ending_difficulty: currentDifficulty,
      question_details: questionResults,
      created_at: new Date().toISOString()
    };

    handleCompleteQuiz(attemptPayload);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxWidth: '780px', position: 'relative' }}>
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge" style={{ backgroundColor: 'var(--accent-light)', color: 'var(--accent-primary)' }}>
                {subject.code}
              </span>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                {topic.title}
              </span>
            </div>
            <div style={{ fontSize: '18px', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
              Adaptive MCQ Assessment (Steps 8 & 12)
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '13px',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                backgroundColor: 'var(--bg-surface-secondary)',
                padding: '6px 12px',
                borderRadius: 'var(--radius-full)'
              }}
            >
              <Timer size={15} />
              <span>{Math.floor(secondsElapsed / 60)}:{(secondsElapsed % 60).toString().padStart(2, '0')}</span>
            </div>

            <button
              onClick={() => setActiveQuiz(null)}
              className="btn-icon"
              title="Close Quiz"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* QUIZ COMPLETION SUMMARY VIEW */}
        {isQuizComplete ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: correctCount / questionResults.length >= 0.7 ? '#ecfdf5' : '#fffbeb',
                color: correctCount / questionResults.length >= 0.7 ? '#10b981' : '#f59e0b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}
            >
              <Award size={36} />
            </div>

            <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 6px', color: 'var(--text-primary)' }}>
              Adaptive Session Complete!
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', margin: '0 0 24px' }}>
              Your answers have been analyzed and your topic mastery updated.
            </p>

            {/* Score Cards */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '12px',
                marginBottom: '28px'
              }}
            >
              <div className="card" style={{ padding: '16px' }}>
                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--accent-primary)' }}>
                  {Math.round((correctCount / Math.max(1, questionResults.length)) * 100)}%
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Score Accuracy</div>
              </div>

              <div className="card" style={{ padding: '16px' }}>
                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-success)' }}>
                  {correctCount} / {questionResults.length}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Correct Questions</div>
              </div>

              <div className="card" style={{ padding: '16px' }}>
                <div style={{ fontSize: '24px', fontWeight: 800, textTransform: 'capitalize', color: 'var(--text-primary)' }}>
                  {currentDifficulty}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Peak Difficulty Achieved</div>
              </div>
            </div>

            {/* Question Breakdown List */}
            <div style={{ textAlign: 'left', marginBottom: '24px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: 700, marginBottom: '12px', color: 'var(--text-primary)' }}>
                Session Question Breakdown:
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {questionResults.map((r, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: r.isCorrect ? 'var(--color-success-bg)' : 'var(--color-danger-bg)',
                      border: `1px solid ${r.isCorrect ? 'var(--color-success)' : 'var(--color-danger)'}`,
                      fontSize: '13.5px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontWeight: 700 }}>Question {i + 1} ({r.difficulty})</span>
                      <span style={{ fontWeight: 700, color: r.isCorrect ? 'var(--color-success)' : 'var(--color-danger)' }}>
                        {r.isCorrect ? '✓ Correct' : '✗ Incorrect'}
                      </span>
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>{r.text}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
              <button
                onClick={() => {
                  setIsQuizComplete(false);
                  setAnsweredQuestionIds([]);
                  setQuestionResults([]);
                  setCorrectCount(0);
                  setStreak(0);
                  setSecondsElapsed(0);
                  setIsSubmitted(false);
                  setSelectedOption(null);
                  setCurrentQuestion(questionsBank[0]);
                }}
                className="btn btn-secondary"
              >
                <RotateCcw size={16} />
                <span>Retry Session</span>
              </button>

              <button
                onClick={() => setActiveQuiz(null)}
                className="btn btn-primary"
              >
                <span>Back to Dashboard</span>
              </button>
            </div>
          </div>
        ) : (
          /* ACTIVE QUESTION VIEW */
          <div>
            {currentQuestion ? (
              <div>
                {/* Adaptive Indicator Bar (Step 12) */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: 'var(--bg-surface-secondary)',
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: '16px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                      Question {questionResults.length + 1} of {MAX_QUESTIONS}
                    </span>
                    <span>•</span>
                    <span className={`badge badge-${currentQuestion.difficulty || currentDifficulty}`}>
                      {currentQuestion.difficulty || currentDifficulty}
                    </span>
                    {streak > 1 && (
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#f59e0b' }}>
                        🔥 {streak} Streak
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => setShowScratchpad(prev => !prev)}
                      className="btn-icon"
                      title="Toggle Scratchpad"
                      style={{ padding: '4px 8px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <Edit3 size={13} /> Scratchpad
                    </button>
                    {currentQuestion.hint && (
                      <button
                        onClick={() => setShowHint(prev => !prev)}
                        className="btn-icon"
                        title="Show Hint"
                        style={{ padding: '4px 8px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <Lightbulb size={13} /> Hint
                      </button>
                    )}
                  </div>
                </div>

                {/* Scratchpad view if open */}
                {showScratchpad && (
                  <div style={{ marginBottom: '16px' }}>
                    <textarea
                      placeholder="Rough work scratchpad (notes, calculations, variable tracing)..."
                      value={scratchpadText}
                      onChange={(e) => setScratchpadText(e.target.value)}
                      style={{
                        width: '100%',
                        height: '70px',
                        padding: '10px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--bg-primary)',
                        border: '1px solid var(--border-color)',
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '13px'
                      }}
                    />
                  </div>
                )}

                {/* Hint box if open */}
                {showHint && currentQuestion.hint && (
                  <div
                    style={{
                      padding: '10px 14px',
                      backgroundColor: 'var(--color-warning-bg)',
                      border: '1px solid var(--color-warning)',
                      borderRadius: 'var(--radius-md)',
                      marginBottom: '16px',
                      fontSize: '13px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                  >
                    <Lightbulb size={16} color="var(--color-warning)" />
                    <span><b>Hint:</b> {currentQuestion.hint}</span>
                  </div>
                )}

                {/* Question Text & Code Snippet (Step 8) */}
                <div style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '17px', fontWeight: 700, lineHeight: 1.5, color: 'var(--text-primary)' }}>
                    {currentQuestion.text}
                  </h3>
                  {currentQuestion.code && (
                    <pre style={{ marginTop: '10px' }}>{currentQuestion.code}</pre>
                  )}
                </div>

                {/* MCQ Options List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                  {currentQuestion.options.map((opt, idx) => {
                    const isPicked = selectedOption === idx;
                    const isCorrectAnswer = idx === currentQuestion.correctIndex;

                    let btnStyle = {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      borderRadius: 'var(--radius-md)',
                      border: '1.5px solid var(--border-color)',
                      backgroundColor: 'var(--bg-surface)',
                      color: 'var(--text-primary)',
                      cursor: isSubmitted ? 'default' : 'pointer',
                      textAlign: 'left',
                      fontSize: '14.5px',
                      transition: 'all 0.15s ease'
                    };

                    if (isSubmitted) {
                      if (isCorrectAnswer) {
                        btnStyle.backgroundColor = 'var(--color-success-bg)';
                        btnStyle.borderColor = 'var(--color-success)';
                        btnStyle.color = 'var(--color-success)';
                        btnStyle.fontWeight = 700;
                      } else if (isPicked && !isCorrectAnswer) {
                        btnStyle.backgroundColor = 'var(--color-danger-bg)';
                        btnStyle.borderColor = 'var(--color-danger)';
                        btnStyle.color = 'var(--color-danger)';
                        btnStyle.fontWeight = 700;
                      }
                    } else if (isPicked) {
                      btnStyle.borderColor = 'var(--accent-primary)';
                      btnStyle.backgroundColor = 'var(--accent-light)';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        style={btnStyle}
                      >
                        <span
                          style={{
                            width: '26px',
                            height: '26px',
                            borderRadius: '50%',
                            border: '1.5px solid currentColor',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            fontWeight: 700,
                            flexShrink: 0
                          }}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span style={{ flex: 1 }}>{opt}</span>
                        {isSubmitted && isCorrectAnswer && (
                          <CheckCircle2 size={18} color="var(--color-success)" />
                        )}
                        {isSubmitted && isPicked && !isCorrectAnswer && (
                          <XCircle size={18} color="var(--color-danger)" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Instant Feedback & Explanations (Step 9 & 10) */}
                {isSubmitted && (
                  <div
                    style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'var(--bg-surface-secondary)',
                      border: '1px solid var(--border-color)',
                      marginBottom: '20px'
                    }}
                  >
                    {/* Adaptive Adjustment Notification */}
                    {adaptiveFeedbackMsg && (
                      <div
                        style={{
                          fontSize: '13px',
                          fontWeight: 700,
                          color: 'var(--accent-primary)',
                          marginBottom: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px'
                        }}
                      >
                        <Sparkles size={15} />
                        <span>Adaptive Feedback: {adaptiveFeedbackMsg}</span>
                      </div>
                    )}

                    {/* Step 9: Detailed Concept Explanation */}
                    <div style={{ marginBottom: '10px' }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--color-success)', marginBottom: '4px' }}>
                        Explanation (Step 9):
                      </div>
                      <div style={{ fontSize: '13.5px', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                        {currentQuestion.explanation}
                      </div>
                    </div>

                    {/* Step 9 & 10: Distractor Analysis (Why other options are wrong) */}
                    {currentQuestion.distractorExplanations && (
                      <div style={{ marginTop: '12px', paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
                        <div style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '6px' }}>
                          Distractor Breakdown & Common Misconceptions:
                        </div>
                        {Object.entries(currentQuestion.distractorExplanations).map(([optIdx, text]) => (
                          <div key={optIdx} style={{ fontSize: '12.5px', color: 'var(--text-muted)', marginBottom: '4px' }}>
                            • <b>Option {String.fromCharCode(65 + Number(optIdx))}:</b> {text}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Bottom Actions */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                  {!isSubmitted ? (
                    <button
                      onClick={handleSubmitAnswer}
                      disabled={selectedOption === null}
                      className="btn btn-primary"
                      style={{ opacity: selectedOption === null ? 0.5 : 1 }}
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="btn btn-primary"
                    >
                      <span>{questionResults.length >= MAX_QUESTIONS ? 'View Results' : 'Next Adaptive Question'}</span>
                      <ArrowRight size={16} />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '30px' }}>
                <p>No questions configured for this topic yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
