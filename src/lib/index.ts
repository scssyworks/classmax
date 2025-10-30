import { DELIM, EMPTY, POST, PRE, SPACE } from './const';
import type { ClassType } from './index.types';
import { handleSuffix } from './utils';

export function cm(...args: ClassType[]): string;
export function cm(): string {
  var cStr = EMPTY,
    cls: ClassType,
    idx = 0,
    len = arguments.length;

  for (; idx < len; idx++) {
    if ((cls = arguments[idx])) {
      if (typeof cls === 'string' || typeof cls === 'number') {
        cStr += (cStr ? SPACE : EMPTY) + cls;
      } else if (Array.isArray(cls)) {
        var jdx = 0;
        for (; jdx < cls.length; jdx++) {
          var clsInner = cls[jdx];
          cStr += (cStr ? SPACE : EMPTY) + cm(clsInner);
        }
      } else if (typeof cls === 'object') {
        var keyStr: string;
        for (keyStr in cls) {
          var keys = keyStr.split(SPACE),
            value = cls[keyStr],
            key: string,
            obVal: string | boolean;
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
