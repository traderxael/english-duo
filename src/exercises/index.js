import { renderChoice } from './choice.js';
import { renderOrder } from './order.js';
import { renderListen } from './listen.js';
import { renderSpeak } from './speak.js';

const RENDERERS = {
  choice: renderChoice,
  order: renderOrder,
  listen: renderListen,
  speak: renderSpeak,
};

export function renderExercise(exercise, opts) {
  const fn = RENDERERS[exercise.type];
  if (!fn) throw new Error(`Unknown exercise type: ${exercise.type}`);
  return fn(exercise, opts);
}