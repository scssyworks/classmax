import { DELIM, POST, PRE } from '../const';

export const startsWith = (value: string, input: string) =>
  value.startsWith(input);

export const substr = (value: string, index: number) => value.substring(index);

export const isString = <T>(value: T | string): value is string =>
  typeof value === 'string';

export const handleSuffix = (key: string, value: string) => {
  if (startsWith(value, POST)) {
    return `${key}${substr(value, POST.length)}`;
  }
  if (startsWith(value, PRE)) {
    return `${substr(value, PRE.length)}${key}`;
  }
  return `${value}${DELIM}${key}`;
};
