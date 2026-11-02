const seletores = {
  enderecoEntrega: '#address_delivery',
  enderecoCobranca: '#address_invoice',
  nomesProdutos: '#cart_info .cart_description h4 a',
  comentario: 'textarea[name="message"]',
  botaoFazerPedido: 'a[href="/payment"]',
  nomeCartao: '[data-qa="name-on-card"]',
  numeroCartao: '[data-qa="card-number"]',
  cvc: '[data-qa="cvc"]',
  mesExpiracao: '[data-qa="expiry-month"]',
  anoExpiracao: '[data-qa="expiry-year"]',
  botaoPagar: '[data-qa="pay-button"]',
  pedidoRealizado: '[data-qa="order-placed"]',
};

function verificarEnderecoEResumoDoPedido(usuario, nomesEsperados) {
  [seletores.enderecoEntrega, seletores.enderecoCobranca].forEach((bloco) => {
    cy.get(bloco).should('be.visible').within(() => {
      [
        usuario.primeiroNome,
        usuario.sobrenome,
        usuario.empresa,
        usuario.endereco,
        usuario.endereco2,
        usuario.cidade,
        usuario.estado,
        usuario.cep,
        usuario.pais,
        usuario.celular,
      ].forEach((valor) => cy.contains(valor).should('exist'));
    });
  });

  cy.get(seletores.nomesProdutos)
    .should('have.length', nomesEsperados.length)
    .then(($links) => {
      const nomes = [...$links].map((el) => el.innerText.trim());
      nomesEsperados.forEach((nome) => expect(nomes).to.include(nome));
    });
}

function informarComentarioEFazerPedido(comentario) {
  cy.get(seletores.comentario).type(comentario);
  cy.contains(seletores.botaoFazerPedido, 'Place Order').click();
}

function preencherPagamento(cartao) {
  cy.get(seletores.nomeCartao).type(cartao.nomeNoCartao);
  cy.get(seletores.numeroCartao).type(cartao.numero);
  cy.get(seletores.cvc).type(cartao.cvc);
  cy.get(seletores.mesExpiracao).type(cartao.mesExpiracao);
  cy.get(seletores.anoExpiracao).type(cartao.anoExpiracao);
}

function confirmarPagamento() {
  cy.get(seletores.botaoPagar).click();
}

function verificarPedidoRealizado() {
  cy.url().should('include', '/payment_done');
  cy.get(seletores.pedidoRealizado).invoke('text').should('match', /order placed!/i);
  cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');
}

module.exports = {
  verificarEnderecoEResumoDoPedido,
  informarComentarioEFazerPedido,
  preencherPagamento,
  confirmarPagamento,
  verificarPedidoRealizado,
};
