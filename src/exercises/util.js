// Shared helpers for exercise renderers.
export function normalize(s) {
  return (s || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s']/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function el(tag, opts = {}, children = []) {
  const node = document.createElement(tag);
  if (opts.className) node.className = opts.className;
  if (opts.text != null) node.textContent = opts.text;
  if (opts.attrs) for (const [k, v] of Object.entries(opts.attrs)) node.setAttribute(k, v);
  for (const c of [].concat(children)) if (c) node.appendChild(c);
  return node;
}

// Flash a button green/red, then continue after a short beat.
export function markAndContinue(button, correct, onDone) {
  button.classList.add(correct ? 'correct' : 'wrong');
  button.disabled = true;
  setTimeout(() => onDone({ correct }), correct ? 550 : 900);
}