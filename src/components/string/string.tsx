import React, { FormEvent, ChangeEvent } from "react";
import styles from "./string.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import ElementStates from "../../types/element-states";
import { DELAY_IN_MS } from "../../constants/delays";
import reverseString from "../../utils/string";

export const StringComponent: React.FC = () => {
  const _isComponentMounted = React.useRef(true);
  const [inputValue, setInputValue] = React.useState("");
  const [reverseArray, setReverseArray] = React.useState<string[]>([]);
  const [sortingIndexes, setSortingIndexes] = React.useState<[number, number]>([
    -1, 12,
  ]);
  const [isReversing, setIsReversing] = React.useState(false);

  React.useEffect(() => {
    return () => {
      _isComponentMounted.current = false;
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const setVisualization = (i: number, arr: string[]) => {
    setSortingIndexes([i, inputValue.length - 1 - i]);
    setReverseArray(arr);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsReversing(true);
    if (inputValue.length === 1) {
      setVisualization(12, inputValue.split(""));
      setIsReversing(false);
      return;
    }

    const arrayStates = reverseString(inputValue.split(""));
    setVisualization(0, arrayStates[0]);

    let i = 1;
    setTimeout(function run() {
      if (i === Math.floor(inputValue.length / 2)) {
        if (_isComponentMounted.current) {
          setVisualization(12, arrayStates[i]);
        }
      } else {
        if (_isComponentMounted.current) {
          setVisualization(i, arrayStates[i]);
        }
      }

      if (i < Math.floor(inputValue.length / 2)) {
        i++;
        setTimeout(run, DELAY_IN_MS);
      } else {
        if (_isComponentMounted.current) {
          setIsReversing(false);
        }
      }
    }, DELAY_IN_MS);
  };

  const visualization = React.useMemo((): JSX.Element[] => {
    return reverseArray.map((symbol, index) => (
      <Circle
        key={index}
        letter={symbol}
        state={
          sortingIndexes.includes(index)
            ? ElementStates.Changing
            : index > sortingIndexes[1] || index < sortingIndexes[0]
            ? ElementStates.Modified
            : ElementStates.Default
        }
      />
    ));
  }, [reverseArray, sortingIndexes]);

  return (
    <SolutionLayout title="Строка">
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          maxLength={11}
          isLimitText={true}
          required={true}
          extraClass={styles.input}
          value={inputValue}
          onChange={handleChange}
          disabled={isReversing}
        />
        <Button
          text="Развернуть"
          type="submit"
          isLoader={isReversing}
          disabled={inputValue.length === 0}
        />
      </form>
      <div className={styles.container}>{visualization}</div>
    </SolutionLayout>
  );
};
