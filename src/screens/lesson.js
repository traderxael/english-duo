import { el } from '../exercises/util.js';
import { renderExercise } from '../exercises/index.js';

// Runs a lesson's exercises in order, tracking mistakes, then calls onFinish.
export function renderLesson({ lesson, onFinish, onExit }) {
  const page = el('div', { className: 'lesson' });

  const header = el('div', { className: 'lesson-header' });
  const close = el('button', { className: 'close', text: '✕' });
  if (onExit) close.addEventListener('click', onExit);
  const bar = el('div', { className: 'progress' });
  const fill = el('div', { className: 'progress-fill' });
  bar.appendChild(fill);
  header.appendChild(close);
  header.appendChild(bar);

  const body = el('div', { className: 'lesson-body' });
  page.appendChild(header);
  page.appendChild(body);

  const total = lesson.exercises.length;
  let i = 0;
  let mistakes = 0;

  function show() {
    if (i >= total) {
      const correct = total - mistakes;
      const xp = 10 + (mistakes === 0 ? 5 : 0); // perfect bonus
      onFinish({ xp, mistakes, correct, total });
      return;
    }
    fill.style.width = `${(i / total) * 100}%`;
    body.innerHTML = '';
    const node = renderExercise(lesson.exercises[i], {
      onDone: ({ correct }) => {
        if (!correct) mistakes++;
        i++;
        show();
      },
    });
    body.appendChild(node);
  }

  show();
  return page;
}