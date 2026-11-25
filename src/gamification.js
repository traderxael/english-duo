// Pure gamification logic. All functions are side-effect free.
import { defaultState } from './state.js';

function dayNumber(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return Date.UTC(y, m - 1, d) / 86400000;
}

export function levelFor(xp) {
  return Math.floor(xp / 100) + 1;
}

export function canStartLesson(state) {
  return state.hearts > 0;
}

function unlock(list, id) {
  return list.includes(id) ? list : [...list, id];
}

export function applyLessonResult(state, { xp = 0, mistakes = 0 }, todayISO) {
  const base = { ...defaultState(), ...state };
  const newXp = base.xp + xp;

  // Streak by calendar-day distance from the last practice day.
  let streak;
  if (!base.lastPracticeDay) {
    streak = 1;
  } else {
    const diff = dayNumber(todayISO) - dayNumber(base.lastPracticeDay);
    if (diff <= 0) streak = base.streak; // same day (or clock skew)
    else if (diff === 1) streak = base.streak + 1;
    else streak = 1; // gap > 1 day
  }

  let achievements = base.achievements;
  if (newXp > 0) achievements = unlock(achievements, 'first-lesson');
  if (streak >= 3) achievements = unlock(achievements, 'streak-3');
  if (newXp >= 100) achievements = unlock(achievements, 'xp-100');

  return {
    ...base,
    xp: newXp,
    streak,
    lastPracticeDay: todayISO,
    hearts: Math.max(0, base.hearts - mistakes),
    achievements,
  };
}