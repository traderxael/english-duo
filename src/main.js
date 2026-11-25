import './styles.css';

export function mount() {
  const app = document.getElementById('app');
  app.innerHTML = '<div class="boot">English Duo</div>';
}

mount();

// Register the service worker for installability + offline.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    new URL('./sw.js', window.location.href).pathname;
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  });
}