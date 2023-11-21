import React, { ChangeEvent, FormEvent } from "react";
import styles from "./stack-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import ElementStates from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import Stack from "../../utils/stack";

const stack = new Stack<string>();

export const StackPage: React.FC = () => {
  const _isComponentMounted = React.useRef(true);
  const [inputValue, setInputValue] = React.useState("");
  const [visualizationStack, setVisualizationStack] = React.useState<string[]>(
    []
  );
  const [isAdding, setIsAdding] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    return () => {
      _isComponentMounted.current = false;
    };
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const reRender = () => {
    setVisualizationStack(stack.render());
  };

  const handleAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAdding(true);
    stack.push(inputValue);
    reRender();
    setInputValue("");
    setTimeout(() => {
      if (_isComponentMounted.current) {
        setIsAdding(false);
      }
    }, SHORT_DELAY_IN_MS);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      stack.pop();
      if (_isComponentMounted.current) {
        reRender();
        setIsDeleting(false);
      }
    }, SHORT_DELAY_IN_MS);
  };

  const handleClear = () => {
    stack.clear();
    reRender();
  };

  const visualization = React.useMemo(() => {
    return visualizationStack.map((el, index) => (
      <Circle
        letter={el}
        key={index}
        index={index}
        head={index === stack.getSize() - 1 ? "top" : null}
        state={
          index === stack.getSize() - 1 && (isAdding || isDeleting)
            ? ElementStates.Changing
            : ElementStates.Default
        }
      />
    ));
  }, [visualizationStack, isAdding, isDeleting]);

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
          disabled={inputValue.length === 0 || stack.getSize() === 20}
        />
        <Button
          text="Удалить"
          type="button"
          extraClass={styles.deleteButton}
          onClick={handleDelete}
          disabled={stack.getSize() === 0}
        />
        <Button
          text="Очистить"
          type="reset"
          extraClass={styles.clearButton}
          disabled={stack.getSize() === 0}
        />
      </form>
      <div className={styles.container}>{visualization}</div>
    </SolutionLayout>
  );
};
