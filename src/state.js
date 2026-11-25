// Persistent progress in localStorage. No backend, no account.
export const STORAGE_KEY = 'english-duo:v1';

export function defaultState() {
  return {
    xp: 0,
    streak: 0,
    lastPracticeDay: null, // ISO yyyy-mm-dd of last completed lesson
    hearts: 5,
    completed: [], // lesson ids
    dailyGoal: 50, // XP per day
    achievements: [], // unlocked achievement ids
  };
}

export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    // Merge over defaults so older/partial saves keep working.
    return { ...defaultState(), ...parsed };
  } catch {
    return defaultState();
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage full / unavailable: ignore, app keeps working in-memory
  }
}