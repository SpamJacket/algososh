import React, { ChangeEvent, FormEvent } from "react";
import styles from "./fibonacci-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const FibonacciPage: React.FC = () => {
  const [visualizationArray, setVisualizationArray] = React.useState<number[]>(
    []
  );
  const [inputValue, setInputValue] = React.useState<number | null>(null);
  const [isRun, setIsRun] = React.useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = !Number.isNaN(e.target.valueAsNumber)
      ? e.target.valueAsNumber
      : null;
    setInputValue(value);
  };

  const generateFibonacci = (n: number): number => {
    if (n === 1 || n === 0) {
      return 1;
    }

    return generateFibonacci(n - 1) + generateFibonacci(n - 2);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsRun(true);
    setVisualizationArray([]);
    const array: number[] = [];

    for (let i = 0; i < inputValue! + 1; i++) {
      array.push(generateFibonacci(i));
    }

    let i = 0;
    setTimeout(function run() {
      setVisualizationArray(array.slice(0, i + 1));

      if (i < inputValue!) {
        i++;
        setTimeout(run, SHORT_DELAY_IN_MS);
      } else {
        setIsRun(false);
      }
    }, SHORT_DELAY_IN_MS);
  };

  const visualization = React.useMemo((): JSX.Element[] => {
    return visualizationArray.map((number, index) => (
      <Circle key={index} letter={number.toString()} index={index} />
    ));
  }, [visualizationArray]);

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type="number"
          min={0}
          max={19}
          step={1}
          isLimitText={true}
          required={true}
          extraClass={styles.input}
          value={inputValue ?? ""}
          onChange={handleChange}
          disabled={isRun}
        />
        <Button
          text="Рассчитать"
          type="submit"
          isLoader={isRun}
          disabled={inputValue! < 0 || inputValue! > 19 || inputValue === null}
          extraClass={styles.button}
        />
      </form>
      <div className={styles.container}>{visualization}</div>
    </SolutionLayout>
  );
};
