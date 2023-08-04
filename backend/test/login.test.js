import app from '../index.js';
import request from 'supertest';



describe('Login Endpoint',  () => {
  it('should return 200 and user data on successful login', (done) => {
    jest.setTimeout(5000);
     const t  =  setTimeout(()=>{
      request(app)
      .post('/client/login')
      .send({ email: 'adioadeyoriazeez@gmail.com', password: '@Theproli2009' })
      .expect(200)
      .end((err, res) => {
        if (err) {
         
          done(err); // Call done with an error if there was one
        } else {
          expect(res.status).toBe(200);
          done(); // Call done to indicate that the test is complete
        }
      });
      
     done();
     clearTimeout(t)
    },1000)
   
  });


  // it('should return 200 and user data on successful login', () => {
    
  //  setTimeout(async(done)=>{
  //       const response = await request(app)
  //       .post('/client/login')
  //       .send({ email: 'adioadeyoriazeez@gmail.com', password: '@Theproli2009' });
  //      //expect, toBe, toMatch
  //   //  expect(response.status).toBe(200);
  //     expect(response.status).toBe(200)
  //     //.toHaveProperty('suc', true);
  //     done()
  //  },3000)
   
  //  // expect(response.body.user).toEqual({ username: 'user1', password: 'password1' });
  // });

  // it('should return 401 on invalid login', async () => {
  //   const response = await request(app)
  //     .post('/client/login')
  //     .send({ email: 'adioadeyoriazeez@gmail.com', password: '@Theproli2009' });

  //   expect(response.status).toBe(404);
  //  //expect(response.body).toHaveProperty('error', 'Invalid username or password');
  // });

//   it('should return 401 when username is missing', async () => {
//     const response = await request(app)
//       .post('/client/login')
//       .send({ password: 'password1' });

//     expect(response.status).toBe(401);
//     expect(response.body).toHaveProperty('error', 'Invalid username or password');
//   });

//   it('should return 401 when password is missing', async () => {
//     const response = await request(app)
//       .post('/client/login')
//       .send({ username: 'user1' });

//     expect(response.status).toBe(401);
//     expect(response.body).toHaveProperty('error', 'Invalid username or password');
//   });
});
