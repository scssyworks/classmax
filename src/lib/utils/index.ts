import { DELIM, POST, PRE } from '../const';
import type { Primitives } from '../index.types';

export const handleSuffix = (key: string, value: Primitives) => {
  if (typeof value === 'string') {
    if (value.startsWith(POST)) {
      return key + value.substring(POST.length);
    }
    if (value.startsWith(PRE)) {
      return value.substring(PRE.length) + key;
    }
    return value + DELIM + key;
  }
  return value === true && key;
};
