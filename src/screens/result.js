import { el } from '../exercises/util.js';

export function renderResult({ state, gained, onContinue }) {
  const page = el('div', { className: 'result' });
  page.appendChild(el('h1', { className: 'result-title', text: '¡Lección completada!' }));

  const box = el('div', { className: 'result-box' });
  box.appendChild(el('div', { className: 'result-line', text: `⚡ +${gained.xp} XP` }));
  box.appendChild(el('div', { className: 'result-line', text: `🔥 Racha: ${state.streak}` }));
  box.appendChild(el('div', { className: 'result-line', text: `❤️ Vidas: ${state.hearts}` }));
  if (gained.mistakes === 0) {
    box.appendChild(el('div', { className: 'result-line perfect', text: '✨ ¡Perfecto, sin errores!' }));
  }
  page.appendChild(box);

  const btn = el('button', { className: 'btn primary big', text: 'Continuar' });
  btn.addEventListener('click', onContinue);
  page.appendChild(btn);
  return page;
}