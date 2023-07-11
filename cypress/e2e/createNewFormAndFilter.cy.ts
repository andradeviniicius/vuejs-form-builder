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

    // - [x]  editar,
    // @@end

    //- [x]  excluir
    // @@end

    //- [x]  visualizar
    // @@end
  });

  //     - [ ]  Filtro por formulários ativos ou não.
  // - [x]  Página Edição de Formulários deve conter:
  //     - [x]  Duas abas, sendo
  //         - [x]  uma para a Edição e

  //             A aba de Edição deve possuir os seguintes requisitos:

  //             - [x]  Um menu lateral com as opções de componentes que possam ser
  //             inseridos no formulário.
  //             - [x]  A inserção dos componentes no formulário
  //             deve ser feita por meio da funcionalidade de arrastar e soltar
  //             (‘drag-and-drop’).
  //             - [x]  Os componentes devem ser campo para texto curto
  //             e campo de Sim/Não.

  //             A área central da aba de edição

  //             - [ ]  deve exibir no cabeçalho um campo
  //             para inserir uma imagem do formulário,
  //             - [x]  um campo para título e um
  //             - [x]  outro campo para a descrição.
  //             - [x]  O corpo da área central deve ser o
  //             espaço para incluir os componentes sequencialmente.
  //             - [x]  E no rodapé deve ser exibido um botão para salvar as alterações.
  //             - [x]  Ao arrastar um componente para a área central da aba de edição, o
  //             componente deve ser inserido na ordem/posição em que ele foi solto.
  //             - [x]  Os componentes devem ser exibidos um após o outro, sendo também
  //             possível arrastar e soltar para reordená-los.
  //             - [ ]  Ao incluir um componente no formulário
  //                 - [x]  deve ser possível editar o título do campo,
  //                 - [ ]  uma opção de checkbox para ser sinalizado se é um campo obrigatório
  //                 - [x]  . Também deve ser possível excluir, duplicar ou
  //                 reordenar (com o ‘drag-and-drop’) o componente adicionado.
  //                 - [x]  Na aba de Visualização deve ser possível visualizar todos os campos
  //                 inseridos, como uma prévia do formulário para a publicação.
  //                 - [x]  Estando na página de Cadastro/Edição deve ser possível voltar à página
  //                 Inicial
  //         - [ ]  Também no cabeçalho deve possuir a opção para informar
  //         se o formulário está ativo ou não.
});
