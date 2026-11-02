const seletores = {
  tituloAssinatura: '#footer .single-widget h2',
  email: '#susbscribe_email',
  botaoAssinar: '#subscribe',
  mensagemSucesso: '#success-subscribe',
};

function rolarAteAssinatura() {
  cy.get(seletores.tituloAssinatura).scrollIntoView();
}

function verificarTituloAssinatura() {
  cy.get(seletores.tituloAssinatura).should('be.visible').invoke('text').should('match', /subscription/i);
}

function assinarNewsletter(email) {
  cy.get(seletores.email).type(email);
  cy.get(seletores.botaoAssinar).click();
}

function verificarAssinaturaRealizada() {
  cy.get(seletores.mensagemSucesso)
    .should('be.visible')
    .and('contain.text', 'You have been successfully subscribed!');
}

module.exports = {
  rolarAteAssinatura,
  verificarTituloAssinatura,
  assinarNewsletter,
  verificarAssinaturaRealizada,
};
