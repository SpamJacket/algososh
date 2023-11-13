import React, { ChangeEvent, FormEvent } from "react";
import styles from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const StackPage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [stack, setStack] = React.useState<string[]>([]);
  const [isAdding, setIsAdding] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAdding(true);
    const stackClone = [...stack];
    stackClone.push(inputValue);
    setStack(stackClone);
    setInputValue("");
    setTimeout(() => setIsAdding(false), SHORT_DELAY_IN_MS);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    const stackClone = [...stack];
    setTimeout(() => {
      setStack(stackClone.slice(0, stack.length - 1));
      setIsDeleting(false);
    }, SHORT_DELAY_IN_MS);
  };

  const handleClear = () => {
    setStack([]);
  };

  const visualization = React.useMemo((): JSX.Element[] => {
    return stack.map((el, index) => (
      <Circle
        letter={el}
        key={index}
        index={index}
        head={index === stack.length - 1 ? "top" : null}
        state={
          index === stack.length - 1 && (isAdding || isDeleting)
            ? ElementStates.Changing
            : ElementStates.Default
        }
      />
    ));
  }, [stack, isAdding, isDeleting]);

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form} onReset={handleClear} onSubmit={handleAdd}>
        <Input
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
          disabled={inputValue.length === 0 || stack.length === 20}
        />
        <Button
          text="Удалить"
          type="button"
          extraClass={styles.deleteButton}
          onClick={handleDelete}
          disabled={stack.length === 0}
        />
        <Button
          text="Очистить"
          type="reset"
          extraClass={styles.clearButton}
          disabled={stack.length === 0}
        />
      </form>
      <div className={styles.container}>{visualization}</div>
    </SolutionLayout>
  );
};
