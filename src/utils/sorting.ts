import Direction from "../types/direction";

export const selectionSort = (
  sourceArray: number[],
  direction: Direction
): number[][] => {
  const arrayStates: number[][] = [sourceArray];
  const length = sourceArray.length;

  for (let i = 0; i < length - 1; i++) {
    const array = [...arrayStates[i]];
    let minMaxIndex = i;

    for (let j = i + 1; j < length; j++) {
      if (direction === Direction.Ascending && array[minMaxIndex] > array[j]) {
        minMaxIndex = j;
      }
      if (direction === Direction.Descending && array[minMaxIndex] < array[j]) {
        minMaxIndex = j;
      }
    }

    const tmp = array[i];
    array[i] = array[minMaxIndex];
    array[minMaxIndex] = tmp;
    arrayStates.push(array);
  }

  return arrayStates;
};

export const bubbleSort = (
  sourceArray: number[],
  direction: Direction
): number[][] => {
  const arrayStates: number[][] = [sourceArray];
  const length = sourceArray.length;

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - 1 - i; j++) {
      const array = [...arrayStates[arrayStates.length - 1]];

      if (direction === Direction.Ascending && array[j] > array[j + 1]) {
        const tmp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = tmp;
      }
      if (direction === Direction.Descending && array[j] < array[j + 1]) {
        const tmp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = tmp;
      }

      arrayStates.push(array);
    }
  }

  let i = arrayStates.length - 1;
  while (i > 0) {
    if (arrayStates[i].toString() === arrayStates[i - 1].toString()) {
      i--;
    } else {
      break;
    }
  }
  if (i !== -1) {
    return arrayStates.slice(0, i + 2);
  }

  return arrayStates;
};
