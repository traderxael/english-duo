import { describe, it, expect } from 'vitest';
import { isRecognitionSupported } from './speech.js';

describe('speech', () => {
  it('reports recognition unsupported when the API is absent', () => {
    // jsdom has no SpeechRecognition/webkitSpeechRecognition
    expect(isRecognitionSupported()).toBe(false);
  });
});