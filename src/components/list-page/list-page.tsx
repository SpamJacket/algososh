import React, { ChangeEvent, Fragment } from "react";
import styles from "./list-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { LinkedList } from "../../utils/linked-list";

const linkedList = new LinkedList<string>();

export const ListPage: React.FC = () => {
  const [textInputValue, setTextInputValue] = React.useState("");
  const [indexInputValue, setIndexInputValue] = React.useState<number | null>(
    null
  );
  const [visualizationList, setVisualizationList] = React.useState<string[]>(
    []
  );
  const [isHeadAdding, setIsHeadAdding] = React.useState(false);
  const [isHeadAddingDone, setIsHeadAddingDone] = React.useState(false);
  const [isTailAdding, setIsTailAdding] = React.useState(false);
  const [isTailAddingDone, setIsTailAddingDone] = React.useState(false);
  const [isHeadDeleting, setIsHeadDeleting] = React.useState(false);
  const [isTailDeleting, setIsTailDeleting] = React.useState(false);
  const [isAdding, setIsAdding] = React.useState(false);
  const [isAddingDone, setIsAddingDone] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const [checkedIndexes, setCheckedIndexes] = React.useState<number[]>([]);

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTextInputValue(e.target.value);
  };

  const handleIndexChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = !Number.isNaN(e.target.valueAsNumber)
      ? e.target.valueAsNumber
      : null;
    setIndexInputValue(value);
  };

  const render = () => {
    setVisualizationList(linkedList.render());
  };

  const addHead = () => {
    setIsHeadAdding(true);
    linkedList.unshift(textInputValue);

    setTimeout(() => {
      render();
      setIsHeadAddingDone(true);
      setIsHeadAdding(false);
      setTextInputValue("");
      setTimeout(() => setIsHeadAddingDone(false), SHORT_DELAY_IN_MS);
    }, SHORT_DELAY_IN_MS);
  };

  const addTail = () => {
    setIsTailAdding(true);
    linkedList.push(textInputValue);

    setTimeout(() => {
      render();
      setIsTailAddingDone(true);
      setIsTailAdding(false);
      setTextInputValue("");
      setTimeout(() => setIsTailAddingDone(false), SHORT_DELAY_IN_MS);
    }, SHORT_DELAY_IN_MS);
  };

  const deleteHead = () => {
    setIsHeadDeleting(true);
    linkedList.shift();

    setTimeout(() => {
      render();
      setIsHeadDeleting(false);
    }, SHORT_DELAY_IN_MS);
  };

  const deleteTail = () => {
    setIsTailDeleting(true);
    linkedList.pop();

    setTimeout(() => {
      render();
      setIsTailDeleting(false);
    }, SHORT_DELAY_IN_MS);
  };

  const addByIndex = () => {
    setIsAdding(true);
    linkedList.appendByIndex(textInputValue, indexInputValue!);
    let i = 0;
    let checkedI: number[] = [];

    setTimeout(function run() {
      if (i !== indexInputValue) {
        checkedI = [...checkedI, i];
        setCheckedIndexes(checkedI);
        i++;
        setTimeout(run, SHORT_DELAY_IN_MS);
      } else {
        render();
        setCheckedIndexes([]);
        setIsAddingDone(true);
        setIsAdding(false);
        setTextInputValue("");
        setIndexInputValue(null);
        setTimeout(() => setIsAddingDone(false), SHORT_DELAY_IN_MS);
      }
    }, SHORT_DELAY_IN_MS);
  };

  const deleteByIndex = () => {
    setIsDeleting(true);
    linkedList.removeByIndex(indexInputValue!);
    let i = 0;
    let checkedI: number[] = [];

    setTimeout(function run() {
      if (i !== indexInputValue! + 1) {
        checkedI = [...checkedI, i];
        setCheckedIndexes(checkedI);
        i++;
        setTimeout(run, SHORT_DELAY_IN_MS);
      } else {
        render();
        setCheckedIndexes([]);
        setIsDeleting(false);
        setIndexInputValue(null);
      }
    }, 0);
  };

  const visualization = React.useMemo((): JSX.Element[] | JSX.Element => {
    if (
      !visualizationList.length &&
      (isHeadAdding || isTailAdding || isAdding)
    ) {
      return (
        <Circle
          letter={textInputValue}
          isSmall={true}
          state={ElementStates.Changing}
        />
      );
    }

    return visualizationList.map((el, index) => (
      <Fragment key={index}>
        <Circle
          letter={
            (isHeadDeleting && index === 0) ||
            (isTailDeleting && index === visualizationList.length - 1) ||
            (isDeleting &&
              indexInputValue === index &&
              checkedIndexes.length - 1 === index)
              ? ""
              : el
          }
          index={index}
          head={
            (isHeadAdding && index === 0) ||
            (isTailAdding && index === visualizationList.length - 1) ||
            (isAdding && index === checkedIndexes.length) ? (
              <Circle
                letter={textInputValue}
                isSmall={true}
                state={ElementStates.Changing}
              />
            ) : index === 0 ? (
              "head"
            ) : (
              ""
            )
          }
          tail={
            (isHeadDeleting && index === 0) ||
            (isTailDeleting && index === visualizationList.length - 1) ||
            (isDeleting &&
              index === checkedIndexes.length - 1 &&
              index === indexInputValue) ? (
              <Circle
                letter={
                  isHeadDeleting
                    ? visualizationList[0]
                    : isTailDeleting
                    ? visualizationList[visualizationList.length - 1]
                    : isDeleting
                    ? visualizationList[index]
                    : ""
                }
                isSmall={true}
                state={ElementStates.Changing}
              />
            ) : index === visualizationList.length - 1 ? (
              "tail"
            ) : (
              ""
            )
          }
          state={
            (isAdding || isDeleting) && checkedIndexes.includes(index)
              ? ElementStates.Changing
              : (isHeadAddingDone && index === 0) ||
                (isTailAddingDone && index === visualizationList.length - 1) ||
                (isAddingDone && index === indexInputValue)
              ? ElementStates.Modified
              : ElementStates.Default
          }
        />
        {index !== visualizationList.length - 1 && <ArrowIcon />}
      </Fragment>
    ));
  }, [
    visualizationList,
    isHeadAdding,
    isHeadAddingDone,
    isTailAdding,
    isTailAddingDone,
    isHeadDeleting,
    isTailDeleting,
    isAdding,
    isAddingDone,
    checkedIndexes,
  ]);

  return (
    <SolutionLayout title="Связный список">
      <form className={styles.form}>
        <fieldset className={styles.fieldset}>
          <Input
            placeholder="Введите значение"
            maxLength={4}
            isLimitText={true}
            extraClass={styles.input}
            value={textInputValue}
            onChange={handleTextChange}
          />
          <Button
            type="button"
            text="Добавить в head"
            extraClass={styles.boundaryButton}
            onClick={addHead}
            isLoader={isHeadAdding || isHeadAddingDone}
            disabled={
              linkedList.size === 8 ||
              !textInputValue.length ||
              isTailAdding ||
              isTailAddingDone ||
              isHeadDeleting ||
              isTailDeleting ||
              isAdding ||
              isAddingDone ||
              isDeleting
            }
          />
          <Button
            type="button"
            text="Добавить в tail"
            extraClass={styles.boundaryButton}
            onClick={addTail}
            isLoader={isTailAdding || isTailAddingDone}
            disabled={
              linkedList.size === 8 ||
              !textInputValue.length ||
              isHeadAdding ||
              isHeadAddingDone ||
              isHeadDeleting ||
              isTailDeleting ||
              isAdding ||
              isAddingDone ||
              isDeleting
            }
          />
          <Button
            type="button"
            text="Удалить из head"
            extraClass={styles.boundaryButton}
            onClick={deleteHead}
            isLoader={isHeadDeleting}
            disabled={
              !linkedList.size ||
              isHeadAdding ||
              isHeadAddingDone ||
              isTailAdding ||
              isTailAddingDone ||
              isTailDeleting ||
              isAdding ||
              isAddingDone ||
              isDeleting
            }
          />
          <Button
            type="button"
            text="Удалить из tail"
            extraClass={styles.boundaryButton}
            onClick={deleteTail}
            isLoader={isTailDeleting}
            disabled={
              !linkedList.size ||
              isHeadAdding ||
              isHeadAddingDone ||
              isTailAdding ||
              isTailAddingDone ||
              isHeadDeleting ||
              isAdding ||
              isAddingDone ||
              isDeleting
            }
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <Input
            placeholder="Введите индекс"
            type="number"
            min={0}
            max={linkedList.size - 1}
            step={1}
            extraClass={styles.input}
            value={indexInputValue ?? ""}
            onChange={handleIndexChange}
          />
          <Button
            type="button"
            text="Добавить по индексу"
            extraClass={styles.indexButton}
            onClick={addByIndex}
            isLoader={isAdding || isAddingDone}
            disabled={
              linkedList.size === 8 ||
              !textInputValue.length ||
              indexInputValue === null ||
              indexInputValue > linkedList.size - 1 ||
              indexInputValue < 0 ||
              isHeadAdding ||
              isHeadAddingDone ||
              isTailAdding ||
              isTailAddingDone ||
              isHeadDeleting ||
              isTailDeleting ||
              isDeleting
            }
          />
          <Button
            type="button"
            text="Удалить по индексу"
            extraClass={styles.indexButton}
            onClick={deleteByIndex}
            isLoader={isDeleting}
            disabled={
              !linkedList.size ||
              indexInputValue === null ||
              indexInputValue > linkedList.size - 1 ||
              indexInputValue < 0 ||
              isHeadAdding ||
              isHeadAddingDone ||
              isTailAdding ||
              isTailAddingDone ||
              isHeadDeleting ||
              isTailDeleting ||
              isAdding ||
              isAddingDone
            }
          />
        </fieldset>
      </form>
      <div className={styles.container}>{visualization}</div>
    </SolutionLayout>
  );
};
