# Classmix

Classmix is utility to construct className strings conditionally (similar to `classNames` and `clsx`), with option to prefix or postfix class modifiers which are very common with modern css libraries like tailwind.

# Install

```sh
npm i classmix
```

# Usage

```ts
classMix('foo', 'bar', { baz: true }); // foo bar baz
classMix('foo', { bar: true, baz: 'hello' }); // foo bar hello:baz
classMix('foo', null, undefined, false, true, 0, 1, {
  bar: false,
  baz: classMix.post('hello'),
}); // foo baz:hello
classMix('foo', { bar: false, baz: classMix.post('hello', '~') }); // foo baz~hello
classMix.assign(
  classMix('foo', { bar: true, baz: 'hello' }),
  classMix.post('hello'),
); // foo:hello bar:hello hello:baz:hello
```

These are just few examples. Classmix can do everything that `classNames` can do with extra functionality sprinkled on top.
