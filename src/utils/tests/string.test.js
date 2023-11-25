import reverseString from "../string";

describe("Алгоритм разворота", () => {
  it("Алгоритм работает верно с чётным количеством символов", () => {
    const sourceString = "123456";
    const reverseRes = reverseString(sourceString.split(""));
    expect(reverseRes).toEqual([
      ["1", "2", "3", "4", "5", "6"],
      ["6", "2", "3", "4", "5", "1"],
      ["6", "5", "3", "4", "2", "1"],
      ["6", "5", "4", "3", "2", "1"],
    ]);
  });

  it("Алгоритм работает верно с нечетным количеством символов", () => {
    const sourceString = "1234567";
    const reverseRes = reverseString(sourceString.split(""));
    expect(reverseRes).toEqual([
      ["1", "2", "3", "4", "5", "6", "7"],
      ["7", "2", "3", "4", "5", "6", "1"],
      ["7", "6", "3", "4", "5", "2", "1"],
      ["7", "6", "5", "4", "3", "2", "1"],
    ]);
  });

  it("Алгоритм работает верно с одним символов", () => {
    const sourceString = "1";
    const reverseRes = reverseString(sourceString.split(""));
    expect(reverseRes).toEqual([["1"]]);
  });

  it("Алгоритм работает верно с пустой строкой", () => {
    const sourceString = "";
    const reverseRes = reverseString(sourceString.split(""));
    expect(reverseRes).toEqual([[]]);
  });
});
