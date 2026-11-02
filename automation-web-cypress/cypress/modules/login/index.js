const seletores = {
  tituloLogin: '.login-form h2',
  email: '[data-qa="login-email"]',
  senha: '[data-qa="login-password"]',
  botaoLogin: '[data-qa="login-button"]',
  mensagemErro: '.login-form p',
};

function verificarFormularioLoginVisivel() {
  cy.get(seletores.tituloLogin).should('be.visible').and('have.text', 'Login to your account');
}

function efetuarLogin(email, senha) {
  cy.get(seletores.email).type(email);
  cy.get(seletores.senha).type(senha, { log: false });
  cy.get(seletores.botaoLogin).click();
}

function verificarErroCredenciaisInvalidas() {
  cy.get(seletores.mensagemErro)
    .should('be.visible')
    .and('have.text', 'Your email or password is incorrect!');
}

function verificarRetornoParaPaginaLogin() {
  cy.url().should('include', '/login');
  verificarFormularioLoginVisivel();
}

module.exports = {
  verificarFormularioLoginVisivel,
  efetuarLogin,
  verificarErroCredenciaisInvalidas,
  verificarRetornoParaPaginaLogin,
};
