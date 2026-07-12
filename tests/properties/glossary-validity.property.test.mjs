import { describe, it, expect } from 'vitest';
import { glossary } from '../../src/data/glossary.ts';

describe('Glossary validity', () => {
  it('has non-empty string definitions for every key', () => {
    const keys = Object.keys(glossary);
    expect(keys.length).toBeGreaterThan(5);
    for (const key of keys) {
      expect(typeof glossary[key]).toBe('string');
      expect(glossary[key].trim().length).toBeGreaterThan(10);
    }
  });
});
