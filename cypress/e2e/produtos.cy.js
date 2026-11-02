const home = require('../modules/home');
const menu = require('../modules/menu');
const produto = require('../modules/produto');

describe('Produtos', () => {
  beforeEach(() => {
    home.acessarHome();
    home.verificarHomeVisivel();
    menu.acessarProdutos();
    produto.verificarPaginaTodosProdutos();
  });

  it('TC08 - Verificar todos os produtos e a página de detalhes', () => {
    produto.verificarListaProdutosVisivel();

    produto.abrirDetalheDoPrimeiroProduto();

    produto.verificarDetalheProduto();
  });

  it('TC09 - Pesquisar produto', () => {
    cy.fixture('busca').then(({ termo }) => {
      produto.pesquisarProduto(termo);

      produto.verificarResultadoPesquisa(termo);
    });
  });
});
