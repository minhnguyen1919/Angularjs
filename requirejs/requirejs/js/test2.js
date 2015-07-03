define(['jquery'], function($) {
  return function() {
    this.printMessage = function() {
      var msg = 'test 2';
      console.log(msg);
    }
  }
})