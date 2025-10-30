import { DELIM, EMPTY, POST, PRE, SPACE } from './const';
import type { ClassType } from './index.types';
import { handleSuffix } from './utils';

export function cm(...args: ClassType[]): string;
export function cm(): string {
  var cStr = EMPTY,
    cls: ClassType,
    clsInner: ClassType,
    keyStr: string,
    keys: string[],
    key: string,
    obVal: string | boolean,
    idx = 0,
    jdx = 0,
    len = arguments.length;

  for (; idx < len; idx++) {
    if ((cls = arguments[idx])) {
      if (typeof cls === 'string' || typeof cls === 'number') {
        cStr += (cStr ? SPACE : EMPTY) + cls;
      } else if (Array.isArray(cls)) {
        jdx = 0;
        for (; jdx < cls.length; jdx++) {
          clsInner = cls[jdx];
          cStr += (cStr ? SPACE : EMPTY) + cm(clsInner);
        }
      } else if (typeof cls === 'object') {
        for (keyStr in cls) {
          keys = keyStr.split(SPACE);
          const value = cls[keyStr];
          if (value) {
            for (key of keys) {
              if ((obVal = handleSuffix(key, value))) {
                cStr += (cStr ? SPACE : EMPTY) + obVal;
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
  POST + (delim || DELIM) + postfix;

export const pre = (prefix: string, delim?: string): string =>
  PRE + prefix + (delim || DELIM);
