import { describe, it, expect } from 'vitest';
import { cm } from '.';

describe('cm', () => {
  it('should create className string', () => {
    expect(cm('foo', 'bar')).toBe('foo bar');
    expect(cm('foo', true, false, 0, 1, null, undefined, 'bar')).toBe(
      'foo bar',
    );
    expect(cm('foo', 'bar', { baz: true })).toBe('foo bar baz');
    expect(cm('foo', 'bar', [['baz'], 'zoo'])).toBe('foo bar baz zoo');
    expect(cm('foo', 'bar', ['baz'], true && 'zoo')).toBe('foo bar baz zoo');
    expect(cm('foo', 'bar', [{ baz: true }])).toBe('foo bar baz');
    expect(cm('foo', { bar: false }, { baz: true, zoo: true })).toBe(
      'foo baz zoo',
    );
  });
});
