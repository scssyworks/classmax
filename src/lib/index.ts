import { DELIM, EMPTY, POST, PRE, SPACE } from './const';
import type { ClassType } from './index.types';
import { handleSuffix, isString } from './utils';

export function cm(...args: ClassType[]): string;
export function cm(): string {
  let cStr = EMPTY;

  for (const cls of arguments) {
    if (cls) {
      if (isString(cls) || typeof cls === 'number') {
        cStr = cStr && (cStr += SPACE);
        cStr += cls;
      } else if (Array.isArray(cls)) {
        for (const clsInner of cls) {
          cStr = cStr && (cStr += SPACE);
          cStr += cm(clsInner);
        }
      } else if (typeof cls === 'object') {
        for (const keyStr in cls) {
          const keys = keyStr.split(SPACE);
          const value = cls[keyStr];
          if (value) {
            const isStr = isString(value);
            for (const key of keys) {
              cStr = cStr && (cStr += SPACE);
              if (value === true) {
                cStr += key;
              }
              if (isStr) {
                cStr += handleSuffix(key, value);
              }
            }
          }
        }
      }
    }
  }

  return cStr;
}

export const post = (postfix: string, delim?: string): string =>
  `${POST}${delim || DELIM}${postfix}`;

export const pre = (prefix: string, delim?: string): string =>
  `${PRE}${prefix}${delim || DELIM}`;
