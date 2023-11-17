import React, { ChangeEvent, Fragment } from "react";
import styles from "./list-page.module.css";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import ElementStates from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import LinkedList from "../../utils/linked-list";

const linkedList = new LinkedList<string>();

export const ListPage: React.FC = () => {
  const _isComponentMounted = React.useRef(true);
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

  React.useEffect(() => {
    return () => {
      _isComponentMounted.current = false;
    };
  }, []);

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
      if (_isComponentMounted.current) {
        render();
        setIsHeadAddingDone(true);
        setIsHeadAdding(false);
        setTextInputValue("");
      }
      setTimeout(() => {
        if (_isComponentMounted.current) {
          setIsHeadAddingDone(false);
        }
      }, SHORT_DELAY_IN_MS);
    }, SHORT_DELAY_IN_MS);
  };

  const addTail = () => {
    setIsTailAdding(true);
    linkedList.push(textInputValue);

    setTimeout(() => {
      if (_isComponentMounted.current) {
        render();
        setIsTailAddingDone(true);
        setIsTailAdding(false);
        setTextInputValue("");
      }
      setTimeout(() => {
        if (_isComponentMounted.current) {
          setIsTailAddingDone(false);
        }
      }, SHORT_DELAY_IN_MS);
    }, SHORT_DELAY_IN_MS);
  };

  const deleteHead = () => {
    setIsHeadDeleting(true);
    linkedList.shift();

    setTimeout(() => {
      if (_isComponentMounted.current) {
        render();
        setIsHeadDeleting(false);
      }
    }, SHORT_DELAY_IN_MS);
  };

  const deleteTail = () => {
    setIsTailDeleting(true);
    linkedList.pop();

    setTimeout(() => {
      if (_isComponentMounted.current) {
        render();
        setIsTailDeleting(false);
      }
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
        if (_isComponentMounted.current) {
          setCheckedIndexes(checkedI);
        }
        i++;
        setTimeout(run, SHORT_DELAY_IN_MS);
      } else {
        if (_isComponentMounted.current) {
          render();
          setCheckedIndexes([]);
          setIsAddingDone(true);
          setIsAdding(false);
        }
        setTimeout(() => {
          if (_isComponentMounted.current) {
            setTextInputValue("");
            setIndexInputValue(null);
            setIsAddingDone(false);
          }
        }, SHORT_DELAY_IN_MS);
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
        if (_isComponentMounted.current) {
          setCheckedIndexes(checkedI);
        }
        i++;
        setTimeout(run, SHORT_DELAY_IN_MS);
      } else {
        if (_isComponentMounted.current) {
          render();
          setCheckedIndexes([]);
          setIsDeleting(false);
          setIndexInputValue(null);
        }
      }
    }, 0);
  };

  const getLetterState = React.useCallback(
    (index: number, el: string) => {
      if (
        (isHeadDeleting && index === 0) ||
        (isTailDeleting && index === visualizationList.length - 1) ||
        (isDeleting &&
          indexInputValue === index &&
          checkedIndexes.length - 1 === index)
      ) {
        return "";
      }

      return el;
    },
    [
      isHeadDeleting,
      isTailDeleting,
      isDeleting,
      visualizationList,
      indexInputValue,
      checkedIndexes,
    ]
  );

  const getHeadState = React.useCallback(
    (index: number) => {
      if (
        (isHeadAdding && index === 0) ||
        (isTailAdding && index === visualizationList.length - 1) ||
        (isAdding && index === checkedIndexes.length)
      ) {
        return (
          <Circle
            letter={textInputValue}
            isSmall={true}
            state={ElementStates.Changing}
          />
        );
      }

      if (index === 0) {
        return "head";
      }

      return "";
    },
    [isHeadAdding, isTailAdding, isAdding, visualizationList, checkedIndexes]
  );

  const getTailState = React.useCallback(
    (index: number) => {
      if (
        (isHeadDeleting && index === 0) ||
        (isTailDeleting && index === visualizationList.length - 1) ||
        (isDeleting &&
          index === checkedIndexes.length - 1 &&
          index === indexInputValue)
      ) {
        return (
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
        );
      }

      if (index === visualizationList.length - 1) {
        return "tail";
      }

      return "";
    },
    [
      isHeadDeleting,
      isTailDeleting,
      isDeleting,
      visualizationList,
      checkedIndexes,
      indexInputValue,
    ]
  );

  const getElementState = React.useCallback(
    (index: number): ElementStates => {
      if ((isAdding || isDeleting) && checkedIndexes.includes(index)) {
        return ElementStates.Changing;
      } else if (isHeadAddingDone && index === 0) {
        return ElementStates.Modified;
      } else if (isTailAddingDone && index === visualizationList.length - 1) {
        return ElementStates.Modified;
      } else if (isAddingDone && index === indexInputValue) {
        return ElementStates.Modified;
      }
      return ElementStates.Default;
    },
    [
      isAdding,
      isDeleting,
      isHeadAddingDone,
      isTailAddingDone,
      isAddingDone,
      checkedIndexes,
      visualizationList,
      indexInputValue,
    ]
  );

  const visualization = React.useMemo(() => {
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
          letter={getLetterState(index, el)}
          index={index}
          head={getHeadState(index)}
          tail={getTailState(index)}
          state={getElementState(index)}
        />
        {index !== visualizationList.length - 1 && <ArrowIcon />}
      </Fragment>
    ));
  }, [
    visualizationList,
    isHeadAdding,
    isTailAdding,
    isAdding,
    getLetterState,
    getHeadState,
    getTailState,
    getElementState,
  ]);

  const isInputDisabled =
    isAdding ||
    isAddingDone ||
    isDeleting ||
    isHeadAdding ||
    isHeadAddingDone ||
    isHeadDeleting ||
    isTailAdding ||
    isTailAddingDone ||
    isTailDeleting;

  const isButtonDisabled =
    isHeadAdding ||
    isHeadAddingDone ||
    isTailAdding ||
    isTailAddingDone ||
    isAdding ||
    isAddingDone ||
    isHeadDeleting ||
    isTailDeleting ||
    isDeleting;

  const isUnBorderButtonDisabled =
    indexInputValue === null ||
    indexInputValue > linkedList.getSize() - 1 ||
    indexInputValue < 0;

  const isAddButtonDisabled =
    linkedList.getSize() === 8 || !textInputValue.length;

  const isDeleteButtonDisabled = !linkedList.getSize();

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
            disabled={isInputDisabled}
          />
          <Button
            type="button"
            text="Добавить в head"
            extraClass={styles.boundaryButton}
            onClick={addHead}
            isLoader={isHeadAdding || isHeadAddingDone}
            disabled={isButtonDisabled || isAddButtonDisabled}
          />
          <Button
            type="button"
            text="Добавить в tail"
            extraClass={styles.boundaryButton}
            onClick={addTail}
            isLoader={isTailAdding || isTailAddingDone}
            disabled={isButtonDisabled || isAddButtonDisabled}
          />
          <Button
            type="button"
            text="Удалить из head"
            extraClass={styles.boundaryButton}
            onClick={deleteHead}
            isLoader={isHeadDeleting}
            disabled={isButtonDisabled || isDeleteButtonDisabled}
          />
          <Button
            type="button"
            text="Удалить из tail"
            extraClass={styles.boundaryButton}
            onClick={deleteTail}
            isLoader={isTailDeleting}
            disabled={isButtonDisabled || isDeleteButtonDisabled}
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <Input
            placeholder="Введите индекс"
            type="number"
            min={0}
            max={linkedList.getSize() - 1}
            step={1}
            extraClass={styles.input}
            value={indexInputValue ?? ""}
            onChange={handleIndexChange}
            disabled={isInputDisabled}
          />
          <Button
            type="button"
            text="Добавить по индексу"
            extraClass={styles.indexButton}
            onClick={addByIndex}
            isLoader={isAdding || isAddingDone}
            disabled={
              isButtonDisabled ||
              isAddButtonDisabled ||
              isUnBorderButtonDisabled
            }
          />
          <Button
            type="button"
            text="Удалить по индексу"
            extraClass={styles.indexButton}
            onClick={deleteByIndex}
            isLoader={isDeleting}
            disabled={
              isButtonDisabled ||
              isDeleteButtonDisabled ||
              isUnBorderButtonDisabled
            }
          />
        </fieldset>
      </form>
      <div className={styles.container}>{visualization}</div>
    </SolutionLayout>
  );
};
