const seletores = {
  tabelaCarrinho: '#cart_info',
  nomesProdutos: '#cart_info_table .cart_description h4 a',
  botaoCheckout: '.check_out',
};

function verificarPaginaCarrinho() {
  cy.url().should('include', '/view_cart');
  cy.get(seletores.tabelaCarrinho).should('be.visible');
}

function verificarProdutosNoCarrinho(nomesEsperados) {
  cy.get(seletores.nomesProdutos)
    .should('have.length', nomesEsperados.length)
    .then(($links) => {
      const nomes = $links.toArray().map((el) => el.innerText.trim());
      nomesEsperados.forEach((nome) => expect(nomes).to.include(nome));
    });
}

function avancarParaCheckout() {
  cy.contains(seletores.botaoCheckout, 'Proceed To Checkout').click();
}

module.exports = {
  verificarPaginaCarrinho,
  verificarProdutosNoCarrinho,
  avancarParaCheckout,
};
