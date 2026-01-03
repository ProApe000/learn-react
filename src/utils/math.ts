export const sum = (a: number, b: number): number => {
  return a + b;
};

/**
 * @description 访问嵌套对象
 */
export const get = <T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  object: any,
  path: Array<string>,
  defaultValue?: T
): T => {
  const result = path.reduce(
    (obj, key) => (obj !== undefined ? obj[key] : undefined),
    object
  );

  return result !== undefined ? result : defaultValue;
};

export const getUserInfo = () => {
  return {
    name: 'moji',
    age: 24,
  };
};

/**
 * 获取用户信息
 */
export const fetchUser = () => {
  return new Promise((resole) => {
    setTimeout(() => {
      resole({
        name: 'moji',
        age: 24,
      });
    }, 2000);
  });
};
