/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {


  //  ╦ ╦╔═╗╔╗ ╔═╗╔═╗╔═╗╔═╗╔═╗
  //  ║║║║╣ ╠╩╗╠═╝╠═╣║ ╦║╣ ╚═╗
  //  ╚╩╝╚═╝╚═╝╩  ╩ ╩╚═╝╚═╝╚═╝

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'pages/homepage'
  },

  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/

  'get /user/signup': {controller: 'QueryController', action: 'create'},
  'get /:model/create': {controller: 'QueryController', action: 'create'},
  'get /:model/:id/create': {controller: 'QueryController', action: 'create'},

  'get /:model/delete': {controller: 'QueryController', action: 'delete'},
  'get /:model/:id/delete': {controller: 'QueryController', action: 'delete'},

  'get /:model/update': {controller: 'QueryController', action: 'update'},
  'get /:model/:id/update': {controller: 'QueryController', action: 'update'},

  'get /users/signin': {controller: 'QueryController', action: 'login'},


  'get /:model/': {controller: 'HandleController', action: 'get'},
  'get /:model/:id/': {controller: 'HandleController', action: 'get'},
  'get /:optional/:id/:model/': {controller: 'HandleController', action: 'get'},

  'post /:model/': {controller: 'HandleController', action: 'post'},
  'post /:model/:id/': {controller: 'HandleController', action: 'post'},

  'delete /:model/:id/': {controller: 'HandleController', action: 'delete'},

  'patch /:model/:id/': {controller: 'HandleController', action: 'patch'},

  'post /users/signin': {controller: 'HandleController', action: 'login'},

  'post /users/:id': {controller: 'HandleController', action: 'avatar'},

  'get /users/restore': {controller: 'HandleController', action: 'restore'},


};
