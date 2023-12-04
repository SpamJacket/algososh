import renderer from "react-test-renderer";
import { Circle } from "./circle";

describe("Рендеринг круга", () => {
  it("Круг без букв рендерится без ошибок", () => {
    const tree = renderer.create(<Circle />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг c буквами рендерится без ошибок", () => {
    const tree = renderer.create(<Circle letter="Тест" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг с head рендерится без ошибок", () => {
    const tree = renderer.create(<Circle head={"head"} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг с react-элементом в head рендерится без ошибок", () => {
    const tree = renderer
      .create(<Circle head={<Circle letter="Тест" isSmall={true} />} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг с tail рендерится без ошибок", () => {
    const tree = renderer.create(<Circle tail={"tail"} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг с react-элементом в tai рендерится без ошибок", () => {
    const tree = renderer
      .create(<Circle tail={<Circle letter="Тест" isSmall={true} />} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг с index рендерится без ошибок", () => {
    const tree = renderer.create(<Circle index={0} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг с пропcом isSmall ===  true рендерится без ошибок", () => {
    const tree = renderer.create(<Circle isSmall={true} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг в состоянии default рендерится без ошибок", () => {
    const tree = renderer.create(<Circle state="default" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг в состоянии changing рендерится без ошибок", () => {
    const tree = renderer.create(<Circle state="changing" />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("Круг в состоянии modified рендерится без ошибок", () => {
    const tree = renderer.create(<Circle state="modified" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
