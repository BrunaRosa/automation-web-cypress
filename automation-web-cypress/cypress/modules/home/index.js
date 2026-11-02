const seletores = {
  slider: '#slider',
};

function acessarHome() {
  cy.visit('/');
}

function verificarHomeVisivel() {
  cy.title().should('eq', 'Automation Exercise');
  cy.get(seletores.slider).should('be.visible');
}

module.exports = { acessarHome, verificarHomeVisivel };
