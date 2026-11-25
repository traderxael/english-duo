import { el, markAndContinue } from './util.js';

// Choose the correct translation.
export function renderChoice(ex, { onDone }) {
  const wrap = el('div', { className: 'exercise' });
  wrap.appendChild(el('h2', { className: 'ex-prompt', text: ex.prompt }));

  const options = el('div', { className: 'options' });
  let answered = false;
  for (const opt of ex.options) {
    const btn = el('button', { className: 'option', text: opt });
    btn.addEventListener('click', () => {
      if (answered) return;
      answered = true;
      markAndContinue(btn, opt === ex.answer, onDone);
    });
    options.appendChild(btn);
  }
  wrap.appendChild(options);
  return wrap;
}