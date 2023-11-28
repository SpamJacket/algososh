describe("Очередь", () => {
  beforeEach(() => {
    cy.visit("/queue");
    cy.contains("Добавить").as("addButton");
    cy.contains("Удалить").as("delButton");
    cy.contains("Очистить").as("clearButton");
    cy.get("[class^=circle_circle]").as("circles");
    cy.get("@circles").eq(0).as("firstCircle");
    cy.get("@circles").eq(1).as("secondCircle");
  });

  it("Кнопка добавления недоступна при пустом поле", () => {
    cy.get("input").clear();
    cy.get("@addButton").should("be.disabled");
  });

  it("Кнопки удаления и очистки недоступны при пустой очереди", () => {
    cy.get("[class^=circle_letter]").should("have.length", 0);
    cy.get("@delButton").should("be.disabled");
    cy.get("@clearButton").should("be.disabled");
  });

  it("Кнопка добавления работает корректно", () => {
    cy.get("input").type("1234");
    cy.get("@addButton").then(($button) => {
      $button.click();
      cy.get("@firstCircle")
        .invoke("attr", "class")
        .should("match", /changing/);
    });
    cy.get("@firstCircle")
      .invoke("attr", "class")
      .should("match", /modified/);
    cy.get("@firstCircle")
      .invoke("text")
      .should("match", /^1234$/);
    cy.get("@firstCircle")
      .parent()
      .invoke("text")
      .should("match", /head/)
      .and("match", /tail/);
    cy.get("@firstCircle")
      .invoke("attr", "class")
      .should("match", /default/);

    cy.get("input").type("abcd");
    cy.get("@addButton").then(($button) => {
      $button.click();
      cy.get("@secondCircle")
        .invoke("attr", "class")
        .should("match", /changing/);
    });
    cy.get("@secondCircle")
      .invoke("attr", "class")
      .should("match", /modified/);
    cy.get("@secondCircle")
      .invoke("text")
      .should("match", /^abcd$/);
    cy.get("@firstCircle").parent().invoke("text").should("match", /head/);
    cy.get("@secondCircle").parent().invoke("text").should("match", /tail/);
    cy.get("@secondCircle")
      .invoke("attr", "class")
      .should("match", /default/);

    cy.get("@delButton").click();
    cy.wait(500);
    cy.get("@delButton").click();
    cy.wait(500);

    cy.get("input").type("1234");
    cy.get("@addButton").then(($button) => {
      $button.click();
      cy.get("@secondCircle")
        .invoke("attr", "class")
        .should("match", /changing/);
    });
    cy.get("@secondCircle")
      .invoke("attr", "class")
      .should("match", /modified/);
    cy.get("@secondCircle")
      .invoke("text")
      .should("match", /^1234$/);
    cy.get("@secondCircle")
      .parent()
      .invoke("text")
      .should("match", /head/)
      .and("match", /tail/);
    cy.get("@secondCircle")
      .invoke("attr", "class")
      .should("match", /default/);
  });

  it("Кнопка удаления работает корректно", () => {
    cy.get("input").type("1");
    cy.get("@addButton").click();
    cy.wait(1000);
    cy.get("input").type("2");
    cy.get("@addButton").click();
    cy.wait(1000);

    cy.get("@firstCircle").parent().invoke("text").should("match", /head/);
    cy.get("@secondCircle").parent().invoke("text").should("match", /tail/);

    cy.get("@delButton").then(($button) => {
      $button.click();
      cy.get("@firstCircle")
        .invoke("attr", "class")
        .should("match", /changing/);
    });
    cy.get("@firstCircle").invoke("text").should("be.equal", "");
    cy.get("@firstCircle")
      .invoke("attr", "class")
      .should("match", /default/);
    cy.get("@secondCircle").parent().invoke("text").should("match", /head/);

    cy.get("@delButton").then(($button) => {
      $button.click();
      cy.get("@secondCircle")
        .invoke("attr", "class")
        .should("match", /changing/);
    });
    cy.get("@secondCircle").invoke("text").should("be.equal", "");
    cy.get("@secondCircle")
      .invoke("attr", "class")
      .should("match", /default/);
    cy.get("@secondCircle").parent().invoke("text").should("match", /head/);
    cy.get("@secondCircle").parent().invoke("text").should("not.match", /tail/);
  });

  it("Кнопка очистки работает корректно", () => {
    cy.get("input").type("1");
    cy.get("@addButton").click();
    cy.wait(1000);
    cy.get("input").type("2");
    cy.get("@addButton").click();
    cy.wait(1000);
    cy.get("input").type("3");
    cy.get("@addButton").click();
    cy.wait(1000);
    cy.get("@clearButton").click();
    cy.get("[class^=circle_letter]").should("have.length", 0);
  });
});
