import 'cypress-mochawesome-reporter/register';

const DOMINIOS_BLOQUEADOS =
  /(googlesyndication|doubleclick|googleadservices|googletagmanager|google-analytics|adservice\.google|fundingchoicesmessages|pagead2)/;

beforeEach(() => {
  cy.intercept({ url: DOMINIOS_BLOQUEADOS }, { statusCode: 204, body: '' });
});

Cypress.on('uncaught:exception', () => false);
