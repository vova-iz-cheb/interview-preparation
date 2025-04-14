export const AlgBubbleSort = () => {
  const codeString = `
const bubbleSort = (arr: number[]) => {
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

    if (!shouldSort) return { iteration }; // если не было перестановок, массив отсортирован
  }

  return { iteration };
};
  `;

  return (
    <>
      <div>Алгоритмы. Сортировка пузырьком</div>
      <pre>
        <code dangerouslySetInnerHTML={{ __html: codeString }} />
      </pre>
    </>
  );
};
