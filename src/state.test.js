import { describe, it, expect, beforeEach } from 'vitest';
import { loadState, saveState, defaultState, STORAGE_KEY } from './state.js';

describe('state', () => {
  beforeEach(() => localStorage.clear());

  it('returns a fresh default state when nothing is stored', () => {
    expect(loadState()).toEqual(defaultState());
  });

  it('returns default state when stored JSON is corrupt', () => {
    localStorage.setItem(STORAGE_KEY, '{not valid json');
    expect(loadState()).toEqual(defaultState());
  });

  it('round-trips saved state', () => {
    const s = { ...defaultState(), xp: 120, streak: 3, hearts: 2, completed: ['u1l1'] };
    saveState(s);
    expect(loadState()).toEqual(s);
  });

  it('default state has full hearts and empty progress', () => {
    const d = defaultState();
    expect(d.hearts).toBe(5);
    expect(d.xp).toBe(0);
    expect(d.streak).toBe(0);
    expect(d.completed).toEqual([]);
  });
});