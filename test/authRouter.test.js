import { expect } from 'chai';
import { describe, it } from 'mocha';
import request from 'supertest';
import app from '../server';

describe('Test user authentication', () => {
  const credentials = {
    username: 'Baker',
    password: '123456',
  };

  it('should authenticate a user successfully', (done) => {
    request(app)
      .post('/api/auth')
      .send(credentials)
      .set('Accept', 'application/json')
      .expect(200)
      .then((res) => {
        const { msg } = res.body;
        expect(msg).to.equal('Success');
      });
    done();
  });

  it('should not authenticate user without a username', (done) => {
    request(app)
      .post('/api/auth')
      .send({ password: '123456' })
      .set('Accept', 'application/json')
      .expect(400)
      .then((res) => {
        const { error } = res.body;
        expect(error).to.equal('username is required');
      });
    done();
  });

  it('should not authenticate user without a password', (done) => {
    request(app)
      .post('/api/auth')
      .send({ username: 'Baker' })
      .set('Accept', 'application/json')
      .expect(400)
      .then((res) => {
        const { error } = res.body;
        expect(error).to.equal('password is required');
      });
    done();
  });
});
