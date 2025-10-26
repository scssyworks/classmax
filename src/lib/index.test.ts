import { describe, it, expect } from 'vitest';
import { cm, post, pre } from '.';

describe('cm', () => {
  it('should return empty string if no arguments are passed', () => {
    expect(cm()).toBe('');
  });
  it('should create className string', () => {
    expect(cm('foo', 'bar')).toBe('foo bar');
    expect(cm('foo', true, false, 0, 1, null, undefined, 'bar')).toBe(
      'foo 1 bar',
    );
    expect(cm('foo', 'bar', { baz: true })).toBe('foo bar baz');
    expect(cm('foo', 'bar', [['baz'], 'zoo'])).toBe('foo bar baz zoo');
    expect(cm('foo', 'bar', ['baz'], true && 'zoo')).toBe('foo bar baz zoo');
    expect(cm('foo', 'bar', [{ baz: true }])).toBe('foo bar baz');
    expect(cm('foo', { bar: false }, { baz: true, zoo: true })).toBe(
      'foo baz zoo',
    );
    expect(cm('foo', cm({ bar: false }, { baz: true, zoo: true }))).toBe(
      'foo baz zoo',
    );
  });

  it('should apply prefix to class', () => {
    expect(cm('foo', 'bar', { baz: 'hello' })).toBe('foo bar hello:baz');
    expect(cm('foo', 'bar', { baz: pre('hello') })).toBe('foo bar hello:baz');
    expect(cm('foo', 'bar', { baz: pre('hello', '~') })).toBe(
      'foo bar hello~baz',
    );
    expect(cm('foo', 'bar', { 'baz zoo pic': pre('hello', '~') })).toBe(
      'foo bar hello~baz hello~zoo hello~pic',
    );
  });

  it('should apply postfix to class', () => {
    expect(cm('foo', 'bar', { baz: post('hello') })).toBe('foo bar baz:hello');
    expect(cm('foo', 'bar', { baz: post('hello', '~') })).toBe(
      'foo bar baz~hello',
    );
  });

  it('should apply prefix or postfix to all classes', () => {
    expect(cm({ 'foo baz': pre('hello') })).toBe('hello:foo hello:baz');
    expect(cm({ 'foo baz': post('hello') })).toBe('foo:hello baz:hello');
    expect(cm({ 'foo baz': pre('hello', '~') })).toBe('hello~foo hello~baz');
    expect(cm({ 'foo baz': post('hello', '~') })).toBe('foo~hello baz~hello');
    expect(cm({ [cm('foo', 'baz', { bar: 'hello' })]: post('hello') })).toBe(
      'foo:hello baz:hello hello:bar:hello',
    );
    expect(
      cm(cm({ [cm('foo', 'bar')]: 'world' }), { baz: post('hello') }),
    ).toBe('world:foo world:bar baz:hello');
  });

  it('should handle special strings correctly', () => {
    expect(cm('foo', 'bar', { baz: '<:' })).toBe('foo bar baz');
    expect(cm('foo', 'bar', { baz: '>:' })).toBe('foo bar baz');
  });
});
