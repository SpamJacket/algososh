describe("Стек", () => {
  beforeEach(() => {
    cy.visit("/stack");
  });

  it("Кнопка добавления недоступна, если поле пусто", () => {
    cy.get("input").clear();
    cy.contains("Добавить").should("be.disabled");
  });

  it("Кнопка удаления и очистки недоступна при пустом стеке", () => {
    cy.get("[class^=circle]").should("have.length", 0);
    cy.contains("Удалить").should("be.disabled");
    cy.contains("Очистить").should("be.disabled");
  });

  it("Кнопка добавления работает корректно", () => {
    cy.get("input").type("1234");
    cy.contains("Добавить").as("button");
    cy.get("@button").then(($button) => {
      $button.click();
      cy.get("[class^=circle_circle]").first().as("firstCircle");
      cy.get("@firstCircle")
        .invoke("text")
        .should("match", /^1234$/);
      cy.get("@firstCircle")
        .invoke("attr", "class")
        .should("match", /changing/);
      cy.get("@firstCircle").parent().invoke("text").should("match", /top/);
    });
    cy.wait(500);
    cy.get("@firstCircle")
      .invoke("attr", "class")
      .should("match", /default/);
    cy.get("input").type("abcd");
    cy.get("@button").then(($button) => {
      $button.click();
      cy.get("[class^=circle_circle]").eq(1).as("secondCircle");
      cy.get("@secondCircle")
        .invoke("text")
        .should("match", /^abcd$/);
      cy.get("@secondCircle")
        .invoke("attr", "class")
        .should("match", /changing/);
      cy.get("@firstCircle").parent().invoke("text").should("not.match", /top/);
      cy.get("@secondCircle").parent().invoke("text").should("match", /top/);
    });
    cy.wait(500);
    cy.get("@secondCircle")
      .invoke("attr", "class")
      .should("match", /default/);
  });

  it("Кнопка удаления работает корректно", () => {
    cy.get("input").type("1");
    cy.contains("Добавить").as("addButton");
    cy.get("@addButton").click();
    cy.wait(500);
    cy.get("input").type("2");
    cy.get("@addButton").click();
    cy.wait(500);
    cy.get("input").type("3");
    cy.get("@addButton").click();
    cy.wait(500);
    cy.contains("Удалить").as("delButton");
    cy.get("@delButton").then(($button) => {
      $button.click();
      cy.get("[class^=circle_circle]").eq(2).as("thirdCircle");
      cy.get("@thirdCircle")
        .invoke("attr", "class")
        .should("match", /changing/);
      cy.get("@thirdCircle").parent().invoke("text").should("match", /top/);
    });
    cy.wait(500);
    cy.get("@thirdCircle").should("not.exist");
    cy.get("[class^=circle_circle]")
      .eq(1)
      .parent()
      .invoke("text")
      .should("match", /top/);
  });

  it("Кнопка очистки работает корректно", () => {
    cy.get("input").type("1");
    cy.contains("Добавить").as("addButton");
    cy.get("@addButton").click();
    cy.wait(500);
    cy.get("input").type("2");
    cy.get("@addButton").click();
    cy.wait(500);
    cy.get("input").type("3");
    cy.get("@addButton").click();
    cy.wait(500);
    cy.contains("Очистить").click();
    cy.get("[class^=circle]").should("have.length", 0);
  });
});
