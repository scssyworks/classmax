import { DELIM, EMPTY, PLEN, POST, PRE, SPACE } from '../const';
import type { Primitives } from '../index.types';

export const hasOwn = {}.hasOwnProperty;

export function append(cStr: string, next: string | number) {
  if (cStr) {
    return next ? cStr + SPACE + next : cStr;
  }
  return next + EMPTY;
}

export function isStrOrNum<T>(
  value: T | string | number,
): value is string | number {
  return typeof value === 'string' || typeof value === 'number';
}

export function handleSuffix(key: string, value: Primitives) {
  if (isStrOrNum(value)) {
    var val = value + '';
    if (val.startsWith(POST)) {
      return key + val.substring(PLEN);
    }
    if (val.startsWith(PRE)) {
      return val.substring(PLEN) + key;
    }
    return val + DELIM + key;
  }
  return value === true ? key : EMPTY;
}
