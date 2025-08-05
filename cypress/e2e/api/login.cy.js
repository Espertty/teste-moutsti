/// <reference types="cypress" />

describe('API - Login', () => {
  const api = Cypress.env('apiUrl') || 'https://serverest.dev';

  it('Deve autenticar com sucesso e retornar token', () => {
    cy.request('POST', `${api}/login`, {
      email: Cypress.env('adminEmail') || 'fulano@qa.com',
      password: Cypress.env('adminSenha') || 'teste',
    }).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body.message).to.include('Login realizado com sucesso');
      expect(res.body).to.have.property('authorization');
    });
  });

  it('Não deve autenticar com senha inválida', () => {
    cy.request({
      method: 'POST',
      url: `${api}/login`,
      failOnStatusCode: false,
      body: {
        email: Cypress.env('adminEmail') || 'fulano@qa.com',
        password: 'senhaErrada',
      },
    }).then((res) => {
      expect(res.status).to.be.oneOf([400, 401]);
      expect(res.body).to.have.property('message');
    });
  });
});
