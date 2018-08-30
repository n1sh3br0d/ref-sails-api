const sails = require('sails');

// Before running any tests...
before((done) => {

  // Increase the Mocha timeout so that Sails has enough time to lift, even if you have a bunch of assets.

  sails.lift({
    // Your sails app's configuration files will be loaded automatically,
    // but you can also specify any other special overrides here for testing purposes.

    // For example, we might want to skip the Grunt hook,
    // and disable all logs except errors and warnings:
    hooks: { grunt: false },
    log: { level: 'warn' },
    models: { connection: 'mongoTest', migrate: 'drop' }

  }, error => {
    if (error) {
      return done(error);
    }

    // here you can load fixtures, etc.
    // (for example, you might want to create some records in the database)

    let range = new Array(10).fill(0);


    console.log('///////  Prepare for test ///////');

    let addLike = async(owner,comment) => {
      console.log('#####  Create likes #####');
      let like = await sails.models.likes.create({ owner, comment }).fetch();
      if (like) {
        console.log(`############ like ${like.id} created ############`);
      }
    };

    let createComments = async(owner,topic,num) => {
      console.log('#####  Create comments #####');
      let body = `comment${num}`;
      let comment = await sails.models.comments.create({ body, owner, topic }).fetch();
      if (comment) {
        console.log(`############ comment ${comment.id} created ############`);
        await range.map((element,i) => {
          addLike(owner,comment.id);
        });
      }
    };

    let createTopics = async(owner,num) => {
      console.log('#####  Create topics #####');
      let body = 'testBody';
      let subject = `topic${num}`;
      let topic = await sails.models.topics.create({ subject, body, owner }).fetch();
      if (topic) {
        console.log(`############ topic ${topic.id} created ############`);
        await range.map((element,i) => {
          createComments(owner,topic.id,num);
        });
      }
    };

    let createUsers = async(num) => {
      console.log('#####  Create users #####');
      let password = 'test';
      let email = `user${num}@mail.com`;
      let name =  `${email.split('@')[0]}`;
      let user = await sails.models.users.create({ email, name, password }).fetch();
      if (user) {
        console.log(`############ user ${user.id} created ############`);
        await range.map((element,i) => {
          createTopics(user.id,i);
        });
      }
    };


    range.map((element,i) => {
      createUsers(i);
    });

    setTimeout(() => done(), 15000);


  });
});

// After all tests have finished...
after(done => {

  // here you can clear fixtures, etc.
  // (e.g. you might want to destroy the records you created above)

  sails.lower(done);

});
