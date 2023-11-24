import renderer from "react-test-renderer";
import { Button } from "./button";
import { render, screen, fireEvent } from "@testing-library/react";

describe("Рендер кнопки", () => {
  it("Кнопка c текстом рендерится без ошибок", () => {
    const tree = renderer.create(<Button text="Текст для теста" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Кнопка без текста рендерится без ошибок", () => {
    const tree = renderer.create(<Button />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Заблокированная кнопка рендерится без ошибок", () => {
    const tree = renderer.create(<Button disabled={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Кнопка во время загрузки рендерится без ошибок", () => {
    const tree = renderer.create(<Button isLoader={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe("Обработка колбека кнопки", () => {
  it("При клике на кнопку, колбек вызывается корректно", () => {
    window.alert = jest.fn();

    render(<Button onClick={() => alert("Алгоритм запустился!")} />);

    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(window.alert).toHaveBeenCalledWith("Алгоритм запустился!");
  });
});
