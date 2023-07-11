/// <reference types="Cypress" />

describe("template spec", () => {
  it("Create New Form and filter functionality", () => {
    cy.clearLocalStorage();
    cy.visit("http://localhost:3000/");

    //- [x]  Uma mensagem de boas-vindas e algumas informações sobre sua aplicação;
    cy.contains("span", "Começar").click();
    // @@end

    cy.contains("div", " Os formulários que você criar aparecerão aqui :) ");

    //- [x]  cadastrar um novo formulário
    cy.get("#createNewFormButton").click();
    cy.contains("p", "Voltar").click();

    cy.contains(".v-card-title", "Novo formulário 0");

    cy.get("#createNewFormButton").click();
    cy.contains("p", "Voltar").click();

    cy.contains(".v-card-title", "Novo formulário 0");
    cy.contains(".v-card-title", "Novo formulário 1");
    // @@end

    //- [x]  Um componente de pesquisa para consultar pelo nome dos formulários registrados.
    cy.get("#filterFormsInput").type("1");
    cy.contains(".v-card-title", "Novo formulário 0").should("not.exist");
    // @@end
  });
});
