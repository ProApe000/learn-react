import { getUserInfo } from '@/utils/math';

import { test, expect } from '@jest/globals';

test('test info', () => {
  expect(getUserInfo()).toEqual(getUserInfo());
});

test('test info 2', () => {
  expect(getUserInfo()).not.toBe(getUserInfo());
});
