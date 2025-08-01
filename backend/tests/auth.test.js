const request = require('supertest');
const express = require('express');
const app = require('../src/index'); // make sure you export your Express app

describe('Auth Routes', () => {
  let userEmail = `test${Date.now()}@mail.com`;

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        name: 'Test User',
        email: userEmail,
        password: 'x',
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Registered successfully');
  });

  it('should login with correct credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: userEmail,
        password: 'x',
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
