define(['jquery'], function($) {
  return function() {
    this.logTestContent = function() {
      var msg = 'test 1';
      console.log(msg);
    }
  }
})
