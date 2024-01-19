import request from 'supertest';
import app from '../index';

import mongoose from 'mongoose';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL);
  await app.listen("3031");
});

describe('', () => {
  it('should return 200 and user data on successful login', async () => {
    jest.setTimeout(5000);

    const response = await request(app)
      .post('/client/register')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .send({ email: 'adioadeyoriazeez@gmail.com', password: '@Bch2009021' });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("err");
  });
 
});


afterAll(async () => {
  //process.exit(0)

});