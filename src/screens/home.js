import { el } from '../exercises/util.js';
import { UNITS } from '../data/lessons.js';
import { levelFor, canStartLesson } from '../gamification.js';

// Flatten units into an ordered lesson list with unit headers.
function orderedLessons() {
  const out = [];
  for (const unit of UNITS) {
    for (const lesson of unit.lessons) out.push({ unit, lesson });
  }
  return out;
}

function statBar(state) {
  const bar = el('div', { className: 'statbar' });
  const stats = [
    ['🔥', state.streak, 'racha'],
    ['⚡', state.xp, 'XP'],
    ['❤️', state.hearts, 'vidas'],
    ['⭐', levelFor(state.xp), 'nivel'],
  ];
  for (const [icon, val, label] of stats) {
    const s = el('div', { className: 'stat' });
    s.appendChild(el('span', { className: 'stat-icon', text: icon }));
    s.appendChild(el('span', { className: 'stat-val', text: String(val) }));
    s.appendChild(el('span', { className: 'stat-label', text: label }));
    bar.appendChild(s);
  }
  return bar;
}

export function renderHome({ state, onStartLesson, onRefill }) {
  const page = el('div', { className: 'home' });
  page.appendChild(statBar(state));

  const list = orderedLessons();
  const completed = new Set(state.completed);

  if (!canStartLesson(state)) {
    const warn = el('div', { className: 'hearts-empty' });
    warn.appendChild(el('p', { text: 'Te quedaste sin vidas ❤️' }));
    if (onRefill) {
      const b = el('button', { className: 'btn primary', text: 'Recargar vidas' });
      b.addEventListener('click', onRefill);
      warn.appendChild(b);
    }
    page.appendChild(warn);
  }

  let prevDone = true; // first lesson always unlocked
  list.forEach(({ unit, lesson }, idx) => {
    const isFirstOfUnit = idx === 0 || list[idx - 1].unit.id !== unit.id;
    if (isFirstOfUnit) {
      page.appendChild(el('h3', { className: 'unit-title', text: unit.title }));
    }

    const done = completed.has(lesson.id);
    const unlocked = prevDone;
    const row = el('div', { className: 'lesson-row' + (done ? ' done' : '') + (unlocked ? '' : ' locked') });

    const bubble = el('button', {
      className: 'lesson-bubble' + (done ? ' done' : '') + (unlocked ? '' : ' locked'),
      text: done ? '✓' : unlocked ? '★' : '🔒',
    });
    if (unlocked && canStartLesson(state)) {
      bubble.addEventListener('click', () => onStartLesson(lesson));
    } else {
      bubble.disabled = true;
    }

    const meta = el('div', { className: 'lesson-meta' });
    meta.appendChild(el('div', { className: 'lesson-name', text: lesson.title }));
    meta.appendChild(el('div', { className: 'lesson-word', text: `${lesson.newWord.es} → ${lesson.newWord.en}` }));

    row.appendChild(bubble);
    row.appendChild(meta);
    page.appendChild(row);

    prevDone = done;
  });

  return page;
}