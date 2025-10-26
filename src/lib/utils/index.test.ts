import { describe, expect, it } from 'vitest';
import { handleSuffix } from '.';
import { POST, PRE } from '../const';

describe('handleSuffix', () => {
  it('should format className based on suffix string', () => {
    expect(handleSuffix('cls', `${PRE}pre:`)).toBe('pre:cls');
    expect(handleSuffix('cls', `${POST}:post`)).toBe('cls:post');
    expect(handleSuffix('cls', 'test')).toBe('test:cls');
  });
});
