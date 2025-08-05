/// <reference types="cypress" />

describe('Login - Frontend', () => {
  it('Deve realizar login com sucesso e redirecionar para a página de administração', () => {
    cy.visit('/login');

    cy.intercept('POST', '**/login').as('loginReq');

    cy.get('input[name="email"]').type('fulano@qa.com');
    cy.get('input[name="password"]').type('teste');
    cy.get('[data-testid="entrar"]').click();

    cy.wait('@loginReq').its('response.statusCode').should('eq', 200);

    cy.url({ timeout: 10000 }).should('include', '/admin');
    cy.get('[data-testid="logout"]', { timeout: 10000 }).should('be.visible');
  });
});
