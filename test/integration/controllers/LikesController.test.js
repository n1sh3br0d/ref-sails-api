const supertest = require('supertest');

let token;
let token1;
let userid;
let commentid;


describe('#Prepare for next test', () => {
  it('should return 201', done => {
    supertest(sails.hooks.http.app)
    .get('/users/create?email=test2@test.com&password=test&name=test2')
    .expect(201)
    .expect('Content-Type', /json/,done);
  });
});

describe('#Prepare for next test', () => {
  it('should return 201', done => {
    supertest(sails.hooks.http.app)
    .get('/users/create?email=test3@test.com&password=test&name=test3')
    .expect(201)
    .expect('Content-Type', /json/,done);
  });
});

describe('#Prepare for next test', () => {
  it('grab token', done => {
    supertest(sails.hooks.http.app)
    .post('/users/signin')
    .send({ email: 'test2@test.com', password: 'test' })
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) =>{
      if (err) {
        throw err;
      }
      if (!res.body.token) {
        throw new Error('Server should return token');
      }
      token = res.body.token;
      done();
    });
  });
});

describe('#Prepare for next test', () => {
  it('grab token1', done => {
    supertest(sails.hooks.http.app)
    .post('/users/signin')
    .send({ email: 'test3@test.com', password: 'test' })
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) =>{
      if (err) {
        throw err;
      }
      if (!res.body.token) {
        throw new Error('Server should return token');
      }
      token1 = res.body.token;
      done();
    });
  });
});

describe('#Prepare for next test', () => {
  it('grab userid', done => {
    supertest(sails.hooks.http.app)
    .get('/topics/')
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) =>{
      if (err) {
        throw err;
      }
      if (res.body.model !== 'topics') {
        throw new Error('Server should return list topics');
      }
      userid = res.body.data[0]['owner'];
      done();
    });
  });
});

describe('#Prepare for next test', () => {
  it('grab commentid', done => {
    supertest(sails.hooks.http.app)
    .get(`/users/${userid}/comments`)
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) =>{
      if (err) {
        throw err;
      }
      if (res.body.model !== 'comments') {
        throw new Error('Server should return list topics');
      }
      commentid = res.body.data[0]['id'];
      done();
    });
  });
});

describe('LikesController.byId', () => {

  describe('#Get list likes of comment', () => {
    it('should return 200', done => {
      supertest(sails.hooks.http.app)
      .get(`/comments/${commentid}/likes`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) =>{
        if (err) {
          throw err;
        }
        if (res.body.model !== 'likes') {
          throw new Error('Server should return list of likes');
        }
        done();
      });
    });
  });

  describe('#Get list likes of comment (limit 2)', () => {
    it('should return 200', done => {
      supertest(sails.hooks.http.app)
      .get(`/comments/${commentid}/likes?limit=2`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) =>{
        if (err) {
          throw err;
        }
        if (res.body.model !== 'likes' || res.body.data.length > 2) {
          throw new Error('Server should return list of likes <=2');
        }
        done();
      });
    });
  });

  describe('#Get list likes of comment (limit 2 and page 2)', () => {
    it('should return 200', done => {
      supertest(sails.hooks.http.app)
      .get(`/comments/${commentid}/likes/?limit=2&page=2`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) =>{
        if (err) {
          throw err;
        }
        if (res.body.model !== 'likes' || res.body.data.length > 2) {
          throw new Error('Server should return list likes <= 2');
        }
        done();
      });
    });
  });

  describe('#Get list likes of user', () => {
    it('should return 200', done => {
      supertest(sails.hooks.http.app)
      .get(`/users/${userid}/likes`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) =>{
        if (err) {
          throw err;
        }
        if (res.body.model !== 'likes') {
          throw new Error('Server should return list likes');
        }
        done();
      });
    });
  });

  describe('#Get list likes of user (limit 2)', () => {
    it('should return 200', done => {
      supertest(sails.hooks.http.app)
      .get(`/users/${userid}/likes/?limit=2`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) =>{
        if (err) {
          throw err;
        }
        if (res.body.model !== 'likes' || res.body.data.length > 2) {
          throw new Error('Server should return list likes <= 2');
        }
        done();
      });
    });
  });

  describe('#Get list likes of user (limit 2 and page 2)', () => {
    it('should return 200', done => {
      supertest(sails.hooks.http.app)
      .get(`/users/${userid}/likes/?page=2&limit=2`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) =>{
        if (err) {
          throw err;
        }
        if (res.body.model !== 'likes' || res.body.data.length > 2) {
          throw new Error('Server should return list likes <= 2');
        }
        done();
      });
    });
  });

});

describe('#LikesController.create', () => {

  describe('#Create Like', () => {
    it('should return 201', done => {
      supertest(sails.hooks.http.app)
      .post(`/comments/${commentid}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /json/, done);
    });
  });

  describe('#Create Like without token', () => {
    it('should return 401', done => {
      supertest(sails.hooks.http.app)
      .post(`/comments/${commentid}`)
      .expect(401)
      .expect('Content-Type', /json/, done);
    });
  });

  describe('#Create Like with query', () => {
    it('should return 201', done => {
      supertest(sails.hooks.http.app)
      .get(`/comments/${commentid}/create?api=${token1}`)
      .expect(201)
      .expect('Content-Type', /json/, done);
    });
  });
});

describe('#LikesController.delete', () => {

  describe('#Delete Like', () => {
    it('should return 200', done => {
      supertest(sails.hooks.http.app)
      .post(`/comments/${commentid}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/, done);
    });
  });

  describe('#Delete Like without token', () => {
    it('should return 401', done => {
      supertest(sails.hooks.http.app)
      .post(`/comments/${commentid}`)
      .expect(401)
      .expect('Content-Type', /json/, done);
    });
  });

  describe('#Delete Like with query', () => {
    it('should return 200', done => {
      supertest(sails.hooks.http.app)
      .get(`/comments/${commentid}/create?api=${token1}`)
      .expect(200)
      .expect('Content-Type', /json/, done);
    });
  });
});
