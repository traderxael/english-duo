# English Duo (PWA) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A Duolingo-style, installable/offline PWA to learn English (Spanish speaker, basic–medium level) focused on everyday vocabulary, grammar, and pronunciation.

**Architecture:** A dependency-light Vite single-page app. Pure ES modules render screens into one `#app` root. All progress lives in `localStorage` (no backend, no account). A service worker + web manifest make it installable and offline. Speech uses the browser Web Speech API (TTS for "listen", SpeechRecognition for "speak").

**Tech Stack:** Vite 5, vanilla JS (ES modules), CSS, Vitest (unit tests for pure logic), Web Speech API, GitHub Pages + GitHub Actions.

**Spec:** `docs/superpowers/specs/2026-11-25-english-duo-design.md` (the approved design, summarized in Global Constraints).

## Global Constraints

- Installable PWA: must provide `manifest.webmanifest` (name, icons 192 & 512 PNG, `display: standalone`) and a service worker that precaches the app shell; "Add to home screen" must work on Android Chrome.
- Works offline after first load.
- No backend, no login; all state in `localStorage` under key `english-duo:v1`.
- Content is Spanish→English; each lesson introduces exactly one new everyday word plus one grammar point and pronunciation practice.
- Pronunciation uses `SpeechRecognition` (Android Chrome); degrade gracefully when unavailable.
- Deploy to GitHub Pages from `main` via GitHub Actions; repo name `english-duo`, owner `traderxael`.
- Vite `base` must be `/english-duo/` so asset paths resolve under the Pages subpath.

## Review Focus

- First load with no saved state → fresh profile (0 XP, 0 streak, full hearts), not a crash. (Task 3 test)
- `localStorage` containing corrupt/legacy JSON → falls back to a fresh profile instead of throwing. (Task 3 test)
- Day rollover: streak increments only when last practice was yesterday, resets if a gap > 1 day. (Task 4 test)
- Hearts reaching 0 blocks starting a lesson and shows a refill path, not a broken screen. (Task 4 test)
- `SpeechRecognition` undefined (unsupported browser) → speak exercise shows a fallback message, lesson still completable. (Task 5 test)

---

### Task 1: Project scaffold + installable shell

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `src/main.js`, `src/styles.css`, `public/manifest.webmanifest`, `public/sw.js`, `scripts/gen-icons.mjs`, `.gitignore`

**Interfaces:**
- Produces: `index.html` with `<div id="app"></div>` and `<script type="module" src="/src/main.js">`; `main.js` exports `mount()` and renders a placeholder into `#app`.

- [ ] **Step 1:** `npm init -y`, install `vite` and `vitest` as devDeps; add scripts `dev`, `build`, `preview`, `test`, `icons`.
- [ ] **Step 2:** Write `vite.config.js` with `base: '/english-duo/'`.
- [ ] **Step 3:** Write `scripts/gen-icons.mjs` (pure Node + zlib PNG encoder) that emits `public/icon-192.png` and `public/icon-512.png` (green rounded square, white "EN"). Run `npm run icons`; verify both files exist.
- [ ] **Step 4:** Write `public/manifest.webmanifest` referencing both icons, `display: standalone`, `start_url: "/english-duo/"`.
- [ ] **Step 5:** Write `public/sw.js` precaching `/`, `/index.html`, and built assets (cache-first, versioned cache name).
- [ ] **Step 6:** Write `index.html` + `src/main.js` (`mount()` renders "English Duo" placeholder) + `src/styles.css` base.
- [ ] **Step 7:** `npm run build` succeeds; `npm run dev` loads with no console errors.
- [ ] **Step 8:** Commit.

### Task 2: Lesson content model + seed data

**Files:**
- Create: `src/data/lessons.js`, `src/data/lessons.test.js`

**Interfaces:**
- Produces: `export const UNITS` — array of `{ id, title, lessons: Lesson[] }`; `Lesson = { id, title, newWord: {es,en}, grammar: {title,body}, exercises: Exercise[] }`; `Exercise` is one of `{type:'choice',prompt,options,answer}`, `{type:'order',prompt,words,answer}`, `{type:'listen',prompt,answer}`, `{type:'speak',prompt,answer}`.

- [ ] **Step 1:** Write `lessons.test.js` asserting every lesson has exactly one `newWord`, one `grammar`, and ≥1 exercise, and every `answer` is contained in its `options`/`words`.
- [ ] **Step 2:** Run test → FAIL (no data).
- [ ] **Step 3:** Author `lessons.js`: 5 units × 3 lessons of everyday vocab + grammar + mixed exercises.
- [ ] **Step 4:** Run test → PASS.
- [ ] **Step 5:** Commit.

### Task 3: Persistent state

**Files:**
- Create: `src/state.js`, `src/state.test.js`

**Interfaces:**
- Produces: `loadState()`, `saveState(s)`, `defaultState()`; state shape `{ xp, streak, lastPracticeDay, hearts, completed: string[], dailyGoal, achievements: string[] }`.

