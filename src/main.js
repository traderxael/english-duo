import './styles.css';
import { loadState, saveState } from './state.js';
import { applyLessonResult } from './gamification.js';
import { renderHome } from './screens/home.js';
import { renderLesson } from './screens/lesson.js';
import { renderResult } from './screens/result.js';

const app = document.getElementById('app');
let state = loadState();

function todayISO() {
  const d = new Date();
  const off = d.getTimezoneOffset();
  return new Date(d.getTime() - off * 60000).toISOString().slice(0, 10);
}

function goHome() {
  app.innerHTML = '';
  app.appendChild(
    renderHome({
      state,
      onStartLesson: startLesson,
      onRefill: () => {
        state = { ...state, hearts: 5 };
        saveState(state);
        goHome();
      },
    })
  );
}

function startLesson(lesson) {
  app.innerHTML = '';
  app.appendChild(
    renderLesson({
      lesson,
      onExit: goHome,
      onFinish: ({ xp, mistakes }) => {
        state = applyLessonResult(state, { xp, mistakes }, todayISO());
        if (!state.completed.includes(lesson.id)) state.completed.push(lesson.id);
        saveState(state);
        app.innerHTML = '';
        app.appendChild(renderResult({ state, gained: { xp, mistakes }, onContinue: goHome }));
      },
    })
  );
}

goHome();

// Register the service worker for installability + offline.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}