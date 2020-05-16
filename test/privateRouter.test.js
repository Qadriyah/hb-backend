import { expect } from 'chai';
import { describe, it } from 'mocha';
import request from 'supertest';
import app from '../server';

const authUser = async (data) => {
  return await request(app)
    .post('/api/auth')
    .send(data)
    .set('Accept', 'application/json');
};

describe('Test private routes', () => {
  const data = {
    document: {
      username: 'Baker',
      password: '123456',
    },
    patch: [{ op: 'add', path: '/name', value: 'Baker Sekitoleko' }],
  };
  const credentials = {
    username: 'Baker',
    password: '123456',
  };

  it('should patch a json object successfully', async () => {
    const auth = await authUser(credentials);
    const { token } = auth.body;
    const res = await request(app)
      .patch('/api/private/patch')
      .send(data)
      .set({ Accept: 'application/json', Authorization: `Bearer ${token}` });
    expect(res.statusCode).to.equal(201);
    expect(res.body.document).to.have.property('name');
  });

  it('should fail without a document', async () => {
    const auth = await authUser(credentials);
    const { token } = auth.body;
    const res = await request(app)
      .patch('/api/private/patch')
      .send({
        patch: [{ op: 'add', path: '/name', value: 'Baker Sekitoleko' }],
      })
      .set({ Accept: 'application/json', Authorization: `Bearer ${token}` });
    expect(res.statusCode).to.equal(500);
  });

  it('should fail without a patch', async () => {
    const auth = await authUser(credentials);
    const { token } = auth.body;
    const res = await request(app)
      .patch('/api/private/patch')
      .send({
        document: {
          username: 'Baker',
          password: '123456',
        },
      })
      .set({ Accept: 'application/json', Authorization: `Bearer ${token}` });
    expect(res.statusCode).to.equal(500);
  });

  it('should download a thumbnail successfully', async () => {
    const auth = await authUser(credentials);
    const { token } = auth.body;
    const res = await request(app)
      .get('/api/private/thumbnail')
      .set({ Accept: 'application/json', Authorization: `Bearer ${token}` });
    expect(res.statusCode).to.equal(200);
  });

  it('should download a thumbnail from a query param', async () => {
    const auth = await authUser(credentials);
    const { token } = auth.body;
    const res = await request(app)
      .get(
        '/api/private/thumbnail?imageSrc=https://i.picsum.photos/id/0/5616/3744.jpg',
      )
      .set({ Accept: 'application/json', Authorization: `Bearer ${token}` });
    expect(res.statusCode).to.equal(200);
  });
});
