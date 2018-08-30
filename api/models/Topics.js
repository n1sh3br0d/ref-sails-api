/**
 * Topics.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'topics',
  attributes: {
    subject: {
      type: 'string',
      required: true
    },
    body: {
      type: 'string',
      required: true
    },
    owner: {
      model: 'users',
      required: true
    },
    comments: {
      collection: 'comments',
      via: 'topic'
    }
  },

};

