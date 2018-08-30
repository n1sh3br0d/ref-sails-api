const supertest = require('supertest');

let token;
let topicid;
let topicid2;
let userid;
let commentid;
let commentid1;
let commentid2;


describe('#Prepare for next test', () => {
  it('grab token', done => {
    supertest(sails.hooks.http.app)
    .post('/users/signin')
    .send({ email: 'user2@mail.com', password: 'test' })
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
  it('grab userid,topicid2', done => {
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
      topicid2 = res.body.data[0]['id'];
      console.log(userid,topicid2);
      done();
    });
  });
});


describe('CommentsController.byId', () => {

  describe('#Get list comments of topic', () => {
    it('should return 200', done => {
      supertest(sails.hooks.http.app)
      .get(`/topics/${topicid2}/comments`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) =>{
        if (err) {
          throw err;
        }
        if (res.body.model !== 'comments') {
          throw new Error('Server should return list of commments');
        }
        commentid2 = res.body.data[0]['id'];
        done();
      });
    });
  });

  describe('#Get list comments of topic (limit 2)', () => {
    it('should return 200', done => {
      supertest(sails.hooks.http.app)
      .get(`/topics/${topicid2}/comments/?limit=2`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) =>{
        if (err) {
          throw err;
        }
        if (res.body.model !== 'comments' || res.body.data.length > 2) {
          throw new Error('Server should return list of comments <=2');
        }
        done();
      });
    });
  });

  describe('#Get list comments of topic (limit 2 and page 2)', () => {
    it('should return 200', done => {
      supertest(sails.hooks.http.app)
      .get(`/topics/${topicid2}/comments/?limit=2&page=2`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) =>{
        if (err) {
          throw err;
        }
        if (res.body.model !== 'comments' || res.body.data.length > 2) {
          throw new Error('Server should return list comments <= 2');
        }
        done();
      });
    });
  });

  describe('#Get list comments of user', () => {
    it('should return 200', done => {
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
          throw new Error('Server should return list comments');
        }
        done();
      });
    });
  });

  describe('#Get list comments of user (limit 2)', () => {
    it('should return 200', done => {
      supertest(sails.hooks.http.app)
      .get(`/users/${userid}/comments/?limit=2`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) =>{
        if (err) {
          throw err;
        }
        if (res.body.model !== 'comments' || res.body.data.length > 2) {
          throw new Error('Server should return list comments <= 2');
        }
        done();
      });
    });
  });

  describe('#Get list comments of user (limit 2 and page 2)', () => {
    it('should return 200', done => {
      supertest(sails.hooks.http.app)
      .get(`/users/${userid}/comments/?page=2&limit=2`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) =>{
        if (err) {
          throw err;
        }
        if (res.body.model !== 'comments' || res.body.data.length > 2) {
          throw new Error('Server should return list comments <= 2');
        }
        done();
      });
    });
  });

});


describe('CommentsController.findOne', () => {

  describe('#Get comment', () => {
    it('should return 200', done => {
      supertest(sails.hooks.http.app)
      .get(`/comments/${commentid2}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/, done);
    });
  });
});

describe('CommentsController.create', () => {

  describe('#Create comment', () => {
    it('should return 201', done => {
      supertest(sails.hooks.http.app)
      .post(`/topics/${topicid2}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ body: 'commentBody' })
      .expect(201)
      .expect('Content-Type', /json/, done);
    });
  });

  describe('#Create comment with missing parameter', () => {
    it('should return 400', done => {
      supertest(sails.hooks.http.app)
      .post(`/topics/${topicid2}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
      .expect('Content-Type', /json/, done);
    });
  });

  describe('#Create comment without token', () => {
    it('should return 401', done => {
      supertest(sails.hooks.http.app)
      .post(`/topics/${topicid2}`)
      .send({ body: 'testBody' })
      .expect(401)
      .expect('Content-Type', /json/, done);
    });
  });

  describe('#Create comment with query', () => {
    it('should return 201', done => {
      supertest(sails.hooks.http.app)
      .get(`/topics/${topicid2}/create?body=comment1Body&api=${token}`)
      .expect(201)
      .expect('Content-Type', /json/, done);
    });
  });
});

describe('#Get list comments of topic', () => {
  it('should return 200', done => {
    supertest(sails.hooks.http.app)
    .get(`/topics/${topicid2}/comments`)
    .set('Authorization', `Bearer ${token}`)
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) =>{
      if (err) {
        throw err;
      }
      if (res.body.model !== 'comments') {
        throw new Error('Server should return list of commments');
      }
      for (key in res.body.data) {
        if (res.body.data[key]['body'] === 'commentBody') {
          commentid = res.body.data[key]['id'];
        } else if (res.body.data[key]['body'] === 'comment1Body') {
          commentid1 = res.body.data[key]['id'];
        }
      }
      done();
    });
  });
});

describe('CommentsController.update', () => {

  describe('#Update comment', () => {
    it('should return 200', done => {
      supertest(sails.hooks.http.app)
      .patch(`/comments/${commentid}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ body: 'newTestBody' })
      .expect(200)
      .expect('Content-Type', /json/, done);
    });
  });

  describe('#Update comment without parameters', () => {
    it('should return 400', done => {
      supertest(sails.hooks.http.app)
      .patch(`/comments/${commentid}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
      .expect('Content-Type', /json/,done);
    });
  });

  describe('#Update comment without token', () => {
    it('should return 401', done => {
      supertest(sails.hooks.http.app)
      .patch(`/comments/${commentid}`)
      .send({ body: 'newTestBody' })
      .expect(401)
      .expect('Content-Type', /json/, done);
    });
  });

  describe('#Update comment of another user', () => {
    it('should return 300', done => {
      supertest(sails.hooks.http.app)
      .patch(`/comments/${commentid2}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ body: 'newTestBody' })
      .expect(300)
      .expect('Content-Type', /json/, done);
    });
  });

  describe('#Update comment with query', () => {
    it('should return 200', done => {
      supertest(sails.hooks.http.app)
      .get(`/comments/${commentid}/update?body=newCommentBody&api=${token}`)
      .expect(200)
      .expect('Content-Type', /json/, done);
    });
  });
});


describe('CommentsController.delete', () => {

  describe('#Delete comment without token', () => {
    it('should return 401', done => {
      supertest(sails.hooks.http.app)
      .delete(`/comments/${commentid}`)
      .expect(401)
      .expect('Content-Type', /json/, done);
    });
  });

  describe('#Delete comment', () => {
    it('should return 200', done => {
      supertest(sails.hooks.http.app)
      .delete(`/comments/${commentid}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect('Content-Type', /json/, done);
    });
  });

  describe('#Delete comment of another user', () => {
    it('should return 300', done => {
      supertest(sails.hooks.http.app)
      .delete(`/comments/${commentid2}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(300)
      .expect('Content-Type', /json/, done);
    });
  });

  describe('#Delete comment with query', () => {
    it('should return 200', done => {
      supertest(sails.hooks.http.app)
      .get(`/comments/${commentid1}/delete?api=${token}`)
      .expect(200)
      .expect('Content-Type', /json/, done);
    });
  });
});
