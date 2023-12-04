describe("Фибоначчи", () => {
  beforeEach(() => {
    cy.visit("/fibonacci");
  });

  it("Кнопка недоступна при пустом поле", () => {
    cy.get("input").clear();
    cy.contains("Рассчитать").should("be.disabled");
  });

  it("Числа генерируются корректно", () => {
    cy.get("input").type(7);
    cy.get("button").last().as("button");

    cy.get("@button").then(($button) => {
      $button.click();
      expect($button.attr("class")).to.match(/button_loader/);
      expect($button).to.be.disabled;
    });

    cy.get("[class^=circle_circle]").as("circles");

    cy.wait(500);
    cy.get("@circles").should(($circles) => {
      expect($circles.eq(0)).to.have.text("1");
      expect($circles.eq(0).attr("class")).to.match(/default/);
    });
    cy.wait(500);
    cy.get("@circles").should(($circles) => {
      expect($circles.eq(0)).to.have.text("1");
      expect($circles.eq(0).attr("class")).to.match(/default/);
      expect($circles.eq(1)).to.have.text("1");
      expect($circles.eq(1).attr("class")).to.match(/default/);
    });
    cy.wait(500);
    cy.get("@circles").should(($circles) => {
      expect($circles.eq(0)).to.have.text("1");
      expect($circles.eq(0).attr("class")).to.match(/default/);
      expect($circles.eq(1)).to.have.text("1");
      expect($circles.eq(1).attr("class")).to.match(/default/);
      expect($circles.eq(2)).to.have.text("2");
      expect($circles.eq(2).attr("class")).to.match(/default/);
    });
    cy.wait(500);
    cy.get("@circles").should(($circles) => {
      expect($circles.eq(0)).to.have.text("1");
      expect($circles.eq(0).attr("class")).to.match(/default/);
      expect($circles.eq(1)).to.have.text("1");
      expect($circles.eq(1).attr("class")).to.match(/default/);
      expect($circles.eq(2)).to.have.text("2");
      expect($circles.eq(2).attr("class")).to.match(/default/);
      expect($circles.eq(3)).to.have.text("3");
      expect($circles.eq(3).attr("class")).to.match(/default/);
    });
    cy.wait(500);
    cy.get("@circles").should(($circles) => {
      expect($circles.eq(0)).to.have.text("1");
      expect($circles.eq(0).attr("class")).to.match(/default/);
      expect($circles.eq(1)).to.have.text("1");
      expect($circles.eq(1).attr("class")).to.match(/default/);
      expect($circles.eq(2)).to.have.text("2");
      expect($circles.eq(2).attr("class")).to.match(/default/);
      expect($circles.eq(3)).to.have.text("3");
      expect($circles.eq(3).attr("class")).to.match(/default/);
      expect($circles.eq(4)).to.have.text("5");
      expect($circles.eq(4).attr("class")).to.match(/default/);
    });
    cy.wait(500);
    cy.get("@circles").should(($circles) => {
      expect($circles.eq(0)).to.have.text("1");
      expect($circles.eq(0).attr("class")).to.match(/default/);
      expect($circles.eq(1)).to.have.text("1");
      expect($circles.eq(1).attr("class")).to.match(/default/);
      expect($circles.eq(2)).to.have.text("2");
      expect($circles.eq(2).attr("class")).to.match(/default/);
      expect($circles.eq(3)).to.have.text("3");
      expect($circles.eq(3).attr("class")).to.match(/default/);
      expect($circles.eq(4)).to.have.text("5");
      expect($circles.eq(4).attr("class")).to.match(/default/);
      expect($circles.eq(5)).to.have.text("8");
      expect($circles.eq(5).attr("class")).to.match(/default/);
    });
    cy.wait(500);
    cy.get("@circles").should(($circles) => {
      expect($circles.eq(0)).to.have.text("1");
      expect($circles.eq(0).attr("class")).to.match(/default/);
      expect($circles.eq(1)).to.have.text("1");
      expect($circles.eq(1).attr("class")).to.match(/default/);
      expect($circles.eq(2)).to.have.text("2");
      expect($circles.eq(2).attr("class")).to.match(/default/);
      expect($circles.eq(3)).to.have.text("3");
      expect($circles.eq(3).attr("class")).to.match(/default/);
      expect($circles.eq(4)).to.have.text("5");
      expect($circles.eq(4).attr("class")).to.match(/default/);
      expect($circles.eq(5)).to.have.text("8");
      expect($circles.eq(5).attr("class")).to.match(/default/);
      expect($circles.eq(6)).to.have.text("13");
      expect($circles.eq(6).attr("class")).to.match(/default/);
    });
    cy.wait(500);
    cy.get("@circles").should(($circles) => {
      expect($circles.eq(0)).to.have.text("1");
      expect($circles.eq(0).attr("class")).to.match(/default/);
      expect($circles.eq(1)).to.have.text("1");
      expect($circles.eq(1).attr("class")).to.match(/default/);
      expect($circles.eq(2)).to.have.text("2");
      expect($circles.eq(2).attr("class")).to.match(/default/);
      expect($circles.eq(3)).to.have.text("3");
      expect($circles.eq(3).attr("class")).to.match(/default/);
      expect($circles.eq(4)).to.have.text("5");
      expect($circles.eq(4).attr("class")).to.match(/default/);
      expect($circles.eq(5)).to.have.text("8");
      expect($circles.eq(5).attr("class")).to.match(/default/);
      expect($circles.eq(6)).to.have.text("13");
      expect($circles.eq(6).attr("class")).to.match(/default/);
      expect($circles.eq(7)).to.have.text("21");
      expect($circles.eq(7).attr("class")).to.match(/default/);
    });

    cy.get("@button").should(($button) => {
      expect($button.attr("class")).to.not.match(/button_loader/);
      expect($button).to.be.not.disabled;
    });
  });
});
