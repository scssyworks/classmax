import type { ClassType } from './index.types';
import { handleSuffix } from './utils';

export const cm = function classMax(...args: ClassType[]): string {
  return args.reduce<string>((classString, curr) => {
    if (!curr || (typeof curr !== 'object' && typeof curr !== 'string')) {
      return classString.trim();
    }
    if (typeof curr === 'string') {
      return `${classString} ${curr}`.trim();
    }
    if (Array.isArray(curr)) {
      return `${classString} ${cm(...curr)}`.trim();
    }
    return `${classString} ${cm(
      ...Object.entries(curr).reduce<string[]>((acc, next) => {
        const [key, value] = next;
        if (typeof value === 'boolean' && value) {
          acc.push(key);
        }
        if (typeof value === 'string' && value.trim()) {
          acc.push(handleSuffix(key, value));
        }
        return acc;
      }, []),
    )}`.trim();
  }, '');
};

export function post(postfix: string, delim?: string): string {
  const d = delim ?? ':';
  return `post:${d}${postfix}`;
}

export function pre(prefix: string, delim?: string): string {
  const d = delim ?? ':';
  return `pre:${prefix}${d}`;
}

export function assign(classString: string, suffix: string): string {
  return classString.split(' ').reduce((acc, next) => {
    const cls = handleSuffix(next, suffix);
    return `${acc} ${cls}`.trim();
  }, '');
}
