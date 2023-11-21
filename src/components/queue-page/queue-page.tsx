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
  const _isComponentMounted = React.useRef(true);
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

  React.useEffect(() => {
    return () => {
      _isComponentMounted.current = false;
    };
  }, []);

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
      if (_isComponentMounted.current) {
        reRender();
        setIsAddingDone(true);
        setIsAdding(false);
        setInputValue("");
      }
      setTimeout(() => {
        if (_isComponentMounted.current) {
          setIsAddingDone(false);
        }
      }, SHORT_DELAY_IN_MS);
    }, SHORT_DELAY_IN_MS);
  };

  const handleDelete = () => {
    setIsDeleting(true);

    setTimeout(() => {
      queue.dequeue("");
      if (_isComponentMounted.current) {
        reRender();
        setIsDeleting(false);
      }
    }, SHORT_DELAY_IN_MS);
  };

  const handleClear = () => {
    queue.clear();
    reRender();
  };

  const getElementState = React.useCallback(
    (index: number): ElementStates => {
      if (isAdding) {
        if (queue.getTail() === null) {
          if (queue.getHead() === null) {
            if (index === 0) {
              return ElementStates.Changing;
            }
          } else {
            if (index === queue.getHead()) {
              return ElementStates.Changing;
            }
          }
        } else {
          if (index === queue.getTail()! + 1) {
            return ElementStates.Changing;
          }
        }
      }

      if (isAddingDone && index === queue.getTail()) {
        return ElementStates.Modified;
      }

      if (isDeleting && index === queue.getHead()) {
        return ElementStates.Changing;
      }

      return ElementStates.Default;
    },
    [isAdding, isAddingDone, isDeleting]
  );

  const visualization = React.useMemo(() => {
    return visualizationQueue.map((el, index) => (
      <Circle
        letter={el}
        key={index}
        index={index}
        head={index === queue.getHead() ? "head" : undefined}
        tail={index === queue.getTail() ? "tail" : undefined}
        state={getElementState(index)}
      />
    ));
  }, [visualizationQueue, getElementState]);

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
