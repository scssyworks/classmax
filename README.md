# Classmax

Classmax is utility to construct className strings conditionally (similar to `classNames` and `clsx`), with option to prefix or postfix class modifiers which are very common with modern css libraries like tailwind.

## Install

```sh
npm i classmax
```

## Usage

```ts
import { cm } from 'classmax';

cm('foo', 'bar', { baz: true }); // foo bar baz
cm('foo', { bar: true, baz: 'hello' }); // foo bar hello:baz
cm('foo', null, undefined, false, true, 0, 1, {
  bar: false,
  baz: cm.post('hello'),
}); // foo baz:hello
cm('foo', { bar: false, baz: cm.post('hello', '~') }); // foo baz~hello
cm.assign(cm('foo', { bar: true, baz: 'hello' }), cm.post('hello')); // foo:hello bar:hello hello:baz:hello
```

These are just few examples. Classmax does everything that `classNames` can with extra functionality sprinkled on top.

## Few things to keep in mind!

Unlike `classNames` and `clsx`, classmax uses the object value as prefix if it is a valid string. Therefore, don't treat it as a drop in replacement of classNames and clsx.

Here's the key difference shown below:

```ts
clsx('foo', 'bar', { baz: 'hello' }); // foo bar baz
cm('foo', 'bar', { baz: 'hello' }); // foo bar hello:baz
```

If you want the same behaviour as `clsx`, just wrap the value in `Boolean`.

```ts
clsx('foo', 'bar', { baz: 'hello' }); // foo bar baz
cm('foo', 'bar', { baz: Boolean('hello') }); // foo bar baz
```

Classmax also ignore non string values to keep the class string cleaner. For example:

```ts
cm('hello', 'world', 0, 1, true, false); // hello world
classNames('hello', 'world', 0, 1, true, false); // hello world 1
```

If you really want `1` to be there then convert it into a string.

There are special strings: `pre:` and `post:` which will not apply by default.

```ts
cm('foo', 'bar', { baz: 'pre:' }); // foo bar baz
cm('foo', 'bar', { baz: 'post:' }); // foo bar baz
```

It's weird. I know! But to make it work use `cm.pre('pre:')` and `cm.post('post:')`.

## Disclaimer

This package is still new and might contain bugs. Please let us know if in case this package is not working well for you.
