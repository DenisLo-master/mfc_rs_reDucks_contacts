export const genArray = <T>(fn: () => T, count: number = 10): T[] => {
  const resultArray: T[] = [];
  for (let i = 0; i < count; i++) {
    resultArray.push(fn());
  }
  return resultArray;
}
