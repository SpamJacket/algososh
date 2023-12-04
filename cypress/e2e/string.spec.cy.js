describe("Строка", () => {
  beforeEach(() => {
    cy.visit("/recursion");
  });

  it("Кнопка недоступна при пустом поле", () => {
    cy.get("input").clear();
    cy.contains("Развернуть").should("be.disabled");
  });

  it("Строка разворачивается и визуализируется правильно", () => {
    cy.get("input").type("12345");
    cy.get("button").last().as("button");

    cy.get("@button").then(($button) => {
      $button.click();
      expect($button.attr("class")).to.match(/button_loader/);
      expect($button).to.be.disabled;
    });

    cy.get("[class^=circle_circle]").as("circles");

    cy.get("@circles").should(($circles) => {
      expect($circles.eq(0)).to.have.text("1");
      expect($circles.eq(0).attr("class")).to.match(/changing/);
      expect($circles.eq(1)).to.have.text("2");
      expect($circles.eq(1).attr("class")).to.match(/default/);
      expect($circles.eq(2)).to.have.text("3");
      expect($circles.eq(2).attr("class")).to.match(/default/);
      expect($circles.eq(3)).to.have.text("4");
      expect($circles.eq(3).attr("class")).to.match(/default/);
      expect($circles.eq(4)).to.have.text("5");
      expect($circles.eq(4).attr("class")).to.match(/changing/);
    });
    cy.wait(1000);
    cy.get("@circles").should(($circles) => {
      expect($circles.eq(0)).to.have.text("5");
      expect($circles.eq(0).attr("class")).to.match(/modified/);
      expect($circles.eq(1)).to.have.text("2");
      expect($circles.eq(1).attr("class")).to.match(/changing/);
      expect($circles.eq(2)).to.have.text("3");
      expect($circles.eq(2).attr("class")).to.match(/default/);
      expect($circles.eq(3)).to.have.text("4");
      expect($circles.eq(3).attr("class")).to.match(/changing/);
      expect($circles.eq(4)).to.have.text("1");
      expect($circles.eq(4).attr("class")).to.match(/modified/);
    });
    cy.wait(1000);
    cy.get("@circles").should(($circles) => {
      expect($circles.eq(0)).to.have.text("5");
      expect($circles.eq(0).attr("class")).to.match(/modified/);
      expect($circles.eq(1)).to.have.text("4");
      expect($circles.eq(1).attr("class")).to.match(/modified/);
      expect($circles.eq(2)).to.have.text("3");
      expect($circles.eq(2).attr("class")).to.match(/modified/);
      expect($circles.eq(3)).to.have.text("2");
      expect($circles.eq(3).attr("class")).to.match(/modified/);
      expect($circles.eq(4)).to.have.text("1");
      expect($circles.eq(4).attr("class")).to.match(/modified/);
    });

    cy.get("@button").should(($button) => {
      expect($button.attr("class")).to.not.match(/button_loader/);
      expect($button).to.be.not.disabled;
    });
  });
});
