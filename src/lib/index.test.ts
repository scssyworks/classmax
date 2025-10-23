import { describe, it, expect } from 'vitest';
import { cm } from '.';

describe('cm', () => {
  it('should create className string', () => {
    expect(cm('foo', 'bar', { baz: true })).toBe('foo bar baz');
  });
});
