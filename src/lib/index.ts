import type { ClassType } from './index.types';

export const cm = (...args: ClassType[]): string => {
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
    return `${classString} ${cm(...Object.keys(curr).filter((key) => curr[key]))}`.trim();
  }, '');
};
