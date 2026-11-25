import { describe, it, expect } from 'vitest';
import { applyLessonResult, levelFor, canStartLesson } from './gamification.js';
import { defaultState } from './state.js';

const day = (s) => s; // ISO yyyy-mm-dd strings sort lexicographically

describe('gamification', () => {
  it('first lesson sets streak to 1', () => {
    const s = defaultState();
    const r = applyLessonResult(s, { xp: 10, mistakes: 0 }, '2026-11-25');
    expect(r.streak).toBe(1);
    expect(r.xp).toBe(10);
    expect(r.lastPracticeDay).toBe('2026-11-25');
  });

  it('consecutive day increments streak', () => {
    const s = { ...defaultState(), streak: 2, lastPracticeDay: '2026-11-24' };
    const r = applyLessonResult(s, { xp: 10, mistakes: 0 }, '2026-11-25');
    expect(r.streak).toBe(3);
  });

  it('same day keeps streak unchanged', () => {
    const s = { ...defaultState(), streak: 4, lastPracticeDay: '2026-11-25' };
    const r = applyLessonResult(s, { xp: 10, mistakes: 0 }, '2026-11-25');
    expect(r.streak).toBe(4);
  });

  it('a gap of more than one day resets streak to 1', () => {
    const s = { ...defaultState(), streak: 7, lastPracticeDay: '2026-11-20' };
    const r = applyLessonResult(s, { xp: 10, mistakes: 0 }, '2026-11-25');
    expect(r.streak).toBe(1);
  });

  it('hearts decrease by mistakes but never below 0', () => {
    const s = { ...defaultState(), hearts: 2 };
    const r = applyLessonResult(s, { xp: 10, mistakes: 5 }, '2026-11-25');
    expect(r.hearts).toBe(0);
  });

  it('unlocks first-lesson achievement', () => {
    const r = applyLessonResult(defaultState(), { xp: 10, mistakes: 0 }, '2026-11-25');
    expect(r.achievements).toContain('first-lesson');
  });

  it('levelFor grows every 100 xp', () => {
    expect(levelFor(0)).toBe(1);
    expect(levelFor(99)).toBe(1);
    expect(levelFor(100)).toBe(2);
    expect(levelFor(250)).toBe(3);
  });

  it('cannot start a lesson with 0 hearts', () => {
    expect(canStartLesson({ ...defaultState(), hearts: 0 })).toBe(false);
    expect(canStartLesson({ ...defaultState(), hearts: 1 })).toBe(true);
  });
});