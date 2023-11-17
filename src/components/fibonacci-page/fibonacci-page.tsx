import React, { ChangeEvent, FormEvent } from "react";
import styles from "./fibonacci-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import getFibonacciArray from "../../utils/fibonacci";

export const FibonacciPage: React.FC = () => {
  const _isComponentMounted = React.useRef(true);
  const [visualizationArray, setVisualizationArray] = React.useState<number[]>(
    []
  );
  const [inputValue, setInputValue] = React.useState<number | null>(null);
  const [isRun, setIsRun] = React.useState(false);

  React.useEffect(() => {
    return () => {
      _isComponentMounted.current = false;
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = !Number.isNaN(e.target.valueAsNumber)
      ? e.target.valueAsNumber
      : null;
    setInputValue(value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsRun(true);
    setVisualizationArray([]);
    const fibonacciArray: number[] = getFibonacciArray(inputValue!);

    let i = 0;
    setTimeout(function run() {
      if (_isComponentMounted.current) {
        setVisualizationArray(fibonacciArray.slice(0, i + 1));
      }

      if (i < inputValue!) {
        i++;
        setTimeout(run, SHORT_DELAY_IN_MS);
      } else {
        if (_isComponentMounted.current) {
          setIsRun(false);
        }
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
