'use strict';

define(['directives/directives'], function(directives) {
  directives.directive('focus',
    function() {
      return {
        link: function(scope, element) {
          element[0].focus();
        }
      };
  });
});
