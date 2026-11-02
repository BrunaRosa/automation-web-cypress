function lerCorpo(resposta) {
  return typeof resposta.body === 'string' ? JSON.parse(resposta.body) : resposta.body;
}

function criarConta(usuario) {
  cy.request({
    method: 'POST',
    url: '/api/createAccount',
    form: true,
    body: {
      name: usuario.nome,
      email: usuario.email,
      password: usuario.senha,
      title: usuario.titulo,
      birth_date: usuario.diaNascimento,
      birth_month: usuario.mesNascimento,
      birth_year: usuario.anoNascimento,
      firstname: usuario.primeiroNome,
      lastname: usuario.sobrenome,
      company: usuario.empresa,
      address1: usuario.endereco,
      address2: usuario.endereco2,
      country: usuario.pais,
      zipcode: usuario.cep,
      state: usuario.estado,
      city: usuario.cidade,
      mobile_number: usuario.celular,
    },
  }).then((resposta) => {
    const corpo = lerCorpo(resposta);
    expect(corpo.responseCode, `criar conta: ${corpo.message}`).to.eq(201);
  });
}

function excluirConta(usuario) {
  cy.request({
    method: 'DELETE',
    url: '/api/deleteAccount',
    form: true,
    body: { email: usuario.email, password: usuario.senha },
    failOnStatusCode: false,
  });
}

module.exports = { criarConta, excluirConta };
