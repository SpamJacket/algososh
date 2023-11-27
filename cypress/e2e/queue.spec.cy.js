describe("Очередь", () => {
  beforeEach(() => {
    cy.visit("/queue");
  });

  it("Кнопка добавления недоступна при пустом поле", () => {
    cy.get("input").clear();
    cy.contains("Добавить").should("be.disabled");
  });

  it("Кнопки удаления и очистки недоступны при пустой очереди", () => {
    cy.contains("head").should("not.exist");
    cy.contains("Удалить").should("be.disabled");
    cy.contains("Очистить").should("be.disabled");
  });

  it("Кнопка добавления работает корректно", () => {
    cy.get("input").type("1234");
    cy.contains("Добавить").as("button");
    cy.get("[class^=circle_circle]").as("circles");
    cy.get("@circles").eq(0).as("firstCircle");
    cy.get("@circles").eq(1).as("secondCircle");
    cy.get("@button").then(($button) => {
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
    cy.wait(500);
    cy.get("@firstCircle")
      .invoke("attr", "class")
      .should("match", /default/);

    cy.get("input").type("abcd");
    cy.get("@button").then(($button) => {
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
    cy.wait(500);
    cy.get("@secondCircle")
      .invoke("attr", "class")
      .should("match", /default/);

    cy.contains("Удалить").click();
    cy.wait(500);
    cy.contains("Удалить").click();
    cy.wait(500);

    cy.get("input").type("1234");
    cy.get("@button").then(($button) => {
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
    cy.wait(500);
    cy.get("@secondCircle")
      .invoke("attr", "class")
      .should("match", /default/);
  });

  it("Кнопка удаления работает корректно", () => {
    cy.get("input").type("1");
    cy.contains("Добавить").click();
    cy.wait(1000);
    cy.get("input").type("2");
    cy.contains("Добавить").click();

    cy.get("[class^=circle_circle]").as("circles");
    cy.contains("Удалить").as("button");
    cy.get("@circles").eq(0).as("firstCircle");
    cy.get("@circles").eq(1).as("secondCircle");
    cy.get("@firstCircle").parent().invoke("text").should("match", /head/);
    cy.get("@secondCircle").parent().invoke("text").should("match", /tail/);

    cy.get("@button").then(($button) => {
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

    cy.get("@button").then(($button) => {
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
    cy.contains("Добавить").click();
    cy.wait(1000);
    cy.get("input").type("2");
    cy.contains("Добавить").click();
    cy.wait(1000);
    cy.get("input").type("3");
    cy.contains("Добавить").click();
    cy.wait(1000);
    cy.contains("Очистить").click();
    cy.get("[class^=circle_letter]").should("have.length", 0);
  });
});
