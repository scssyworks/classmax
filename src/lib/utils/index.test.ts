import { describe, expect, it } from 'vitest';
import { handleSuffix } from '.';

describe('handleSuffix', () => {
  it('should format className based on suffix string', () => {
    expect(handleSuffix('cls', 'pre:pre:')).toBe('pre:cls');
    expect(handleSuffix('cls', 'post::post')).toBe('cls:post');
    expect(handleSuffix('cls', 'test')).toBe('test:cls');
  });
});
