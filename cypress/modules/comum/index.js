const { faker } = require('@faker-js/faker');

function gerarEmailUnico(prefixo = 'qa') {
  return `${prefixo}.${Date.now()}.${faker.string.alphanumeric(6).toLowerCase()}@example.com`;
}

module.exports = { gerarEmailUnico };
