/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also do this by creating a hook.
 *
 * For more information on bootstrapping your app, check out:
 * https://sailsjs.com/config/bootstrap
 */

module.exports.bootstrap = async function(done) {

  // By convention, this is a good place to set up fake data during development.
  //
  // For example:
  // ```
  // // Set up fake development data (or if we already have some, avast)
  // if (await User.count() > 0) {
  //   return done();
  // }
  //
  // await User.createEach([
  //   { emailAddress: 'ry@example.com', fullName: 'Ryan Dahl', },
  //   { emailAddress: 'rachael@example.com', fullName: 'Rachael Shaw', },
  //   // etc.
  // ]);
  // ```

  // Don't forget to trigger `done()` when this bootstrap function's logic is finished.
  // (otherwise your server will never lift, since it's waiting on the bootstrap)
/*
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
*/
  return done();

};
