const home = require('../modules/home');
const rodape = require('../modules/rodape');
const { gerarEmailUnico } = require('../modules/comum');

describe('Newsletter', () => {
  it('TC10 - Verificar inscrição (subscription) na home', () => {
    home.acessarHome();
    home.verificarHomeVisivel();

    rodape.rolarAteAssinatura();
    rodape.verificarTituloAssinatura();
    rodape.assinarNewsletter(gerarEmailUnico('newsletter'));

    rodape.verificarAssinaturaRealizada();
  });
});
