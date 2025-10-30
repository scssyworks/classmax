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
        var jdx = 0,
          cLen = cls.length;
        for (; jdx < cLen; jdx++) {
          var clsInner = cls[jdx];
          if (clsInner) {
            cStr += (cStr ? SPACE : EMPTY) + cm(clsInner);
          }
        }
      } else if (typeof cls === 'object') {
        var keyStr: string;
        for (keyStr in cls) {
          if (cls.hasOwnProperty(keyStr)) {
            var keys = keyStr.split(SPACE),
              kdx = 0,
              value = cls[keyStr],
              kLen = keys.length,
              obVal: string | boolean;
            if (value) {
              for (; kdx < kLen; kdx++) {
                if ((obVal = handleSuffix(keys[kdx], value))) {
                  cStr += (cStr ? SPACE : EMPTY) + obVal;
                }
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
