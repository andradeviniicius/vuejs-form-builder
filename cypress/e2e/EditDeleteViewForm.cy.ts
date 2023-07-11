import { createMemoryHistory, createRouter } from "vue-router";
import routes from "../../src/router";
import { beforeEach } from "node:test";

describe("template spec", () => {
  it("Edit, Delete and View Form", () => {
    cy.clearLocalStorage();
    cy.visit("http://localhost:3000/");

    cy.contains("span", "Começar").click();

    cy.contains("div", " Os formulários que você criar aparecerão aqui :) ");

    cy.get("#createNewFormButton").click();
    cy.contains("p", "Voltar").click();
    cy.contains(".v-card-title", "Novo formulário 0").should("exist");
    cy.contains(".v-card-subtitle", "Descrição do formulário 0").click();

    // - [x]  editar,
    cy.contains("span", "Editar").click();
    cy.contains("h3", "Novo formulário 0").should("exist");
    cy.contains("h3", "Descrição do formulário 0").should("exist");

    // Edit title process
    cy.get("#saveFormButton").should("be.disabled");

    cy.get("#editTitleButton").click();
    cy.contains("h3", "Novo formulário 0").clear().type("Vaga de Vue");
    cy.get("#editTitleButton").click();

    //- [x]  visualizar
    cy.get("#previewModeButton").click();
    cy.contains(".v-card-title", "Vaga de Vue").should(`exist`);
    cy.contains(".v-card-subtitle", "Descrição do formulário 0").should(
      `exist`
    );
    cy.get("#editorModeButton").click();
    //@end preview
    cy.get("#saveFormButton").should("be.not.disabled");

    //  Dont discard Changes process
    cy.contains("p", "Voltar").click();
    cy.contains(
      ".v-card-title",
      "Você está saindo sem salvar as alterações!"
    ).should("exist");
    cy.contains(".v-btn__content", "Sim!").click();
    //@@end

    cy.get("#saveFormButton").click();
    cy.contains(".v-btn__content", "Aceitar").click();

    cy.contains("h3", "Vaga de Vue").should("exist");

    cy.contains("p", "Voltar").click();
    cy.contains(".v-card-title", "Vaga de Vue").should("exist");

    // Edit subtitlte process
    cy.contains("span", "Editar").click();
    cy.get("#saveFormButton").should("be.disabled");

    cy.get("#editDescriptionButton").click();
    cy.contains("h3", "Descrição do formulário 0")
      .clear()
      .type("VHL Sistemas, a mais braba");
    cy.get("#editDescriptionButton").click();
    cy.get("#saveFormButton").should("be.not.disabled");

    //- [x]  visualizar
    cy.get("#previewModeButton").click();
    cy.contains(".v-card-title", "Vaga de Vue").should(`exist`);
    cy.contains(".v-card-subtitle", "VHL Sistemas, a mais braba").should(
      `exist`
    );
    //@end preview

    cy.get("#editorModeButton").click();
    cy.get("#saveFormButton").click();
    cy.contains(".v-btn__content", "Aceitar").click();

    cy.contains("h3", "VHL Sistemas, a mais braba").should("exist");

    cy.contains("p", "Voltar").click();
    cy.contains(".v-card-subtitle", "VHL Sistemas, a mais braba").should(
      "exist"
    );

    // Discard process
    cy.contains("span", "Editar").click();
    cy.get("#saveFormButton").should("be.disabled");

    cy.get("#editDescriptionButton").click();
    cy.contains("h3", "VHL Sistemas, a mais braba")
      .clear()
      .type("Descrição errada que nao quero salvar");
    cy.get("#editDescriptionButton").click();
    cy.contains("p", "Voltar").click();
    cy.contains(
      ".v-card-title",
      "Você está saindo sem salvar as alterações!"
    ).should("exist");
    cy.contains(".v-btn__content", " Não, pode descartar tudo!").click();
    cy.contains(
      ".v-card-subtitle",
      "Descrição errada que nao quero salvar"
    ).should("not.exist");

    // Drag and drop
    //If there is enough time i'll test it
    // @@end

    //- [x]  excluir
    cy.contains(".v-card-title", "Vaga de Vue").should("exist");
    cy.contains(".v-btn__content", "Excluir").click();
    cy.contains(
      ".v-card-title",
      "Você realmente deseja excluir este formulário?"
    );
    cy.contains(".v-btn__content", "Aceitar").click();
    cy.contains(".v-card-title", "Vaga de Vue").should("not.exist");
    // @@end
  });
});
