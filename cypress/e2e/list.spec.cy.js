describe("Связный список", () => {
  beforeEach(() => {
    cy.visit("/algososh/list");
    cy.contains("Добавить в head").as("headAddBtn");
    cy.contains("Добавить в tail").as("tailAddBtn");
    cy.contains("Добавить по индексу").as("indexAddBtn");
    cy.contains("Удалить из head").as("headDelBtn");
    cy.contains("Удалить из tail").as("tailDelBtn");
    cy.contains("Удалить по индексу").as("indexDelBtn");
    cy.get("[class^=circle_circle]").as("circles");
    cy.get("@circles").first().as("firstCircle");
    cy.get("@circles").last().as("lastCircle");
    cy.get("input").first().as("valueInput");
    cy.get("input").last().as("indexInput");
  });

  it("Кнопки добавления и кнопка удаления по индексу недоступны при пустых полях", () => {
    cy.get("@valueInput").clear();
    cy.get("@headAddBtn").should("be.disabled");
    cy.get("@tailAddBtn").should("be.disabled");
    cy.get("@indexInput").clear();
    cy.get("@indexAddBtn").should("be.disabled");
    cy.get("@indexDelBtn").should("be.disabled");
  });

  it("Кнопки удаления недоступны при пустом списке", () => {
    cy.get("@headDelBtn").click();
    cy.wait(500);
    cy.get("@tailDelBtn").click();
    cy.wait(500);
    cy.get("@headDelBtn").click();
    cy.wait(500);
    cy.get("@tailDelBtn").click();
    cy.wait(500);
    cy.get("@indexInput").type(0);
    cy.get("@circles").should("have.length", 0);
    cy.get("@headDelBtn").should("be.disabled");
    cy.get("@tailDelBtn").should("be.disabled");
    cy.get("@indexDelBtn").should("be.disabled");
  });

  it("Дефолтный список рендерится корректно", () => {
    cy.get("@circles").should("have.length", 4);
    cy.get("@firstCircle").parent().invoke("text").should("match", /head/);
    cy.get("@firstCircle").invoke("text").should("be.equal", "8");
    cy.get("@circles").eq(1).invoke("text").should("be.equal", "34");
    cy.get("@circles").eq(2).invoke("text").should("be.equal", "0");
    cy.get("@lastCircle").parent().invoke("text").should("match", /tail/);
    cy.get("@lastCircle").invoke("text").should("be.equal", "15");
  });

  it("Добавление в head работает корректно", () => {
    cy.get("@valueInput").type("1234");
    cy.get("@circles").should("have.length", 4);
    cy.get("@headAddBtn").then(($button) => {
      $button.click();
      cy.get("@firstCircle")
        .invoke("attr", "class")
        .should("match", /changing/);
      cy.get("@firstCircle").invoke("text").should("be.equal", "1234");
    });
    cy.get("@firstCircle")
      .invoke("attr", "class")
      .should("match", /modified/);
    cy.get("@firstCircle").invoke("text").should("be.equal", "1234");
    cy.get("@firstCircle")
      .invoke("attr", "class")
      .should("match", /default/);
    cy.get("@circles").should("have.length", 5);
  });

  it("Добавление в tail работает корректно", () => {
    cy.get("@valueInput").type("1234");
    cy.get("@circles").should("have.length", 4);
    cy.get("@tailAddBtn").then(($button) => {
      $button.click();
      cy.get("@circles")
        .eq(3)
        .invoke("attr", "class")
        .should("match", /changing/);
      cy.get("@circles").eq(3).invoke("text").should("be.equal", "1234");
    });
    cy.get("@lastCircle")
      .invoke("attr", "class")
      .should("match", /modified/);
    cy.get("@lastCircle").invoke("text").should("be.equal", "1234");
    cy.get("@lastCircle")
      .invoke("attr", "class")
      .should("match", /default/);
    cy.get("@circles").should("have.length", 5);
  });

  it("Добавление по индексу работает корректно", () => {
    cy.get("@valueInput").type("1234");
    cy.get("@indexInput").type(2);
    cy.get("@circles").should("have.length", 4);
    cy.get("@indexAddBtn").then(($button) => {
      $button.click();
      cy.get("@firstCircle")
        .invoke("attr", "class")
        .should("match", /changing/);
      cy.get("@firstCircle").invoke("text").should("be.equal", "1234");
    });
    cy.get("@circles")
      .eq(1)
      .invoke("attr", "class")
      .should("match", /changing/);
    cy.get("@circles").eq(1).invoke("text").should("be.equal", "1234");
    cy.get("@circles")
      .eq(2)
      .invoke("attr", "class")
      .should("match", /changing/);
    cy.get("@circles").eq(2).invoke("text").should("be.equal", "1234");
    cy.get("@circles")
      .eq(2)
      .invoke("attr", "class")
      .should("match", /modified/);
    cy.get("@circles").eq(2).invoke("text").should("be.equal", "1234");
    cy.get("@circles")
      .eq(2)
      .invoke("attr", "class")
      .should("match", /default/);
    cy.get("@circles").should("have.length", 5);
  });

  it("Удаление из head работает корректно", () => {
    cy.get("@circles").should("have.length", 4);
    cy.get("@headDelBtn").then(($button) => {
      $button.click();
      cy.get("@circles")
        .eq(1)
        .invoke("attr", "class")
        .should("match", /changing/);
      cy.get("@circles").eq(1).invoke("text").should("be.equal", "8");
    });
    cy.get("@firstCircle")
      .invoke("attr", "class")
      .should("match", /default/);
    cy.get("@firstCircle").invoke("text").should("be.equal", "34");
    cy.get("@circles").should("have.length", 3);
  });

  it("Удаление из tail работает корректно", () => {
    cy.get("@circles").should("have.length", 4);
    cy.get("@tailDelBtn").then(($button) => {
      $button.click();
      cy.get("@lastCircle")
        .invoke("attr", "class")
        .should("match", /changing/);
      cy.get("@lastCircle").invoke("text").should("be.equal", "15");
    });
    cy.get("@lastCircle")
      .invoke("attr", "class")
      .should("match", /default/);
    cy.get("@lastCircle").invoke("text").should("be.equal", "0");
    cy.get("@circles").should("have.length", 3);
  });

  it("Удаление по индексу работает корректно", () => {
    cy.get("@indexInput").type(1);
    cy.get("@circles").should("have.length", 4);
    cy.get("@indexDelBtn").then(($button) => {
      $button.click();
      cy.get("@firstCircle")
        .invoke("attr", "class")
        .should("match", /changing/);
    });
    cy.get("@firstCircle")
      .invoke("attr", "class")
      .should("match", /changing/);
    cy.get("@circles")
      .eq(1)
      .invoke("attr", "class")
      .should("match", /changing/);
    cy.get("@firstCircle")
      .invoke("attr", "class")
      .should("match", /changing/);
    cy.get("@circles")
      .eq(1)
      .invoke("attr", "class")
      .should("match", /changing/);
    cy.get("@circles")
      .eq(2)
      .invoke("attr", "class")
      .should("match", /changing/);
    cy.get("@circles").eq(2).invoke("text").should("be.equal", "34");
    cy.get("@circles").should("have.length", 3);
    cy.get("@circles").eq(1).invoke("text").should("be.equal", "0");
  });
});
