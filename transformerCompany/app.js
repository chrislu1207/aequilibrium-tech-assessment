angular.module('app', [])
  .controller('transformerCtrl', function($scope) {
    $scope.data = {
      'autobots': [],
      'decepticons': [],
      'numBattles': 0,
      'winner': '',
      'loser': '',
      'survivingWinners': [],
      'survivingLosers': []
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
        $scope.data.autobots.sort(function(a, b) {
          return (a.rank - b.rank);
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
        $scope.data.decepticons.sort(function(a, b) {
          return (a.rank - b.rank);
        });
      }
    };

    $scope.battleTransformers = function() {
      console.log($scope.data.autobots);
      var autobotWins = 0;
      var decepticonWins = 0;
      var survivingAutobots = [];
      var survivingDecepticons = [];
      for (var i = 0; i < Math.min($scope.data.autobots.length, $scope.data.decepticons.length); i++) {
        $scope.data.numBattles++;
        var currentAutobot = $scope.data.autobots[i];
        var currentDecepticon = $scope.data.decepticons[i];
        var currentAutobotRating = currentAutobot.strength + currentAutobot.intelligence + currentAutobot.speed + currentAutobot.firepower;
        var currentDecepticonRating = currentDecepticon.strength + currentDecepticon.intelligence + currentDecepticon.speed + currentDecepticon.firepower;
        if (currentAutobot.courage >= (currentDecepticon.courage + 4) && currentAutobot.strength >= (currentDecepticon.strength + 3)) {
          autobotWins++;
          survivingAutobots.push(currentAutobot.name);
        } else if (currentDecepticon.courage >= (currentAutobot.courage + 4) && currentDecepticon.strength >= (currentAutobot.strength + 3)) {
          decepticonWins++;
          survivingDecepticons.push(currentDecepticon.name);
        } else if (currentAutobot.skill >= currentDecepticon.skill + 3) {
          autobotWins++;
          survivingAutobots.push(currentAutobot.name);
        } else if (currentDecepticon.skill >= currentAutobot.skill + 3) {
          decepticonWins++;
          survivingDecepticons.push(currentDecepticon.name);
        } else if (currentAutobotRating > currentDecepticonRating) {
          autobotWins++;
          survivingAutobots.push(currentAutobot.name);
        } else if (currentDecepticonRating > currentAutobotRating) {
          decepticonWins++;
          survivingDecepticons.push(currentDecepticon.name);
        }
      }

      if (autobotWins > decepticonWins) {
        $scope.data.winner = 'Autobots';
        $scope.data.survivingWinners = survivingAutobots;
        $scope.data.loser = 'Decepticons';
        $scope.data.survivingLosers = survivingDecepticons;
      } else if (decepticonWins > autobotWins) {
        $scope.data.winner = 'Decepticons';
        $scope.data.survivingWinners = survivingDecepticons;
        $scope.data.loser = 'Autobots';
        $scope.data.survivingLosers = survivingAutobots;
      }
    };
  });