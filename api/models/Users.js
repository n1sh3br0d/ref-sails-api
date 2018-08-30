/**
 * Users.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  tableName: 'users',
  attributes: {
    updatedAt: false,
    name: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true,
      encrypt: true
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    topics: {
      collection: 'topics',
      via: 'owner'
    },
    comments: {
      collection: 'comments',
      via: 'owner'
    },
    likes: {
      collection: 'likes',
      via: 'owner'
    }
  },

};

