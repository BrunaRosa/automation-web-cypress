# Automation Exercise – Testes E2E com Cypress

Trabalho de conclusão da disciplina *Automação de Testes na Camada de Interface (Web)* (PGATS3). Automatiza os casos **1, 2, 3, 4, 5, 8, 9, 10, 15 e 16** da página [Test Cases](https://www.automationexercise.com/test_cases) do site [Automation Exercise](https://www.automationexercise.com).

## Cobertura

| Caso | Cenário | Spec |
|------|---------|------|
| TC01 | Registrar usuário | `cypress/e2e/autenticacao.cy.js` |
| TC02 | Login com e-mail e senha corretos | `cypress/e2e/autenticacao.cy.js` |
| TC03 | Login com e-mail e senha incorretos | `cypress/e2e/autenticacao.cy.js` |
| TC04 | Logout | `cypress/e2e/autenticacao.cy.js` |
| TC05 | Registrar usuário com e-mail existente | `cypress/e2e/autenticacao.cy.js` |
| TC08 | Todos os produtos e página de detalhes | `cypress/e2e/produtos.cy.js` |
| TC09 | Pesquisar produto | `cypress/e2e/produtos.cy.js` |
| TC10 | Subscription na home | `cypress/e2e/subscription.cy.js` |
| TC15 | Pedido: registrar antes do checkout | `cypress/e2e/checkout.cy.js` |
| TC16 | Pedido: login antes do checkout | `cypress/e2e/checkout.cy.js` |

## Como executar

Pré-requisito: Node.js 18+.

```bash
npm install
npm run cy:open     # modo interativo
npm test            # headless (Electron)
npm run cy:run      # headless no Chrome
npx cypress run --spec "cypress/e2e/produtos.cy.js"   # uma spec
```

Outro ambiente: `BASE_URL=https://... npm test`.

## Relatório

Usa `cypress-mochawesome-reporter`. Ao final de `cypress run`, o relatório HTML fica em `reports/html/index.html` (resumo, gráficos, tempos, stack traces e screenshots embutidos nas falhas).

## GitHub Actions

`.github/workflows/cypress.yml` executa em `push`, `pull_request` e manualmente (`workflow_dispatch`): instala dependências, roda a suíte no Chrome e publica como artefatos o **relatório HTML** (`relatorio-html`) e, em caso de falha, os **screenshots**. Para ver: aba *Actions* → execução → *Artifacts*.

## Arquitetura

```
cypress/
  e2e/          specs (somente fluxo/intenção, sem seletores e sem asserções diretas)
  fixtures/     dados estáticos (pagamento.json, busca.json)
  modules/
    api/        criar/excluir conta via API (setup/teardown)
    cadastro/ login/ menu/ home/ produto/ carrinho/ checkout/ rodape/
    fluxos/     fluxo reutilizável de compra (Workflow/Facade)
    dados/      Data Builder de usuário (faker)
    comum/      utilitários genéricos
  support/e2e.js  reporter, bloqueio de anúncios, tratamento de exceções de terceiros
Diretrizes_Arquitetura_Projeto.md
```

Boas práticas aplicadas: seletores `data-qa` e escopo reduzido (sem `nth-child`), dados dinâmicos com faker, `baseUrl` + caminhos relativos, testes independentes (conta criada via API e removida em `afterEach`), retries apenas em CI e módulos por funcionalidade conforme as diretrizes da disciplina.

## Observações sobre os casos

- **TC15/TC16**: o alerta "Your order has been placed successfully!" aparece só por instantes antes do redirecionamento para `/payment_done`. O teste valida a página final ("Order Placed!" e "Congratulations! Your order has been confirmed!").
- **TC09**: busca pelo termo `Top` (em `fixtures/busca.json`), validando que todos os resultados contêm o termo no nome.
- **TC02, 04, 05, 16**: a conta é criada por teste via API (`/api/createAccount`), evitando dependência entre cenários e conta fixa.
- **Adicionar ao carrinho**: o botão fica sob um overlay que só aparece em `:hover`, por isso o clique usa `{ force: true }`.
