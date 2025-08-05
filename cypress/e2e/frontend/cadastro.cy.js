/// <reference types="cypress" />

import { faker } from '@faker-js/faker';

describe('Cadastro de Usuário - Frontend', () => {
  it('Deve cadastrar um novo usuário com sucesso (marcando administrador)', () => {
    
    const nome = faker.person.fullName();
    const email = faker.internet.email(nome).toLowerCase();
    const senha = '123456';

    
    cy.visit('/cadastrarusuarios');

    
    cy.get('input[name="nome"]').should('be.visible').type(nome);
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(senha);

    
    cy.contains('label', /cadastrar como administrador/i, { timeout: 10000 })
      .click({ force: true });

    
    cy.get('input[type="checkbox"][name="administrador"]', { timeout: 10000 })
      .should('be.checked')
      .then(($cb) => {
        // 5) Envia o formulário
        cy.get('[data-testid="cadastrar"]').click();
      });

    
    
    cy.url({ timeout: 10000 }).should('include', '/admin'); 

    cy.contains(/Este é seu sistema para administrar seu ecommerce./i, { timeout: 10000 }).should('be.visible');
  });
});
