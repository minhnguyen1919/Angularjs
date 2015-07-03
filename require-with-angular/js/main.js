/*global require*/
'use strict';

require.config({
  paths: {
    angular: 'libraries/angular',
    todoCtrl: 'controllers/todo'
  },
  shim: {
    angular: {
      exports: 'angular'
    }
  },
  deps: ['app']
});
