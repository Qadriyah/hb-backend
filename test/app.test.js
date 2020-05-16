import { expect } from 'chai';
import request from 'supertest';
import { describe, it } from 'mocha';
import app from '../server';

describe('Test routes that do not exist', () => {
  it('should throw an error if endpoint does not exist', (done) => {
    request(app)
      .post('/api/register')
      .send({})
      .set('Accept', 'application/json')
      .expect(404)
      .then((res) => {
        expect(res.body.msg).to.equal('Not Found');
      });
    done();
  });
});
