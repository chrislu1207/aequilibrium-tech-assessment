angular.module('app', [])
  .controller('transformerCtrl', function($scope) {
    $scope.data = {
      'autobots': [],
      'decepticons': []
    };

    $scope.addTransformer = function(faction, name, str, int, spd, end, rank, crg, fp, skill) {
      console.log(faction);
      if (faction === 'autobot') {
        $scope.data.autobots.push({
          'name': name,
          'strength': str,
          'intelligence': int,
          'speed': spd,
          'endurance': end,
          'rank': rank,
          'courage': crg,
          'firepower': fp,
          'skill': skill
        });
      } else if (faction === 'decepticon') {
        $scope.data.decepticons.push({
          'name': name,
          'strength': str,
          'intelligence': int,
          'speed': spd,
          'endurance': end,
          'rank': rank,
          'courage': crg,
          'firepower': fp,
          'skill': skill
        });
      }
    };
  });