- [ ] **Step 1:** Write tests: fresh load returns `defaultState()`; corrupt JSON returns `defaultState()`; save→load round-trips.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement with try/catch around `JSON.parse`.
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5:** Commit.

### Task 4: Gamification logic

**Files:**
- Create: `src/gamification.js`, `src/gamification.test.js`

**Interfaces:**
- Consumes: state shape from Task 3.
- Produces: `applyLessonResult(state, {xp, mistakes}, todayISO)` → new state (adds XP, updates streak by day diff, decrements hearts per mistake, unlocks achievements); `levelFor(xp)`; `canStartLesson(state)`.

- [ ] **Step 1:** Write tests for streak rollover (yesterday→+1, gap>1→reset to 1, same day→unchanged), hearts floor at 0, `canStartLesson` false at 0 hearts.
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement pure functions.
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5:** Commit.

### Task 5: Speech module

**Files:**
- Create: `src/speech.js`, `src/speech.test.js`

**Interfaces:**
- Produces: `speak(text)`, `isRecognitionSupported()`, `listenOnce()` → `Promise<string>` (transcript).

- [ ] **Step 1:** Write test: `isRecognitionSupported()` returns false when `window.SpeechRecognition`/`webkitSpeechRecognition` absent (jsdom).
- [ ] **Step 2:** Run → FAIL.
- [ ] **Step 3:** Implement TTS via `speechSynthesis`; STT via prefixed constructor; reject gracefully if unsupported.
- [ ] **Step 4:** Run → PASS.
- [ ] **Step 5:** Commit.

### Task 6: Exercise renderers

**Files:**
- Create: `src/exercises/choice.js`, `order.js`, `listen.js`, `speak.js`, `index.js`

**Interfaces:**
- Consumes: `Exercise` shapes (Task 2), `speak`/`listenOnce` (Task 5).
- Produces: `renderExercise(exercise, {onDone})` → DOM node; `onDone({correct:boolean})`.

- [ ] **Step 1:** Implement the four renderers + `index.js` dispatcher by `exercise.type`.
- [ ] **Step 2:** `speak` type uses `isRecognitionSupported()`; if false, show fallback and a "Continue" that calls `onDone({correct:true})`.
- [ ] **Step 3:** Manual check in `npm run dev`: each type renders and resolves.
- [ ] **Step 4:** Commit.

### Task 7: Home screen (path + stats)

**Files:**
- Create: `src/screens/home.js`

**Interfaces:**
- Consumes: `UNITS` (Task 2), state (Task 3), `levelFor`/`canStartLesson` (Task 4).
- Produces: `renderHome({state, onStartLesson})` → DOM node showing stats bar (XP, streak, hearts, level) and unit/lesson path with locked/unlocked states.

- [ ] **Step 1:** Implement stats bar + path; locked lessons not clickable; if `!canStartLesson`, show refill hint.
- [ ] **Step 2:** Manual check in dev.
- [ ] **Step 3:** Commit.

### Task 8: Lesson runner + result

**Files:**
- Create: `src/screens/lesson.js`, `src/screens/result.js`, Modify: `src/main.js`

**Interfaces:**
- Consumes: `renderExercise` (Task 6), `applyLessonResult` (Task 4), `saveState` (Task 3).
- Produces: `renderLesson({lesson, state, onFinish})` runs exercises in order, tracks mistakes, then `onFinish({xp,mistakes})`; `renderResult({state, gained})` shows XP earned and "Continue" → home.

- [ ] **Step 1:** Wire `main.js` router: home → lesson → result → home, persisting state after each lesson.
- [ ] **Step 2:** Manual end-to-end in dev: complete a lesson, see XP/streak update, hearts drop on mistakes.
- [ ] **Step 3:** Commit.

### Task 9: Visual polish (Duolingo-ish)

**Files:**
- Modify: `src/styles.css`

**Interfaces:** none (CSS only).

- [ ] **Step 1:** Rounded green primary buttons, card path, progress bar, big friendly type, responsive to phone width.
- [ ] **Step 2:** Manual check at 390px width.
- [ ] **Step 3:** Commit.

### Task 10: GitHub repo + Pages deploy

**Files:**
- Create: `.github/workflows/deploy.yml`, `README.md`

**Interfaces:** none.

- [ ] **Step 1:** Write `README.md` (what it is, install-on-phone steps, dev commands).
- [ ] **Step 2:** Write GitHub Actions workflow: on push to `main`, `npm ci`, `npm run build`, upload `dist/`, deploy to Pages.
- [ ] **Step 3:** `gh repo create traderxael/english-duo --public --source . --push`.
- [ ] **Step 4:** Enable Pages via `gh api` (source = GitHub Actions); push triggers first deploy.
- [ ] **Step 5:** Verify the Pages URL loads and is installable on Android Chrome.
- [ ] **Step 6:** Commit any remaining changes.