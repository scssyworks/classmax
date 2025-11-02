[![CI](https://github.com/scssyworks/classmax/actions/workflows/ci.yaml/badge.svg)](https://github.com/scssyworks/classmax/actions/workflows/ci.yaml) ![NPM License](https://img.shields.io/npm/l/classmax?color=blue) ![NPM Version](https://img.shields.io/npm/v/classmax) ![Codecov](https://img.shields.io/codecov/c/github/scssyworks/classmax)

# Classmax

Classmax is a utility to construct className strings conditionally (similar to `classNames` and `clsx`) with an additional option to prefix or postfix class modifiers.

## Install

```sh
npm i classmax
```

## Usage

### Simple usage

```ts
import { cm, post, pre } from 'classmax';

cm('foo', 'bar', 'baz'); // foo bar baz
cm('foo', 0, 1, true, false, 'bar'); // foo 1 bar
cm('foo', 'bar', { baz: true }); // foo bar baz
cm('foo', { bar: true }, { baz: false }); // foo bar
cm({ foo: true, bar: false, baz: true }); // foo baz
cm('foo', ['bar'], [['baz']]); // foo bar baz
```

### Complex usage

#### Class prefix

```ts
cm('foo', { bar: true, baz: 'sm' }); // foo bar sm:baz
cm('foo', null, undefined, false, true, 0, 1, {
  bar: false,
  baz: pre('md'),
}); // foo 1 md:baz
cm('foo', { bar: false, baz: pre('lg', '~') }); // foo lg~baz
```

#### Class postfix

```ts
cm('foo', null, undefined, false, true, 0, 1, {
  bar: false,
  baz: post('xs'),
}); // foo 1 baz:xs
cm('foo', { bar: false, baz: post('sm', '~') }); // foo baz~sm
```

#### Prefix/postfix multiple classes at once

```ts
cm({ 'foo bar baz': 'sm' }); // sm:foo sm:bar sm:baz
cm({ 'foo bar baz': pre('md') }); // md:foo md:bar md:baz
cm({ [cm('foo', { bar: true, baz: 'sm' })]: post('lg') }); // foo:lg bar:lg sm:baz:lg
```

## Disclaimer

Classmax is NOT a drop-in replacement of `classnames` and `clsx` libraries although it offers a similar functionality.

### Key differences

Here are some key differences shown below:

```ts
clsx('foo', 'bar', { baz: 'sm' }); // foo bar baz
cm('foo', 'bar', { baz: 'sm' }); // foo bar sm:baz
```

**Fix:**

```ts
clsx('foo', 'bar', { baz: 'hello' }); // foo bar baz
cm('foo', 'bar', { baz: Boolean('hello') }); // foo bar baz
```

There are special strings that `classmax` use internally: `<:` and `>:` and will not apply as a prefix or postfix.

```ts
cm('foo', 'bar', { baz: '<:' }); // foo bar baz
cm('foo', 'bar', { baz: '>:' }); // foo bar baz
```

**Fix:** Use `pre('>:')` and `post('<:')`.

## Warning!!

This package is new and can contain bugs.
