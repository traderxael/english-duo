import { el, normalize, markAndContinue } from './util.js';
import { speak } from '../speech.js';

// Listen and type what you hear.
export function renderListen(ex, { onDone }) {
  const wrap = el('div', { className: 'exercise' });
  wrap.appendChild(el('h2', { className: 'ex-prompt', text: ex.prompt }));

  const play = el('button', { className: 'btn blue', text: '🔊 Escuchar' });
  play.addEventListener('click', () => speak(ex.answer));

  const input = el('input', { className: 'text-input', attrs: { type: 'text', placeholder: 'Escribí en inglés…', autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false' } });
  const check = el('button', { className: 'btn primary', text: 'Comprobar' });
  const feedback = el('div', { className: 'feedback' });

  let answered = false;
  check.addEventListener('click', () => {
    if (answered) return;
    answered = true;
    const ok = normalize(input.value) === normalize(ex.answer);
    feedback.textContent = ok ? '¡Correcto!' : `Era: ${ex.answer}`;
    feedback.className = 'feedback ' + (ok ? 'correct' : 'wrong');
    markAndContinue(check, ok, onDone);
  });
  input.addEventListener('keydown', (e) => { if (e.key === 'Enter') check.click(); });

  wrap.appendChild(play);
  wrap.appendChild(input);
  wrap.appendChild(check);
  wrap.appendChild(feedback);
  // Auto-play the word when the exercise opens.
  setTimeout(() => speak(ex.answer), 250);
  return wrap;
}