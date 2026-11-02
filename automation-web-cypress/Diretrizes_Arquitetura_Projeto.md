# Diretrizes de arquitetura do projeto

Regras seguidas neste projeto (derivadas das aulas 5 a 9).

1. **Modularização por funcionalidade**: `cypress/modules/<funcionalidade>/index.js`, exportando funções nomeadas com `module.exports` e importadas nas specs com `require`.
2. **Nomenclatura em português** para funções expostas (`efetuarLogin`, `iniciarCadastro`, `verificarContaCriada`...).
3. **Seletores** ficam no próprio módulo, agrupados em uma constante chamada `seletores`; nada de seletores nas specs.
4. **Seletores estáveis**: preferir `data-qa`; sem `nth-child` ou seletores posicionais; reduzir o escopo antes de usar `cy.contains`.
5. **Asserções** ficam nos módulos (`verificar...`); as specs descrevem apenas o fluxo e a intenção.
6. **Granularidade**: uma função por intenção do usuário, não uma por micro-interação.
7. **Dados**: gerados dinamicamente com faker (`modules/dados`); dados estáticos em `cypress/fixtures`; utilitários genéricos em `modules/comum`.
8. **Independência entre testes**: pré-condições (ex.: conta de usuário) criadas via API (`modules/api`) e removidas em `afterEach`; nenhum teste depende de outro.
9. **Fluxos de negócio reutilizáveis** (Workflow/Facade) em `modules/fluxos`.
10. **Configuração**: `baseUrl` no `cypress.config.js` e `cy.visit('/')` com caminhos relativos; retries só no `run` (CI).
11. **Comandos customizados**: usados com parcimônia (nenhum necessário neste projeto).
