describe("Сервис доступен", () => {
  it("Доступен по адресу localhost:3000", () => {
    cy.visit("/algososh/");
  });
});
