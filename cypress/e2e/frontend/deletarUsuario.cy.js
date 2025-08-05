/// <reference types="cypress" />

describe('Excluir primeiro usuário da lista após login', () => {
  it('Deve realizar login, acessar a lista de usuários e excluir o primeiro registro', () => {
    const email = Cypress.env('email');
    const senha = Cypress.env('senha');

    // 1) Login
    cy.visit('/login');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(senha);
    cy.get('[data-testid="entrar"]').click();

    cy.url({ timeout: 10000 }).should('include', '/admin');
    cy.get('[data-testid="logout"]').should('be.visible');

    cy.get('[data-testid="listarUsuarios"]').click();

    cy.get('tbody tr', { timeout: 10000 }).should('have.length.greaterThan', 0);

    cy.get(':nth-child(1) > :nth-child(5) > .row > .btn-danger').click();
  });
});
