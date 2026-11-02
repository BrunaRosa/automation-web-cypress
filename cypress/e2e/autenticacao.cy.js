const home = require('../modules/home');
const menu = require('../modules/menu');
const login = require('../modules/login');
const cadastro = require('../modules/cadastro');
const api = require('../modules/api');
const { gerarUsuario } = require('../modules/dados');

describe('Cadastro e autenticação', () => {
  let usuario;

  beforeEach(() => {
    usuario = gerarUsuario();
    home.acessarHome();
    home.verificarHomeVisivel();
  });

  afterEach(() => {
    api.excluirConta(usuario);
  });

  it('TC01 - Registrar usuário', () => {
    menu.acessarLoginCadastro();
    cadastro.verificarFormularioNovoUsuarioVisivel();
    cadastro.iniciarCadastro(usuario.nome, usuario.email);

    cadastro.verificarFormularioDadosContaVisivel();
    cadastro.preencherCadastro(usuario);
    cadastro.criarConta();
    cadastro.verificarContaCriada();
    cadastro.clicarContinuar();

    menu.verificarUsuarioLogado(usuario.nome);

    cadastro.excluirConta();
    cadastro.verificarContaExcluida();
    cadastro.clicarContinuar();
  });

  it('TC03 - Login com e-mail e senha incorretos', () => {
    menu.acessarLoginCadastro();
    login.verificarFormularioLoginVisivel();

    login.efetuarLogin(usuario.email, usuario.senha);

    login.verificarErroCredenciaisInvalidas();
  });

  context('com usuário previamente cadastrado (via API)', () => {
    beforeEach(() => {
      api.criarConta(usuario);
    });

    it('TC02 - Login com e-mail e senha corretos', () => {
      menu.acessarLoginCadastro();
      login.verificarFormularioLoginVisivel();

      login.efetuarLogin(usuario.email, usuario.senha);
      menu.verificarUsuarioLogado(usuario.nome);

      cadastro.excluirConta();
      cadastro.verificarContaExcluida();
    });

    it('TC04 - Logout de usuário', () => {
      menu.acessarLoginCadastro();
      login.efetuarLogin(usuario.email, usuario.senha);
      menu.verificarUsuarioLogado(usuario.nome);

      menu.efetuarLogout();

      login.verificarRetornoParaPaginaLogin();
    });

    it('TC05 - Registrar usuário com e-mail já existente', () => {
      menu.acessarLoginCadastro();
      cadastro.verificarFormularioNovoUsuarioVisivel();

      cadastro.iniciarCadastro('Outro Nome', usuario.email);

      cadastro.verificarErroEmailExistente();
    });
  });
});
