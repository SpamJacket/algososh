import React, { ChangeEvent, FormEvent } from "react";
import styles from "./queue-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [visualizationArray, setVisualizationArray] = React.useState<
    [string, string, string, string, string, string, string]
  >(["", "", "", "", "", "", ""]);
  const [headIndex, setHeadIndex] = React.useState<number | null>(null);
  const [tailIndex, setTailIndex] = React.useState<number | null>(null);
  const [isAdding, setIsAdding] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const setStates = (
    array: [string, string, string, string, string, string, string] = [
      ...visualizationArray,
    ],
    head: number | null = headIndex,
    tail: number | null = tailIndex
  ) => {
    setVisualizationArray(array);
    setHeadIndex(head);
    setTailIndex(tail);
  };

  const handleAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAdding(true);
    const array: [string, string, string, string, string, string, string] = [
      ...visualizationArray,
    ];

    setTimeout(() => {
      if (headIndex === null) {
        array[0] = inputValue;
        setStates(array, 0, 0);
      } else {
        if (array[headIndex] === "") {
          array[headIndex] = inputValue;
          setStates(array, undefined, headIndex);
        } else {
          array[tailIndex! + 1] = inputValue;
          setStates(array, undefined, tailIndex! + 1);
        }
      }

      setInputValue("");
      setIsAdding(false);
    }, SHORT_DELAY_IN_MS);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    const array: [string, string, string, string, string, string, string] = [
      ...visualizationArray,
    ];

    setTimeout(() => {
      array[headIndex!] = "";
      setVisualizationArray(array);

      if (headIndex === 6 || headIndex === tailIndex) {
        setTailIndex(null);
      } else {
        setHeadIndex(headIndex! + 1);
      }

      setIsDeleting(false);
    }, SHORT_DELAY_IN_MS);
  };

  const handleClear = () => {
    setStates(["", "", "", "", "", "", ""], null, null);
  };

  const visualization = React.useMemo((): JSX.Element[] => {
    return visualizationArray.map((el, index) => (
      <Circle
        letter={el}
        key={index}
        index={index}
        head={index === headIndex ? "head" : undefined}
        tail={index === tailIndex ? "tail" : undefined}
        state={
          isAdding
            ? tailIndex === null
              ? headIndex === null
                ? index === 0
                  ? ElementStates.Changing
                  : ElementStates.Default
                : index === headIndex
                ? ElementStates.Changing
                : ElementStates.Default
              : index === tailIndex + 1
              ? ElementStates.Changing
              : ElementStates.Default
            : isDeleting
            ? index === headIndex
              ? ElementStates.Changing
              : ElementStates.Default
            : ElementStates.Default
        }
      />
    ));
  }, [visualizationArray, headIndex, tailIndex, isAdding, isDeleting]);

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.form} onReset={handleClear} onSubmit={handleAdd}>
        <Input
          placeholder="Введите значение"
          maxLength={4}
          isLimitText={true}
          required={true}
          extraClass={styles.input}
          value={inputValue}
          onChange={handleChange}
        />
        <Button
          text="Добавить"
          type="submit"
          extraClass={styles.addButton}
          disabled={
            headIndex === 6 || tailIndex === 6 || inputValue.length === 0
          }
        />
        <Button
          text="Удалить"
          type="button"
          extraClass={styles.deleteButton}
          onClick={handleDelete}
          disabled={tailIndex === null}
        />
        <Button
          text="Очистить"
          type="reset"
          extraClass={styles.clearButton}
          disabled={headIndex === null}
        />
      </form>
      <div className={styles.container}>{visualization}</div>
    </SolutionLayout>
  );
};
