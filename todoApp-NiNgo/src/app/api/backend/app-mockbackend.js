// We will be using backend-less development
// $http uses $httpBackend to make its calls to the server
// $resource uses $http, so it uses $httpBackend too
// We will mock $httpBackend, capturing routes and returning data
'use strict';

var mockBackend = require('angular').module('mockBackend', ['ngMockE2E']);

mockBackend
  .run(['$httpBackend', 'Model', function($httpBackend, Model) {
    var baseUrl = '/api/todos';

    /**
     * Get list todo
     * @return status and list todos
     */
    $httpBackend.whenGET(baseUrl).respond(function() {
      var todos = Model.findAll();

      return [200, todos, {}];
    });

    /**
     * Get todo by id
     * @param  {} method
     * @param  {string} url
     * @param  {} data
     * @return status and todo
     */
    $httpBackend.whenGET(/\/api\/todos\/\d+/).respond(function(method, url, data) {
      // Parse the matching URL to pull out the id (/todos/:id)
      return [200, Model.find(url.split('/')[3]), {}];
    });

    /**
     * Add new todo
     * @param  {[type]} method [description]
     * @param  {[type]} url    [description]
     * @param  {[type]} data
     * @return status and todo has just been added
     */
    $httpBackend.whenPOST(baseUrl).respond(function(method, url, data) {
      var todo = Model.add(angular.fromJson(data));

      return [201, todo, {}];
    });

    /**
     * Update todo
     * @param  {[type]} method [description]
     * @param  {string} url
     * @param  {} data
     * @return status and todo has just been updated
     */
    $httpBackend.whenPOST(/\/api\/todos\/\d+/).respond(function(method, url, data) {
      var todo = Model.edit(url.split('/')[3], angular.fromJson(data));

      return [201, todo, {}];
    });

    /**
     * Delete a todo
     * @param  {[type]} method [description]
     * @param  {string} url
     * @param  {} data
     * @return status
     */
    $httpBackend.whenDELETE(/\/api\/todos\/\d+/).respond(function(method, url, data) {
      // Parse the matching URL to pull out the id (/todos/:id)
      var result = Model.delete(url.split('/')[3]);

      if(result) {
        return [204, result, {}];
      } else {
        return [500, result, {}];
      }
    });

    /**
     * Clear finished todo
     * @return status and result (boolean)
     */
    $httpBackend.whenDELETE(baseUrl).respond(function() {
      // Parse the matching URL to pull out all finished todo
      var result = Model.clear();

      if(result) {
        return [204, result, {}];
      } else {
        return [500, result, {}];
      }

    });

    $httpBackend.whenGET(/\.html$/).passThrough();
  }]);

module.exports = mockBackend;
