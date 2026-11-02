const seletores = {
  menu: '#header',
  linkLoginCadastro: '#header a[href="/login"]',
  linkProdutos: '#header a[href="/products"]',
  linkCarrinho: '#header a[href="/view_cart"]',
  linkLogout: '#header a[href="/logout"]',
  linkExcluirConta: '#header a[href="/delete_account"]',
};

function acessarLoginCadastro() {
  cy.get(seletores.linkLoginCadastro).click();
}

function acessarProdutos() {
  cy.get(seletores.linkProdutos).click();
}

function acessarCarrinho() {
  cy.get(seletores.linkCarrinho).click();
}

function efetuarLogout() {
  cy.get(seletores.linkLogout).click();
}

function clicarExcluirConta() {
  cy.get(seletores.linkExcluirConta).click();
}

function verificarUsuarioLogado(nome) {
  cy.contains(`${seletores.menu} a`, 'Logged in as').find('b').should('have.text', nome);
}

module.exports = {
  acessarLoginCadastro,
  acessarProdutos,
  acessarCarrinho,
  efetuarLogout,
  clicarExcluirConta,
  verificarUsuarioLogado,
};
