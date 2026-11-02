const { faker } = require('@faker-js/faker');
const { gerarEmailUnico } = require('../comum');

function gerarUsuario() {
  const nome = faker.person.firstName();
  const sobrenome = faker.person.lastName();

  return {
    titulo: 'Mr',
    nome: `QA ${nome}`,
    email: gerarEmailUnico(),
    senha: faker.internet.password({ length: 12 }),
    diaNascimento: '15',
    mesNascimento: 'May',
    anoNascimento: '1990',
    primeiroNome: nome,
    sobrenome,
    empresa: faker.company.name(),
    endereco: faker.location.streetAddress(),
    endereco2: faker.location.secondaryAddress(),
    pais: 'Canada',
    estado: faker.location.state(),
    cidade: faker.location.city(),
    cep: faker.string.numeric(5),
    celular: faker.string.numeric(10),
  };
}

module.exports = { gerarUsuario };
