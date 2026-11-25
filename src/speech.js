// Web Speech API wrappers. TTS for "listen", SpeechRecognition for "speak".
// On Android Chrome both work; elsewhere we degrade gracefully.

function getRecognitionCtor() {
  if (typeof window === 'undefined') return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

export function isRecognitionSupported() {
  return !!getRecognitionCtor();
}

export function speak(text) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    u.rate = 0.95;
    window.speechSynthesis.speak(u);
  } catch {
    // ignore: TTS unavailable
  }
}

export function listenOnce() {
  const Ctor = getRecognitionCtor();
  if (!Ctor) return Promise.reject(new Error('SpeechRecognition not supported'));
  return new Promise((resolve, reject) => {
    const rec = new Ctor();
    rec.lang = 'en-US';
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = (e) => resolve(e.results[0][0].transcript.trim());
    rec.onerror = (e) => reject(new Error(e.error || 'recognition error'));
    rec.start();
  });
}