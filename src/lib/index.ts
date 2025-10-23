import { DELIM, POST, PRE } from './const';
import type { ClassType } from './index.types';
import { handleSuffix, isBool, isObject, isString, trim } from './utils';

export const cm = function classMax(...args: ClassType[]): string {
  return args.reduce<string>((classString, curr) => {
    if (!curr || (!isObject(curr) && !isString(curr))) {
      return trim(classString);
    }
    if (isString(curr)) {
      return trim(`${classString} ${curr}`);
    }
    if (Array.isArray(curr)) {
      return trim(`${classString} ${cm(...curr)}`);
    }
    return trim(
      `${classString} ${cm(
        ...Object.entries(curr).reduce<string[]>((acc, next) => {
          const [key, value] = next;
          if (isBool(value) && value) {
            acc.push(key);
          }
          if (isString(value) && trim(value)) {
            acc.push(handleSuffix(key, value));
          }
          return acc;
        }, []),
      )}`,
    );
  }, '');
};

export function post(postfix: string, delim?: string): string {
  const d = delim ?? DELIM;
  return `${POST}${d}${postfix}`;
}

export function pre(prefix: string, delim?: string): string {
  const d = delim ?? DELIM;
  return `${PRE}${prefix}${d}`;
}

export function assign(classString: string, suffix: string): string {
  return classString.split(' ').reduce((acc, next) => {
    const cls = handleSuffix(next, suffix);
    return trim(`${acc} ${cls}`);
  }, '');
}
