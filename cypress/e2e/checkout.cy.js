const home = require('../modules/home');
const menu = require('../modules/menu');
const login = require('../modules/login');
const cadastro = require('../modules/cadastro');
const fluxos = require('../modules/fluxos');
const api = require('../modules/api');
const { gerarUsuario } = require('../modules/dados');

describe('Finalização de pedido', () => {
  let usuario;

  beforeEach(() => {
    usuario = gerarUsuario();
    home.acessarHome();
    home.verificarHomeVisivel();
  });

  afterEach(() => {
    api.excluirConta(usuario);
  });

  it('TC15 - Fazer pedido: registrar antes do checkout', () => {
    menu.acessarLoginCadastro();
    cadastro.iniciarCadastro(usuario.nome, usuario.email);
    cadastro.preencherCadastro(usuario);
    cadastro.criarConta();
    cadastro.verificarContaCriada();
    cadastro.clicarContinuar();
    menu.verificarUsuarioLogado(usuario.nome);

    cy.fixture('pagamento').then((cartao) => fluxos.realizarCompra(usuario, cartao));

    cadastro.excluirConta();
    cadastro.verificarContaExcluida();
    cadastro.clicarContinuar();
  });

  it('TC16 - Fazer pedido: login antes do checkout', () => {
    api.criarConta(usuario);

    menu.acessarLoginCadastro();
    login.efetuarLogin(usuario.email, usuario.senha);
    menu.verificarUsuarioLogado(usuario.nome);

    cy.fixture('pagamento').then((cartao) => fluxos.realizarCompra(usuario, cartao));

    cadastro.excluirConta();
    cadastro.verificarContaExcluida();
    cadastro.clicarContinuar();
  });
});
