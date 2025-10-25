import { DELIM, EMPTY, POST, PRE, SPACE } from './const';
import type { ClassType } from './index.types';
import { getSpacer, handleSuffix, isString } from './utils';

export const cm = function classMax(...args: ClassType[]): string {
  let classString = EMPTY;

  for (const cls of args) {
    let spacer = getSpacer(classString);
    if (isString(cls)) {
      classString += `${spacer}${cls}`;
    } else if (Array.isArray(cls)) {
      classString += `${spacer}${cm(...cls)}`;
    } else if (cls && typeof cls === 'object') {
      const entries = Object.entries(cls);
      for (const [keyString, value] of entries) {
        const keys = keyString.split(SPACE);
        const isStr = isString(value) && value;
        for (const key of keys) {
          spacer = getSpacer(classString);
          if (value === true) {
            classString += `${spacer}${key}`;
          }
          if (isStr) {
            classString += `${spacer}${handleSuffix(key, value)}`;
          }
        }
      }
    }
  }

  return classString;
};

export function post(postfix: string, delim?: string): string {
  const d = delim ?? DELIM;
  return `${POST}${d}${postfix}`;
}

export function pre(prefix: string, delim?: string): string {
  const d = delim ?? DELIM;
  return `${PRE}${prefix}${d}`;
}

export function assign(classStr: string, suffix: string): string {
  return cm({ [classStr]: suffix });
}
