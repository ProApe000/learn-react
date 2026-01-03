import { sum, fetchUser } from '@/utils/math';
import { expect, test } from '@jest/globals';

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('fetchUser() 可以请求到一个用户名字为 moji', async () => {
  const data: any = await fetchUser();

  expect(data.name).toBe('moji');
});
