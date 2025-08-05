const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://front.serverest.dev',
  },
  env: {
    apiURL: 'https://serverest.dev/',
    email: 'fulano@qa.com',
    password: 'teste'
  }
});
