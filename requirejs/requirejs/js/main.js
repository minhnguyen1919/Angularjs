require.config({
  baseUrl: "./js",

  paths: {
    jquery: "../component/jquery",
    bootstrap: "../component/bootstrap",
    test1: "test1"
  }

});

require(['jquery', 'test1'], function($, Test) {
  var t1 = new Test();
  t1.logTestContent();
});