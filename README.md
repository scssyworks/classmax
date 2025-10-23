# Classmax

Classmax is utility to construct className strings conditionally (similar to `classNames` and `clsx`), with option to prefix or postfix class modifiers which are very common with modern css libraries like tailwind.

# Install

```sh
npm i classmax
```

# Usage

```ts
cm('foo', 'bar', { baz: true }); // foo bar baz
cm('foo', { bar: true, baz: 'hello' }); // foo bar hello:baz
cm('foo', null, undefined, false, true, 0, 1, {
  bar: false,
  baz: cm.post('hello'),
}); // foo baz:hello
cm('foo', { bar: false, baz: cm.post('hello', '~') }); // foo baz~hello
cm.assign(cm('foo', { bar: true, baz: 'hello' }), cm.post('hello')); // foo:hello bar:hello hello:baz:hello
```

These are just few examples. Classmax can do everything that `classNames` can do with extra functionality sprinkled on top.
