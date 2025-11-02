import { DELIM, EMPTY, POST, PRE, SPACE } from './const';
import type { ClassType } from './index.types';
import { append, handleSuffix, hasOwn, isStrOrNum } from './utils';

export function cm(...args: ClassType[]): string;
export function cm(): string {
  var cStr = EMPTY,
    cls: ClassType,
    args = arguments;
  for (var idx = 0; idx < args.length; idx++) {
    if ((cls = args[idx])) {
      if (isStrOrNum(cls)) {
        cStr = append(cStr, cls);
      } else if (Array.isArray(cls)) {
        for (var jdx = 0; jdx < cls.length; jdx++) {
          cStr = append(cStr, cm(cls[jdx]));
        }
      } else if (typeof cls === 'object') {
        for (var keyStr in cls) {
          if (hasOwn.call(cls, keyStr)) {
            var keys = keyStr.split(SPACE);
            if (cls[keyStr]) {
              for (var kdx = 0; kdx < keys.length; kdx++) {
                cStr = append(cStr, handleSuffix(keys[kdx], cls[keyStr]));
              }
            }
          }
        }
      }
    }
  }

  return cStr;
}

export function post(
  postfix: string | number,
  delim?: string,
): string | boolean {
  return (
    !isStrOrNum(postfix) ||
    POST + (typeof delim === 'string' ? delim : DELIM) + postfix
  );
}
export function pre(prefix: string | number, delim?: string): string | boolean {
  return (
    !isStrOrNum(prefix) ||
    PRE + prefix + (typeof delim === 'string' ? delim : DELIM)
  );
}
