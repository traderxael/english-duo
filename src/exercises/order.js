import { el, markAndContinue } from './util.js';

// Build the sentence by tapping words in order.
export function renderOrder(ex, { onDone }) {
  const wrap = el('div', { className: 'exercise' });
  wrap.appendChild(el('h2', { className: 'ex-prompt', text: ex.prompt }));

  const answerArea = el('div', { className: 'answer-area' });
  const pool = el('div', { className: 'word-pool' });
  const chosen = [];

  const check = el('button', { className: 'btn primary', text: 'Comprobar' });
  const feedback = el('div', { className: 'feedback' });

  function renderPool() {
    pool.innerHTML = '';
    ex.words.forEach((w, i) => {
      if (chosen.some((c) => c.i === i)) return;
      const b = el('button', { className: 'word', text: w });
      b.addEventListener('click', () => {
        chosen.push({ w, i });
        renderAll();
      });
      pool.appendChild(b);
    });
  }
  function renderAnswer() {
    answerArea.innerHTML = '';
    chosen.forEach((c, idx) => {
      const b = el('button', { className: 'word chosen', text: c.w });
      b.addEventListener('click', () => {
        chosen.splice(idx, 1);
        renderAll();
      });
      answerArea.appendChild(b);
    });
  }
  function renderAll() {
    renderPool();
    renderAnswer();
    check.disabled = chosen.length === 0;
  }

  check.addEventListener('click', () => {
    const ok = chosen.map((c) => c.w).join(' ') === ex.answer.join(' ');
    check.disabled = true;
    markAndContinue(check, ok, onDone);
    feedback.textContent = ok ? '¡Correcto!' : `Era: ${ex.answer.join(' ')}`;
    feedback.className = 'feedback ' + (ok ? 'correct' : 'wrong');
  });

  wrap.appendChild(answerArea);
  wrap.appendChild(pool);
  wrap.appendChild(check);
  wrap.appendChild(feedback);
  renderAll();
  return wrap;
}