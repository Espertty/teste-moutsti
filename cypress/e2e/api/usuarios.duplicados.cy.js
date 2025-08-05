/// <reference types="cypress" />

describe('API - Cadastro de e-mail duplicado', () => {
  it('Deve retornar erro ao tentar cadastrar um e-mail já existente', () => {
    const api = Cypress.env('apiUrl') || 'https://serverest.dev';
    const email = `duplicado_${Date.now()}@teste.com`;

    
    cy.request('POST', `${api}/usuarios`, {
      nome: 'Usuário Original',
      email,
      password: '123456',
      administrador: 'false',
    }).then((res1) => {
      expect(res1.status).to.be.oneOf([200, 201]);

      
      cy.request({
        method: 'POST',
        url: `${api}/usuarios`,
        body: {
          nome: 'Usuário Duplicado',
          email,
          password: '123456',
          administrador: 'false',
        },
        failOnStatusCode: false, 
      }).then((res2) => {
        expect(res2.status).to.eq(400);
        expect(res2.body).to.have.property('message');
      });
    });
  });
});
