import { bubbleSort, selectionSort } from "../sorting";

describe("Алгоритм сортировки выбором", () => {
  it("Алгоритм работает верно с пустым массивом", () => {
    const sourceArray = [];
    const sortingRes = selectionSort(sourceArray, "descending");
    expect(sortingRes).toEqual([[]]);
  });

  it("Алгоритм работает верно с массивом из одного элемента", () => {
    const sourceArray = [1];
    const sortingRes = selectionSort(sourceArray, "descending");
    expect(sortingRes).toEqual([[1]]);
  });

  it("Алгоритм работает верно с массивом из нескольких элементов", () => {
    const sourceArray = [1, 2, 3, 4];
    const sortingRes = selectionSort(sourceArray, "descending");
    expect(sortingRes).toEqual([
      [1, 2, 3, 4],
      [4, 2, 3, 1],
      [4, 3, 2, 1],
      [4, 3, 2, 1],
    ]);
  });
});

describe("Алгоритм сортировки пузырьком", () => {
  it("Алгоритм работает верно с пустым массивом", () => {
    const sourceArray = [];
    const sortingRes = bubbleSort(sourceArray, "descending");
    expect(sortingRes).toEqual([[]]);
  });

  it("Алгоритм работает верно с массивом из одного элемента", () => {
    const sourceArray = [1];
    const sortingRes = bubbleSort(sourceArray, "descending");
    expect(sortingRes).toEqual([[1]]);
  });

  it("Алгоритм работает верно с массивом из нескольких элементов", () => {
    const sourceArray = [1, 2, 3, 4];
    const sortingRes = bubbleSort(sourceArray, "descending");
    expect(sortingRes).toEqual([
      [1, 2, 3, 4],
      [2, 1, 3, 4],
      [2, 3, 1, 4],
      [2, 3, 4, 1],
      [3, 2, 4, 1],
      [3, 4, 2, 1],
      [4, 3, 2, 1],
    ]);
  });
});
