'use strict';

module.exports = function() {
  return function(scope, elm, attrs) {
    setTimeout(function(){
      elm.addClass('show');
    });
  };
};
