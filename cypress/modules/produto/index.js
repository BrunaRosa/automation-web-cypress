const seletores = {
  titulo: '.features_items .title',
  cardProduto: '.features_items .product-image-wrapper',
  nomeProduto: '.features_items .productinfo p',
  linkVerProduto: 'a[href^="/product_details/"]',
  campoBusca: '#search_product',
  botaoBusca: '#submit_search',
  detalhe: '.product-information',
  modalCarrinho: '#cartModal',
};

function verificarPaginaTodosProdutos() {
  cy.url().should('include', '/products');
  cy.get(seletores.titulo).invoke('text').should('match', /all products/i);
}

function verificarListaProdutosVisivel() {
  cy.get(seletores.cardProduto).should('have.length.greaterThan', 0).first().should('be.visible');
}

function abrirDetalheDoPrimeiroProduto() {
  cy.get(seletores.cardProduto).first().find(seletores.linkVerProduto).click();
  cy.url().should('match', /\/product_details\/\d+/);
}

function verificarDetalheProduto() {
  cy.get(seletores.detalhe).within(() => {
    cy.get('h2').should('not.be.empty');
    cy.contains('p', 'Category:').should('be.visible');
    cy.get('span > span').invoke('text').should('match', /Rs\.\s*\d+/);
    cy.contains('p', 'Availability:').should('be.visible');
    cy.contains('p', 'Condition:').should('be.visible');
    cy.contains('p', 'Brand:').should('be.visible');
  });
}

function pesquisarProduto(termo) {
  cy.get(seletores.campoBusca).type(termo);
  cy.get(seletores.botaoBusca).click();
}

function verificarResultadoPesquisa(termo) {
  cy.get(seletores.titulo).invoke('text').should('match', /searched products/i);
  cy.get(seletores.nomeProduto)
    .should('have.length.greaterThan', 0)
    .each(($nome) => {
      expect($nome.text().toLowerCase()).to.include(termo.toLowerCase());
    });
}

function adicionarProdutosAoCarrinho(quantidade) {
  const nomes = [];

  Cypress._.times(quantidade, (indice) => {
    cy.get(seletores.cardProduto)
      .eq(indice)
      .find('.productinfo p')
      .invoke('text')
      .then((nome) => nomes.push(nome.trim()));

    cy.get(seletores.cardProduto).eq(indice).find('.productinfo .add-to-cart').click({ force: true });

    cy.get(seletores.modalCarrinho).should('be.visible');
    cy.contains(`${seletores.modalCarrinho} button`, 'Continue Shopping').click();
    cy.get(seletores.modalCarrinho).should('not.be.visible');
  });

  return cy.wrap(nomes);
}

module.exports = {
  verificarPaginaTodosProdutos,
  verificarListaProdutosVisivel,
  abrirDetalheDoPrimeiroProduto,
  verificarDetalheProduto,
  pesquisarProduto,
  verificarResultadoPesquisa,
  adicionarProdutosAoCarrinho,
};
