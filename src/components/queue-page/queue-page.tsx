import React, { ChangeEvent, FormEvent } from "react";
import styles from "./queue-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import ElementStates from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import Queue from "../../utils/queue";

const queue = new Queue<string>();

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState("");
  const [visualizationQueue, setVisualizationQueue] = React.useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [isAdding, setIsAdding] = React.useState(false);
  const [isAddingDone, setIsAddingDone] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const reRender = () => {
    setVisualizationQueue(queue.render());
  };

  const handleAdd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsAdding(true);

    setTimeout(() => {
      queue.enqueue(inputValue);
      reRender();
      setIsAddingDone(true);
      setIsAdding(false);
      setInputValue("");
      setTimeout(() => setIsAddingDone(false), SHORT_DELAY_IN_MS);
    }, SHORT_DELAY_IN_MS);
  };

  const handleDelete = () => {
    setIsDeleting(true);

    setTimeout(() => {
      queue.dequeue("");
      reRender();
      setIsDeleting(false);
    }, SHORT_DELAY_IN_MS);
  };

  const handleClear = () => {
    queue.clear();
    reRender();
  };

  const visualization = React.useMemo((): JSX.Element[] => {
    return visualizationQueue.map((el, index) => (
      <Circle
        letter={el}
        key={index}
        index={index}
        head={index === queue.getHead() ? "head" : undefined}
        tail={index === queue.getTail() ? "tail" : undefined}
        state={
          isAdding
            ? queue.getTail() === null
              ? queue.getHead() === null
                ? index === 0
                  ? ElementStates.Changing
                  : ElementStates.Default
                : index === queue.getHead()
                ? ElementStates.Changing
                : ElementStates.Default
              : index === queue.getTail()! + 1
              ? ElementStates.Changing
              : ElementStates.Default
            : isAddingDone
            ? index === queue.getTail()
              ? ElementStates.Modified
              : ElementStates.Default
            : isDeleting
            ? index === queue.getHead()
              ? ElementStates.Changing
              : ElementStates.Default
            : ElementStates.Default
        }
      />
    ));
  }, [visualizationQueue, isAdding, isAddingDone, isDeleting]);

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
            queue.getHead() === 6 ||
            queue.getTail() === 6 ||
            inputValue.length === 0
          }
        />
        <Button
          text="Удалить"
          type="button"
          extraClass={styles.deleteButton}
          onClick={handleDelete}
          disabled={queue.getTail() === null}
        />
        <Button
          text="Очистить"
          type="reset"
          extraClass={styles.clearButton}
          disabled={queue.getHead() === null}
        />
      </form>
      <div className={styles.container}>{visualization}</div>
    </SolutionLayout>
  );
};
