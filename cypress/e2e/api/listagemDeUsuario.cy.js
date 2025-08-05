/// <reference types="cypress" />

import Joi from 'joi';

describe('API - Listagem de Usuários', () => {
  it('Deve retornar lista de usuários com contrato válido', () => {
    const api = Cypress.env('apiUrl') || 'https://serverest.dev';

    // Schema Joi para cada usuário
    const usuarioSchema = Joi.object({
      nome: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().optional(),
      administrador: Joi.string().valid('true', 'false').required(),
      _id: Joi.string().required(),
    });

    // Schema para a resposta da listagem
    const respostaSchema = Joi.object({
      quantidade: Joi.number().integer().min(1).required(),
      usuarios: Joi.array().items(usuarioSchema).required(),
    });

    cy.request('GET', `${api}/usuarios`).then((res) => {
      expect(res.status).to.eq(200);
      const validacao = respostaSchema.validate(res.body, { abortEarly: false });
      expect(validacao.error, 'contrato da resposta').to.be.undefined;
    });
  });
});
