import { DELIM, POST, PRE } from '../const';

export const startsWith = (value: string, input: string) => {
  return value.startsWith(input);
};

export const substr = (value: string, index: number) => {
  return value.substring(index);
};

export const isString = <T>(value: T | string): value is string =>
  typeof value === 'string';

export const isObject = <T>(value: T | object): value is object =>
  value && typeof value === 'object';

export const isBool = <T>(value: T | boolean): value is boolean =>
  typeof value === 'boolean';

export const trim = (value: string) => value.trim();

export const handleSuffix = (key: string, value: string) => {
  if (startsWith(value, POST)) {
    return `${key}${substr(value, POST.length)}`;
  } else if (startsWith(value, PRE)) {
    return `${substr(value, PRE.length)}${key}`;
  } else {
    return `${value}${DELIM}${key}`;
  }
};
