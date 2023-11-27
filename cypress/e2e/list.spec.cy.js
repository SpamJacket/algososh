describe("Связный список", () => {
  beforeEach(() => {
    cy.visit("/list");
  });

  it("Кнопки добавления и кнопка удаления по индексу недоступны при пустых полях", () => {
    cy.get("input").first().clear();
    cy.contains("Добавить в head").should("be.disabled");
    cy.contains("Добавить в tail").should("be.disabled");
    cy.get("input").last().clear();
    cy.contains("Добавить по индексу").should("be.disabled");
    cy.contains("Удалить по индексу").should("be.disabled");
  });

  it.skip("Кнопки удаления недоступны при пустом списке", () => {
    cy.contains("Удалить из head").as("headDelBtn");
    cy.contains("Удалить из tail").as("tailDelBtn");
    cy.contains("Удалить по индексу").as("indexDelBtn");
    cy.get("@headDelBtn").click();
    cy.wait(500);
    cy.get("@tailDelBtn").click();
    cy.wait(500);
    cy.get("@headDelBtn").click();
    cy.wait(500);
    cy.get("@tailDelBtn").click();
    cy.wait(500);
    cy.get("input").last().type(0);
    cy.get("[class^=circle]").should("have.length", 0);
    cy.get("@headDelBtn").should("be.disabled");
    cy.get("@tailDelBtn").should("be.disabled");
    cy.get("@indexDelBtn").should("be.disabled");
  });

  it("Дефолтный список рендерится корректно", () => {
    cy.get("[class^=circle_circle]").as("circles");
    cy.get("@circles").should("have.length", 4);
    cy.get("@circles").first().as("firstCircle");
    cy.get("@circles").last().as("lastCircle");
    cy.get("@firstCircle").parent().invoke("text").should("match", /head/);
    cy.get("@firstCircle").invoke("text").should("be.equal", "8");
    cy.get("@circles").eq(1).invoke("text").should("be.equal", "34");
    cy.get("@circles").eq(2).invoke("text").should("be.equal", "0");
    cy.get("@lastCircle").parent().invoke("text").should("match", /tail/);
    cy.get("@lastCircle").invoke("text").should("be.equal", "15");
  });

  it.skip("Добавление в head работает корректно", () => {
    cy.get("input").first().type("1234");
    cy.get("[class^=circle_circle]").as("circles");
    cy.get("@circles").should("have.length", 4);
    cy.contains("Добавить в head").then(($button) => {
      $button.click();
      cy.get("@circles")
        .first()
        .invoke("attr", "class")
        .should("match", /changing/);
      cy.get("@circles").first().invoke("text").should("be.equal", "1234");
    });
    cy.get("@circles")
      .first()
      .invoke("attr", "class")
      .should("match", /modified/);
    cy.get("@circles").first().invoke("text").should("be.equal", "1234");
    cy.wait(500);
    cy.get("@circles")
      .first()
      .invoke("attr", "class")
      .should("match", /default/);
    cy.get("@circles").should("have.length", 5);
  });

  it.skip("Добавление в tail работает корректно", () => {
    cy.get("input").first().type("1234");
    cy.get("[class^=circle_circle]").as("circles");
    cy.get("@circles").should("have.length", 4);
    cy.contains("Добавить в tail").then(($button) => {
      $button.click();
      cy.get("@circles")
        .eq(3)
        .invoke("attr", "class")
        .should("match", /changing/);
      cy.get("@circles").eq(3).invoke("text").should("be.equal", "1234");
    });
    cy.get("@circles")
      .last()
      .invoke("attr", "class")
      .should("match", /modified/);
    cy.get("@circles").last().invoke("text").should("be.equal", "1234");
    cy.wait(500);
    cy.get("@circles")
      .last()
      .invoke("attr", "class")
      .should("match", /default/);
    cy.get("@circles").should("have.length", 5);
  });

  it.skip("Добавление по индексу работает корректно", () => {
    cy.get("input").first().type("1234");
    cy.get("input").last().type(2);
    cy.get("[class^=circle_circle]").as("circles");
    cy.get("@circles").should("have.length", 4);
    cy.contains("Добавить по индексу").then(($button) => {
      $button.click();
      cy.get("@circles")
        .first()
        .invoke("attr", "class")
        .should("match", /changing/);
      cy.get("@circles").first().invoke("text").should("be.equal", "1234");
    });
    cy.get("@circles")
      .eq(1)
      .invoke("attr", "class")
      .should("match", /changing/);
    cy.get("@circles").eq(1).invoke("text").should("be.equal", "1234");
    cy.wait(500);
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
    cy.wait(500);
    cy.get("@circles")
      .eq(2)
      .invoke("attr", "class")
      .should("match", /default/);
    cy.get("@circles").should("have.length", 5);
  });

  it.skip("Удаление из head работает корректно", () => {
    cy.get("[class^=circle_circle]").as("circles");
    cy.get("@circles").should("have.length", 4);
    cy.contains("Удалить из head").then(($button) => {
      $button.click();
      cy.get("@circles")
        .eq(1)
        .invoke("attr", "class")
        .should("match", /changing/);
      cy.get("@circles").eq(1).invoke("text").should("be.equal", "8");
    });
    cy.get("@circles")
      .first()
      .invoke("attr", "class")
      .should("match", /default/);
    cy.get("@circles").first().invoke("text").should("be.equal", "34");
    cy.get("@circles").should("have.length", 3);
  });

  it.skip("Удаление из tail работает корректно", () => {
    cy.get("[class^=circle_circle]").as("circles");
    cy.get("@circles").should("have.length", 4);
    cy.contains("Удалить из tail").then(($button) => {
      $button.click();
      cy.get("@circles")
        .last()
        .invoke("attr", "class")
        .should("match", /changing/);
      cy.get("@circles").last().invoke("text").should("be.equal", "15");
    });
    cy.get("@circles")
      .last()
      .invoke("attr", "class")
      .should("match", /default/);
    cy.get("@circles").last().invoke("text").should("be.equal", "0");
    cy.get("@circles").should("have.length", 3);
  });

  it("Удаление по индексу работает корректно", () => {
    cy.get("input").last().type(1);
    cy.get("[class^=circle_circle]").as("circles");
    cy.get("@circles").should("have.length", 4);
    cy.contains("Удалить по индексу").then(($button) => {
      $button.click();
      cy.get("@circles")
        .first()
        .invoke("attr", "class")
        .should("match", /changing/);
    });
    cy.get("@circles")
      .first()
      .invoke("attr", "class")
      .should("match", /changing/);
    cy.get("@circles")
      .eq(1)
      .invoke("attr", "class")
      .should("match", /changing/);
    cy.get("@circles")
      .first()
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
    cy.wait(500);
    cy.get("@circles").should("have.length", 3);
    cy.get("@circles").eq(1).invoke("text").should("be.equal", "0");
  });
});
