const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'reports',
    reportPageTitle: 'Automation Exercise - Relatório de Testes',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
  },
  e2e: {
    baseUrl: process.env.BASE_URL || 'https://automationexercise.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    video: false,
    screenshotOnRunFailure: true,
    retries: { runMode: 2, openMode: 0 },
    setupNodeEvents(on) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});
