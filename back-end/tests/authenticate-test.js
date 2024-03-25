import {
  describe,
  it,
  after,
} from 'mocha';
import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import dbInstance from '../utils/db';
import app from '../server';
/* module to test authentication */

use(chaiHttp);
describe('test the authentications', () => {
  it('test post: /register', async () => {
    const data = { email: 'ahmedelsaeed105@gmail.com', password: '123456' };
    const response = await request(app).post('/register').send(data);
    expect(response.statusCode).to.be.equal(201);
    expect(response.body).to.deep.equal({ message: 'user got registered' });
  });

  it('test post: /register { errors }', async () => {
    // test inserting same email
    let data = { email: 'ahmedelsaeed105@gmail.com', password: '123456' };
    let response = await request(app).post('/register').send(data);
    expect(response.statusCode).to.be.equal(400);
    expect(response.body).to.deep.equal({ error: 'Email already exists' });

    // test missing password
    data = { email: 'ahmedelsaeed105@gmail.com' };
    response = await request(app).post('/register').send(data);
    expect(response.statusCode).to.be.equal(400);
    expect(response.body).to.deep.equal({ error: 'Missing password' });

    // test missing email
    data = { password: '123456' };
    response = await request(app).post('/register').send(data);
    expect(response.statusCode).to.be.equal(400);
    expect(response.body).to.deep.equal({ error: 'Missing email' });
  });

  it('test post: /login', async () => {
    const data = { email: 'ahmedelsaeed105@gmail.com', password: '123456' };
    const response = await request(app).post('/login').send(data);
    expect(response.statusCode).to.be.equal(200);
    expect(response.body.message).to.be.equal('user got logged in');
  });

  it('test post: /login {errors}', async () => {
    // case missing password
    let data = { email: 'ahmedelsaeed105@gmail.com' };
    let response = await request(app).post('/login').send(data);
    expect(response.statusCode).to.be.equal(400);
    expect(response.body).to.deep.equal({ error: 'Missing password' });

    // missing email
    data = { password: '123456' };
    response = await request(app).post('/login').send(data);
    expect(response.statusCode).to.be.equal(400);
    expect(response.body).to.deep.equal({ error: 'Missing email' });

    // incorrect password
    data = { email: 'ahmedelsaeed105@gmail.com', password: '58789' };
    response = await request(app).post('/login').send(data);
    expect(response.statusCode).to.be.equal(404);
    expect(response.body).to.deep.equal({ error: 'user is either not registered or incorrect password' });
  });

  /*
   * @after: after hook to delete created
   * user for the sake of the test
   *
   */
  after(async () => {
    await dbInstance.db.collection('users').deleteOne({ email: 'ahmedelsaeed105@gmail.com' });
  });
});
