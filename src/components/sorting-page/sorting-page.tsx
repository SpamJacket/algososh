import React, { ChangeEvent, FormEvent, MouseEvent } from "react";
import styles from "./sorting-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import Direction from "../../types/direction";
import { Column } from "../ui/column/column";
import ElementStates from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import Sorting from "../../types/sorting";
import { selectionSort, bubbleSort } from "../../utils/sorting";

export const SortingPage: React.FC = () => {
  const _isComponentMounted = React.useRef(true);
  const [sortingArray, setSortingArray] = React.useState<number[]>([]);
  const [sortingType, setSortingType] = React.useState<Sorting>(
    Sorting.Selection
  );
  const [sortingDirection, setSortingDirection] = React.useState<Direction>(
    Direction.Ascending
  );
  const [sortingIndexes, setSortingIndexes] = React.useState<[number, number]>([
    -1, 17,
  ]);
  const [doneIndexes, setDoneIndexes] = React.useState<number[]>([]);
  const [isSorting, setIsSorting] = React.useState(false);

  React.useEffect(() => {
    return () => {
      _isComponentMounted.current = false;
    };
  }, []);

  const handleSortingDirection = (
    e: MouseEvent<HTMLButtonElement | HTMLParagraphElement | HTMLOrSVGElement>
  ) => {
    const target = e.target as HTMLElement;
    const button = target.closest(".text_type_button") as HTMLButtonElement;
    setSortingDirection(button.name as Direction);
  };

  const handleSortingType = (e: ChangeEvent<HTMLInputElement>) => {
    setSortingType(e.target.value as Sorting);
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSorting(true);
    setDoneIndexes([]);
    setSortingIndexes([-1, 17]);

    if (sortingType === Sorting.Selection) {
      const arrayStates = selectionSort(sortingArray, sortingDirection);
      let i = 0;
      const length = sortingArray.length;
      const done: number[] = [];

      setTimeout(function run() {
        if (_isComponentMounted.current) {
          setSortingArray(arrayStates[i]);
        }

        let k = i;
        let j = i + 1;

        setTimeout(function innerRun() {
          if (_isComponentMounted.current) {
            setSortingIndexes([k, j]);
          }

          if (j < length - 1) {
            j++;
            setTimeout(innerRun, SHORT_DELAY_IN_MS);
          } else {
            done.push(k);
            if (_isComponentMounted.current) {
              setDoneIndexes(done);
            }
            if (k === length - 2) {
              setTimeout(() => {
                if (_isComponentMounted.current) {
                  setSortingArray(arrayStates[arrayStates.length - 1]);
                  setSortingIndexes([-1, 17]);
                  setIsSorting(false);
                }
              }, 0);
            }
          }
        }, 0);

        if (i < length - 2) {
          i++;
          setTimeout(run, SHORT_DELAY_IN_MS * (length - i));
        } else {
          done.push(i + 1);
          if (_isComponentMounted.current) {
            setDoneIndexes(done);
          }
        }
      }, 0);
    } else {
      const arrayStates = bubbleSort(sortingArray, sortingDirection);
      let i = 0;
      let l = sortingArray.length;
      const length = sortingArray.length;
      const done: number[] = [];
      let c = 0;

      setTimeout(function run() {
        const k = i;
        let j = 0;

        setTimeout(function innerRun() {
          if (!arrayStates[c]) {
            if (_isComponentMounted.current) {
              setDoneIndexes([
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16,
              ]);
              setSortingIndexes([-1, 17]);
              setIsSorting(false);
            }
            return;
          }
          if (_isComponentMounted.current) {
            setSortingArray(arrayStates[c]);
            setSortingIndexes([j, j + 1]);
          }

          if (j < length - 2 - k) {
            c++;
            j++;
            setTimeout(innerRun, SHORT_DELAY_IN_MS);
          } else {
            done.push(length - 1 - k);
            if (_isComponentMounted.current) {
              setDoneIndexes(done);
            }
            if (k === length - 1) {
              if (_isComponentMounted.current) {
                setSortingIndexes([-1, 17]);
                setIsSorting(false);
              }
            }
          }
        }, 0);

        if (i < length - 1) {
          c++;
          i++;
          l--;
          setTimeout(run, SHORT_DELAY_IN_MS * l);
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
            value={Sorting.Selection}
            onChange={handleSortingType}
            defaultChecked={true}
            disabled={isSorting}
          />
          <RadioInput
            label="Пузырек"
            name="sort"
            value={Sorting.Bubble}
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
            isLoader={isSorting && sortingDirection === Direction.Ascending}
            aria-label="По возрастанию"
            onClick={handleSortingDirection}
            disabled={isSorting && sortingDirection !== Direction.Ascending}
            extraClass={styles.ascending}
          />
          <Button
            text="По убыванию"
            type="submit"
            name="descending"
            sorting={Direction.Descending}
            isLoader={isSorting && sortingDirection === Direction.Descending}
            aria-label="По убыванию"
            onClick={handleSortingDirection}
            disabled={isSorting && sortingDirection !== Direction.Descending}
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
