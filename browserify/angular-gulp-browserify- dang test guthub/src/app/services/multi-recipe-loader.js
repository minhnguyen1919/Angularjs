module.exports = function(Recipe, $q) {
  return function() {
    var delay = $q.defer();
    Recipe.query(function(recipes) {
      delay.resolve(recipes);
    },

    function() {
      delay.reject('Unable to fetch recipes');
    });

    return delay.promise;
  };
}
