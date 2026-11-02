const menu = require('../menu');

const seletores = {
  tituloNovoUsuario: '.signup-form h2',
  nome: '[data-qa="signup-name"]',
  email: '[data-qa="signup-email"]',
  botaoSignup: '[data-qa="signup-button"]',
  mensagemErro: '.signup-form p',
  tituloDadosConta: '.login-form h2.title',
  generoMasculino: '#id_gender1',
  generoFeminino: '#id_gender2',
  nomeConta: '[data-qa="name"]',
  senha: '[data-qa="password"]',
  dia: '[data-qa="days"]',
  mes: '[data-qa="months"]',
  ano: '[data-qa="years"]',
  newsletter: '#newsletter',
  ofertas: '#optin',
  primeiroNome: '[data-qa="first_name"]',
  sobrenome: '[data-qa="last_name"]',
  empresa: '[data-qa="company"]',
  endereco: '[data-qa="address"]',
  endereco2: '[data-qa="address2"]',
  pais: '[data-qa="country"]',
  estado: '[data-qa="state"]',
  cidade: '[data-qa="city"]',
  cep: '[data-qa="zipcode"]',
  celular: '[data-qa="mobile_number"]',
  botaoCriarConta: '[data-qa="create-account"]',
  contaCriada: '[data-qa="account-created"]',
  contaExcluida: '[data-qa="account-deleted"]',
  botaoContinuar: '[data-qa="continue-button"]',
};

function verificarFormularioNovoUsuarioVisivel() {
  cy.get(seletores.tituloNovoUsuario).should('be.visible').and('have.text', 'New User Signup!');
}

function iniciarCadastro(nome, email) {
  cy.get(seletores.nome).type(nome);
  cy.get(seletores.email).type(email);
  cy.get(seletores.botaoSignup).click();
}

function verificarErroEmailExistente() {
  cy.get(seletores.mensagemErro).should('be.visible').and('have.text', 'Email Address already exist!');
}

function verificarFormularioDadosContaVisivel() {
  cy.get(seletores.tituloDadosConta).invoke('text').should('match', /enter account information/i);
}

function preencherCadastro(usuario) {
  cy.get(usuario.titulo === 'Mr' ? seletores.generoMasculino : seletores.generoFeminino).check();
  cy.get(seletores.nomeConta).clear().type(usuario.nome);
  cy.get(seletores.senha).type(usuario.senha, { log: false });
  cy.get(seletores.dia).select(usuario.diaNascimento);
  cy.get(seletores.mes).select(usuario.mesNascimento);
  cy.get(seletores.ano).select(usuario.anoNascimento);
  cy.get(seletores.newsletter).check();
  cy.get(seletores.ofertas).check();

  cy.get(seletores.primeiroNome).type(usuario.primeiroNome);
  cy.get(seletores.sobrenome).type(usuario.sobrenome);
  cy.get(seletores.empresa).type(usuario.empresa);
  cy.get(seletores.endereco).type(usuario.endereco);
  cy.get(seletores.endereco2).type(usuario.endereco2);
  cy.get(seletores.pais).select(usuario.pais);
  cy.get(seletores.estado).type(usuario.estado);
  cy.get(seletores.cidade).type(usuario.cidade);
  cy.get(seletores.cep).type(usuario.cep);
  cy.get(seletores.celular).type(usuario.celular);
}

function criarConta() {
  cy.get(seletores.botaoCriarConta).click();
}

function verificarContaCriada() {
  cy.get(seletores.contaCriada).invoke('text').should('match', /account created!/i);
}

function clicarContinuar() {
  cy.get(seletores.botaoContinuar).click();
}

function excluirConta() {
  menu.clicarExcluirConta();
}

function verificarContaExcluida() {
  cy.get(seletores.contaExcluida).invoke('text').should('match', /account deleted!/i);
}

module.exports = {
  verificarFormularioNovoUsuarioVisivel,
  iniciarCadastro,
  verificarErroEmailExistente,
  verificarFormularioDadosContaVisivel,
  preencherCadastro,
  criarConta,
  verificarContaCriada,
  clicarContinuar,
  excluirConta,
  verificarContaExcluida,
};
