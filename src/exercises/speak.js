import { el, normalize, markAndContinue } from './util.js';
import { speak, listenOnce, isRecognitionSupported } from '../speech.js';

// Say the phrase out loud (Android Chrome). Falls back gracefully.
export function renderSpeak(ex, { onDone }) {
  const wrap = el('div', { className: 'exercise' });
  wrap.appendChild(el('h2', { className: 'ex-prompt', text: ex.prompt }));
  wrap.appendChild(el('p', { className: 'ex-hint', text: `Decí: “${ex.answer}”` }));

  const feedback = el('div', { className: 'feedback' });

  if (!isRecognitionSupported()) {
    wrap.appendChild(el('p', { className: 'ex-hint', text: 'Tu navegador no reconoce voz. Escuchá y repetí en voz alta.' }));
    const hear = el('button', { className: 'btn blue', text: '🔊 Escuchar' });
    hear.addEventListener('click', () => speak(ex.answer));
    const cont = el('button', { className: 'btn primary', text: 'Continuar' });
    cont.addEventListener('click', () => markAndContinue(cont, true, onDone));
    wrap.appendChild(hear);
    wrap.appendChild(cont);
    wrap.appendChild(feedback);
    return wrap;
  }

  const mic = el('button', { className: 'btn mic', text: '🎤 Tocar para hablar' });
  mic.addEventListener('click', async () => {
    mic.disabled = true;
    feedback.textContent = 'Escuchando…';
    feedback.className = 'feedback';
    try {
      const said = await listenOnce();
      const ok = normalize(said).includes(normalize(ex.answer)) || normalize(said) === normalize(ex.answer);
      feedback.textContent = ok ? `¡Muy bien! (“${said}”)` : `Escuché “${said}”. Era: ${ex.answer}`;
      feedback.className = 'feedback ' + (ok ? 'correct' : 'wrong');
      markAndContinue(mic, ok, onDone);
    } catch {
      mic.disabled = false;
      feedback.textContent = 'No te entendí. Probá de nuevo o escuchá y repetí.';
      feedback.className = 'feedback wrong';
    }
  });

  const hear = el('button', { className: 'btn blue', text: '🔊 Escuchar' });
  hear.addEventListener('click', () => speak(ex.answer));

  wrap.appendChild(mic);
  wrap.appendChild(hear);
  wrap.appendChild(feedback);
  return wrap;
}