const bubleSort = (arr: number[]) => {
  if (!arr || !Array.isArray(arr)) return;

  let iteration = 0;
  for (let i = 1; i < arr.length; i++) {
    let shouldSort = false;

    for (let j = 0; j < arr.length - i; j++) {
      iteration++;

      const a = arr[j];
      const b = arr[j + 1];

      if (a > b) {
        arr[j] = b;
        arr[j + 1] = a;
        shouldSort = true;
      }
    }

    if (!shouldSort) return { iteration }; // если не было перестановок массив отсортирован
  }

  return { iteration };
};

test('should return undefined', () => {
  expect(bubleSort(undefined)).toBe(undefined);
});

test('should return undefined if arr isnt array', () => {
  expect(bubleSort(0 as any)).toBe(undefined);
});

test('should sort simple arr', () => {
  const arr = [100, 5, 9, -2, 0];
  expect(bubleSort(arr).iteration).toBe(10);
  expect(arr).toEqual([-2, 0, 5, 9, 100]);
});

test('should sort sorted arr', () => {
  const arr = [1, 2, 3, 4, 5];
  expect(bubleSort(arr).iteration).toBe(4);
  expect(arr).toEqual([1, 2, 3, 4, 5]);
});
