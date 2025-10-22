import { describe, it, expect } from 'vitest';
import { classMix } from '.';

describe('classMix', () => {
  it('should create className string', () => {
    expect(classMix('foo', 'bar', { baz: true })).toBe('foo bar baz');
  });
});
