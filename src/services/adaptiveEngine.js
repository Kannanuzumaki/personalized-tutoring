// =========================================================================
// AdaptLearn Adaptive Learning Engine
// Step 10: Strength & Weakness Analysis
// Step 11: Personalized Recommendation Engine
// Step 12: Real-time Dynamic Quiz Difficulty Adaptation (Item Response & Elo-based)
// =========================================================================

export const DIFFICULTY_LEVELS = ['easy', 'medium', 'hard', 'expert'];

export const MASTERY_TIERS = {
  NOVICE: { label: 'Novice', minScore: 0, maxScore: 49, color: '#ef4444' },
  DEVELOPING: { label: 'Developing', minScore: 50, maxScore: 74, color: '#f59e0b' },
  PROFICIENT: { label: 'Proficient', minScore: 75, maxScore: 89, color: '#3b82f6' },
  MASTER: { label: 'Master', minScore: 90, maxScore: 100, color: '#10b981' }
};

/**
 * Real-time Adaptive Next Difficulty Calculator (Step 12)
 * Dynamic item selection adjusting to the learner's live answering streak.
 */
export function calculateNextDifficulty(currentDifficulty, isCorrect, streak, timeSpentSeconds) {
  const currentIndex = DIFFICULTY_LEVELS.indexOf(currentDifficulty);

  // If answered correctly quickly with high streak, promote difficulty
  if (isCorrect) {
    if (streak >= 2 && currentIndex < DIFFICULTY_LEVELS.length - 1) {
      return DIFFICULTY_LEVELS[currentIndex + 1];
    }
    // Fast response (< 10 seconds) on correct answer
    if (timeSpentSeconds < 10 && streak >= 1 && currentIndex < DIFFICULTY_LEVELS.length - 1) {
      return DIFFICULTY_LEVELS[currentIndex + 1];
    }
    return currentDifficulty;
  } else {
    // Incorrect answer: immediately step down or hold to prevent learner frustration
    if (currentIndex > 0) {
      return DIFFICULTY_LEVELS[currentIndex - 1];
    }
    return DIFFICULTY_LEVELS[0];
  }
}

/**
 * Filter or order questions adaptively based on target difficulty
 */
export function selectAdaptiveQuestion(availableQuestions, targetDifficulty, answeredQuestionIds) {
  const remaining = availableQuestions.filter(q => !answeredQuestionIds.includes(q.id));
  if (remaining.length === 0) return null;

  // Exact match
  const exact = remaining.filter(q => q.difficulty === targetDifficulty);
  if (exact.length > 0) {
    return exact[Math.floor(Math.random() * exact.length)];
  }

  // Fallback to nearest difficulty
  const targetIdx = DIFFICULTY_LEVELS.indexOf(targetDifficulty);
  const sortedByProximity = [...remaining].sort((a, b) => {
    const diffA = Math.abs(DIFFICULTY_LEVELS.indexOf(a.difficulty) - targetIdx);
    const diffB = Math.abs(DIFFICULTY_LEVELS.indexOf(b.difficulty) - targetIdx);
    return diffA - diffB;
  });

  return sortedByProximity[0];
}

/**
 * Step 10: Deep Strengths & Weaknesses Mastery Analysis
 */
export function analyzeStudentMastery(topicMasteryMap, quizAttempts) {
  const topicStats = [];
  const misconceptionsDetected = [];
  let totalQuestionsAnswered = 0;
  let totalCorrect = 0;

  // Aggregate from quiz attempts
  quizAttempts.forEach(attempt => {
    totalQuestionsAnswered += attempt.total_questions || 0;
    totalCorrect += attempt.correct_answers || 0;

    if (attempt.question_details && Array.isArray(attempt.question_details)) {
      attempt.question_details.forEach(qd => {
        if (!qd.isCorrect && qd.misconceptionTag) {
          misconceptionsDetected.push({
            topicTitle: attempt.topic_title || 'General',
            tag: qd.misconceptionTag,
            date: attempt.created_at
          });
        }
      });
    }
  });

  // Calculate topic mastery tiers
  Object.keys(topicMasteryMap).forEach(topicId => {
    const data = topicMasteryMap[topicId];
    const score = Number(data.mastery_score || 0);
    let tier = MASTERY_TIERS.NOVICE;

    if (score >= 90) tier = MASTERY_TIERS.MASTER;
    else if (score >= 75) tier = MASTERY_TIERS.PROFICIENT;
    else if (score >= 50) tier = MASTERY_TIERS.DEVELOPING;

    topicStats.push({
      topicId,
      score,
      tier: tier.label,
      color: tier.color,
      attempts: data.attempts_count || 0,
      correct: data.correct_count || 0,
      lastStudied: data.last_studied_at
    });
  });

  const overallAccuracy = totalQuestionsAnswered > 0
    ? Math.round((totalCorrect / totalQuestionsAnswered) * 100)
    : 0;

  const weakTopics = topicStats.filter(t => t.score < 60);
  const strongTopics = topicStats.filter(t => t.score >= 75);

  return {
    overallAccuracy,
    totalQuestionsAnswered,
    totalCorrect,
    topicStats,
    weakTopics,
    strongTopics,
    misconceptionsDetected
  };
}

/**
 * Step 11: Build Personalized Topic Recommendations ("Next Best Action")
 */
export function generateRecommendations(allSubjects, topicMasteryMap, quizAttempts) {
  const recommendations = [];

  // 1. Identify topics where student struggled recently (accuracy < 60%)
  allSubjects.forEach(subject => {
    subject.units.forEach(unit => {
      unit.topics.forEach(topic => {
        const mastery = topicMasteryMap[topic.id];
        const score = mastery ? Number(mastery.mastery_score || 0) : 0;
        const attempts = mastery ? (mastery.attempts_count || 0) : 0;

        if (attempts > 0 && score < 60) {
          recommendations.push({
            id: `rec-weak-${topic.id}`,
            type: 'CRITICAL_REVIEW',
            priority: 'High',
            topicId: topic.id,
            topicTitle: topic.title,
            subjectTitle: subject.title,
            subjectId: subject.id,
            reason: `Current mastery is ${score}%. Immediate reinforcement needed to clear foundational gaps.`,
            actionLabel: 'Revise & Retake Quiz',
            suggestedDifficulty: 'easy'
          });
        } else if (attempts === 0) {
          recommendations.push({
            id: `rec-unseen-${topic.id}`,
            type: 'UNEXPLORED',
            priority: 'Medium',
            topicId: topic.id,
            topicTitle: topic.title,
            subjectTitle: subject.title,
            subjectId: subject.id,
            reason: `Topic not yet attempted in this semester curriculum.`,
            actionLabel: 'Start First Lesson',
            suggestedDifficulty: 'medium'
          });
        } else if (score >= 80) {
          recommendations.push({
            id: `rec-master-${topic.id}`,
            type: 'CHALLENGE',
            priority: 'Low',
            topicId: topic.id,
            topicTitle: topic.title,
            subjectTitle: subject.title,
            subjectId: subject.id,
            reason: `Mastery achieved (${score}%). Test with Expert level questions to solidify retention.`,
            actionLabel: 'Take Expert Challenge',
            suggestedDifficulty: 'expert'
          });
        }
      });
    });
  });

  // Sort: High priority first, then Medium, then Low
  const priorityOrder = { High: 0, Medium: 1, Low: 2 };
  recommendations.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  return recommendations.slice(0, 5); // Return top 5 personalized actions
}
