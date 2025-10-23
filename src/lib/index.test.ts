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
    expect(cm('foo', cm({ bar: false }, { baz: true, zoo: true }))).toBe(
      'foo baz zoo',
    );
  });

  it('should apply prefix to class', () => {
    expect(cm('foo', 'bar', { baz: 'hello' })).toBe('foo bar hello:baz');
    expect(cm('foo', 'bar', { baz: cm.pre('hello') })).toBe(
      'foo bar hello:baz',
    );
    expect(cm('foo', 'bar', { baz: cm.pre('hello', '~') })).toBe(
      'foo bar hello~baz',
    );
  });

  it('should apply postfix to class', () => {
    expect(cm('foo', 'bar', { baz: cm.post('hello') })).toBe(
      'foo bar baz:hello',
    );
    expect(cm('foo', 'bar', { baz: cm.post('hello', '~') })).toBe(
      'foo bar baz~hello',
    );
  });

  it('should apply prefix or postfix to all classes', () => {
    expect(cm.assign('foo baz', cm.pre('hello'))).toBe('hello:foo hello:baz');
    expect(cm.assign('foo baz', cm.post('hello'))).toBe('foo:hello baz:hello');
    expect(cm.assign('foo baz', cm.pre('hello', '~'))).toBe(
      'hello~foo hello~baz',
    );
    expect(cm.assign('foo baz', cm.post('hello', '~'))).toBe(
      'foo~hello baz~hello',
    );
    expect(
      cm(cm.assign(cm('foo', 'bar'), 'world'), { baz: cm.post('hello') }),
    ).toBe('world:foo world:bar baz:hello');
  });
});
