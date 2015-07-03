'use strict';

module.exports = function() {
  return {
    link: function(scope, element) {
      element[0].focus();
    }
  };
};
