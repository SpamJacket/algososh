import React, { ChangeEvent, FormEvent, MouseEvent } from "react";
import styles from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Direction } from "../../types/direction";
import { Column } from "../ui/column/column";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const SortingPage: React.FC = () => {
  const [sortingArray, setSortingArray] = React.useState<number[]>([]);
  const [sortingType, setSortingType] = React.useState("Selection");
  const [sortingDirection, setSortingDirection] = React.useState("");
  const [sortingIndexes, setSortingIndexes] = React.useState<[number, number]>([
    -1, 17,
  ]);
  const [doneIndexes, setDoneIndexes] = React.useState<number[]>([]);
  const [isSorting, setIsSorting] = React.useState(false);

  const handleSortingDirection = (
    e: MouseEvent<HTMLButtonElement | HTMLParagraphElement | HTMLOrSVGElement>
  ) => {
    const target = e.target as HTMLElement;
    const button = target.closest(".text_type_button") as HTMLButtonElement;
    setSortingDirection(button.name);
  };

  const handleSortingType = (e: ChangeEvent<HTMLInputElement>) => {
    setSortingType(e.target.value);
  };

  const handleRandomArray = () => {
    const arr: number[] = [];
    for (let i = 0; i < Math.floor(Math.random() * 15 + 3); i++) {
      arr.push(Math.floor(Math.random() * 101));
    }
    setDoneIndexes([]);
    setSortingIndexes([-1, 17]);
    setSortingArray(arr);
  };

  React.useEffect(handleRandomArray, []);

  const selectionSort = () => {
    const arrayStates: number[][] = [[...sortingArray]];

    for (let i = 0; i < sortingArray.length - 1; i++) {
      const array = [...arrayStates[i]];
      let minMaxIndex = i;

      for (let j = i + 1; j < sortingArray.length; j++) {
        if (sortingDirection === "ascending" && array[minMaxIndex] > array[j]) {
          minMaxIndex = j;
        }
        if (
          sortingDirection === "descending" &&
          array[minMaxIndex] < array[j]
        ) {
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSorting(true);
    setDoneIndexes([]);
    setSortingIndexes([-1, 17]);

    if (sortingType === "Selection") {
      const arrayStates = selectionSort();

      let i = 0;
      let length = sortingArray.length;
      const done: number[] = [];

      setTimeout(function run() {
        setSortingArray(arrayStates[i]);
        setSortingIndexes([i, i + 1]);

        let k = i;
        let j = i + 1;
        setTimeout(function innerRun() {
          setSortingIndexes([k, j]);

          if (j < length - 1) {
            j++;
            setTimeout(innerRun, SHORT_DELAY_IN_MS);
          } else {
            done.push(k);
            setDoneIndexes(done);
            if (k === length - 2) {
              setTimeout(() => {
                setSortingArray(arrayStates[arrayStates.length - 1]);
                setSortingIndexes([-1, 17]);
                setIsSorting(false);
              }, 0);
            }
          }
        }, 0);

        if (i < length - 2) {
          i++;
          setTimeout(run, SHORT_DELAY_IN_MS * (length - i));
        } else {
          done.push(i + 1);
          setDoneIndexes(done);
        }
      }, 0);
    }
  };

  const visualization = React.useMemo((): JSX.Element[] => {
    return sortingArray.map((el, index) => (
      <Column
        key={index}
        index={el}
        state={
          sortingIndexes.includes(index)
            ? ElementStates.Changing
            : doneIndexes.includes(index)
            ? ElementStates.Modified
            : ElementStates.Default
        }
      />
    ));
  }, [sortingArray, sortingIndexes, doneIndexes]);

  return (
    <SolutionLayout title="Сортировка массива">
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.radio}>
          <RadioInput
            label="Выбор"
            name="sort"
            value="Selection"
            onChange={handleSortingType}
            defaultChecked={true}
            disabled={isSorting}
          />
          <RadioInput
            label="Пузырек"
            name="sort"
            value="Bubble"
            onChange={handleSortingType}
            disabled={isSorting}
          />
        </div>
        <div className={styles.sort}>
          <Button
            text="По возрастанию"
            type="submit"
            name="ascending"
            sorting={Direction.Ascending}
            isLoader={isSorting && sortingDirection === "ascending"}
            aria-label="По возрастанию"
            onClick={handleSortingDirection}
            disabled={isSorting && sortingDirection !== "ascending"}
            extraClass={styles.ascending}
          />
          <Button
            text="По убыванию"
            type="submit"
            name="descending"
            sorting={Direction.Descending}
            isLoader={isSorting && sortingDirection === "descending"}
            aria-label="По убыванию"
            onClick={handleSortingDirection}
            disabled={isSorting && sortingDirection !== "descending"}
            extraClass={styles.descending}
          />
        </div>
        <Button
          text="Новый массив"
          aria-label="Новый массив"
          onClick={handleRandomArray}
          disabled={isSorting}
        />
      </form>
      <div className={styles.container}>{visualization}</div>
    </SolutionLayout>
  );
};
