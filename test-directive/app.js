var leet = {
    a: '4', b: '8', e: '3',
    g: '6', i: '!', l: '1',
    o: '0', s: '5', t: '7',
    z: '2'
};

var module = angular.module('example', []);

module.directive('exampleBindLeet', function() {
  return {
    scope: {
      exampleBindLeet: '='
    },
    link: link
  };
})

function link($scope, $elem, attrs) {
  function convertText() {
    var leetText = $scope.exampleBindLeet.replace(/[abegilostz]/gmi, function (letter) {
      return leet[letter.toLowerCase()];
    });

    $elem.text(leetText);
  }

  $scope.$watch('exampleBindLeet', convertText);
}


module.directive('exampleProgress', function() {
  return {
    restrict: 'E',
    scope: {
      value: '=',
      max: '='
    },
    template: '<div class="progressBar">' +
      '</div><div class="progressValue">{{ percentValue }}%' +
      '</div>',
    link: link2

  }
})

function link2($scope, $elem, attrs) {
  function updateProgress() {
    var percentValue = Math.round($scope.value / $scope.max * 100);
    $scope.percentValue = Math.min(Math.max(percentValue, 0), 100);
    // $elem.children()[0].style.width = $scope.percentValue + '%';
    $elem.children('.progressBar').stop(true, true).animate({ width: $scope.percentValue + '%' });

  }

  $scope.$watchCollection('[value, max]', updateProgress);
}