import { describe, it, expect } from 'vitest';
import { UNITS } from './lessons.js';

describe('lesson content', () => {
  const lessons = UNITS.flatMap((u) => u.lessons);

  it('has at least one unit with lessons', () => {
    expect(UNITS.length).toBeGreaterThan(0);
    expect(lessons.length).toBeGreaterThan(0);
  });

  it('every lesson has exactly one new word, one grammar point, and exercises', () => {
    for (const l of lessons) {
      expect(l.newWord, `lesson ${l.id} newWord`).toBeTruthy();
      expect(l.newWord.es).toBeTruthy();
      expect(l.newWord.en).toBeTruthy();
      expect(l.grammar?.title, `lesson ${l.id} grammar.title`).toBeTruthy();
      expect(l.grammar?.body, `lesson ${l.id} grammar.body`).toBeTruthy();
      expect(Array.isArray(l.exercises) && l.exercises.length >= 1, `lesson ${l.id} exercises`).toBe(true);
    }
  });

  it('choice answers are among their options', () => {
    for (const l of lessons) {
      for (const e of l.exercises) {
        if (e.type === 'choice') {
          expect(e.options, `lesson ${l.id} choice options`).toContain(e.answer);
        }
      }
    }
  });

  it('order answers use only the provided words', () => {
    for (const l of lessons) {
      for (const e of l.exercises) {
        if (e.type === 'order') {
          for (const w of e.answer) {
            expect(e.words, `lesson ${l.id} order word "${w}"`).toContain(w);
          }
        }
      }
    }
  });

  it('lesson ids are unique', () => {
    const ids = lessons.map((l) => l.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});