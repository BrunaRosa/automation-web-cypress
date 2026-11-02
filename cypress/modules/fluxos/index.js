const menu = require('../menu');
const produto = require('../produto');
const carrinho = require('../carrinho');
const checkout = require('../checkout');

function realizarCompra(usuario, cartao, quantidadeProdutos = 2) {
  menu.acessarProdutos();
  produto.verificarPaginaTodosProdutos();

  produto.adicionarProdutosAoCarrinho(quantidadeProdutos).then((nomes) => {
    menu.acessarCarrinho();
    carrinho.verificarPaginaCarrinho();
    carrinho.verificarProdutosNoCarrinho(nomes);
    carrinho.avancarParaCheckout();

    checkout.verificarEnderecoEResumoDoPedido(usuario, nomes);
    checkout.informarComentarioEFazerPedido('Pedido gerado por teste automatizado.');
    checkout.preencherPagamento(cartao);
    checkout.confirmarPagamento();
    checkout.verificarPedidoRealizado();
  });
}

module.exports = { realizarCompra };
