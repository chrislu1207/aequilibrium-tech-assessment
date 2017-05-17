angular.module('app', [])
  .controller('transformerCtrl', function($scope) {
    $scope.data = {
      'autobots': [],
      'decepticons': [],
      'numBattles': 0,
      'winner': '',
      'loser': '',
      'survivingWinners': [],
      'survivingLosers': [],
      'messages': []
    };

    $scope.addTransformer = function(faction, name, str, int, spd, end, rank, crg, fp, skill) {
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
          return (b.rank - a.rank);
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
          return (b.rank - a.rank);
        });
      }
    };

    $scope.battleTransformers = function() {
      var autobotWins = 0;
      var decepticonWins = 0;
      var survivingAutobots = [];
      var survivingDecepticons = [];
      for (var i = 0; i < Math.max($scope.data.autobots.length, $scope.data.decepticons.length); i++) {
        
        if ($scope.data.autobots[i]) {
          var currentAutobot = $scope.data.autobots[i];
        } else {
          survivingDecepticons.push($scope.data.decepticons[i]);
          continue;
        }

        if ($scope.data.decepticons[i]) {
          var currentDecepticon = $scope.data.decepticons[i];
        } else {
          survivingAutobots.push($scope.data.autobots[i]);
          continue;
        }

        $scope.data.numBattles++;
        var currentAutobotRating = currentAutobot.strength + currentAutobot.intelligence + currentAutobot.speed + currentAutobot.firepower;
        var currentDecepticonRating = currentDecepticon.strength + currentDecepticon.intelligence + currentDecepticon.speed + currentDecepticon.firepower;

        if ((currentAutobot.name === 'Optimus Prime' || currentAutobot.name === 'Predaking') && (currentDecepticon.name === 'Optimus Prime' || currentDecepticon.name === 'Predaking')) {
          $scope.data.winner = 'Tied';
          $scope.data.loser = 'Tied';
          $scope.data.survivingWinners = [];
          $scope.data.survivingLosers = [];
          $scope.data.messages.push('Transformer Annihiliation!');
          break;
        }
        
        if (currentAutobot.name === 'Optimus Prime' || currentAutobot.name === 'Predaking') {
          autobotWins++;
          survivingAutobots.push(currentAutobot);
          $scope.data.messages.push(currentAutobot.name + ' wins all matchups!');
        } else if (currentDecepticon.name === 'Optimus Prime' || currentDecepticon.name === 'Predaking') {
          decepticonWins++;
          survivingDecepticons.push(currentDecepticon);
          $scope.data.messages.push(currentDecepticon.name + ' wins all matchups!');
        } else if (currentAutobot.courage >= (currentDecepticon.courage + 4) && currentAutobot.strength >= (currentDecepticon.strength + 3)) {
          autobotWins++;
          survivingAutobots.push(currentAutobot);
          $scope.data.messages.push(currentDecepticon.name + ' has ran away, ' + currentAutobot.name + ' wins!');
        } else if (currentDecepticon.courage >= (currentAutobot.courage + 4) && currentDecepticon.strength >= (currentAutobot.strength + 3)) {
          decepticonWins++;
          survivingDecepticons.push(currentDecepticon);
          $scope.data.messages.push(currentAutobot.name + ' has ran away, ' + currentDecepticon.name + ' wins!');
        } else if (currentAutobot.skill >= currentDecepticon.skill + 3) {
          autobotWins++;
          survivingAutobots.push(currentAutobot);
          $scope.data.messages.push(currentAutobot.name + ' has outskilled ' + currentDecepticon.name + ', ' + currentAutobot.name + ' wins!');
        } else if (currentDecepticon.skill >= currentAutobot.skill + 3) {
          decepticonWins++;
          survivingDecepticons.push(currentDecepticon);
          $scope.data.messages.push(currentDecepticon.name + ' has outskilled ' + currentAutobot.name + ', ' + currentDecepticon.name + ' wins!');
        } else if (currentAutobotRating > currentDecepticonRating) {
          autobotWins++;
          survivingAutobots.push(currentAutobot);
          $scope.data.messages.push(currentAutobot.name + ' has beat ' + currentDecepticon.name + '!');
        } else if (currentDecepticonRating > currentAutobotRating) {
          decepticonWins++;
          survivingDecepticons.push(currentDecepticon);
          $scope.data.messages.push(currentDecepticon.name + ' has beat ' + currentAutobot.name + '!');
        } else if (currentAutobotRating === currentDecepticonRating) {
          $scope.data.messages.push('Tie between ' + currentAutobot.name + ' and ' + currentDecepticon.name);
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
      } else if (autobotWins === decepticonWins) {
        $scope.data.winner = 'Tied';
        $scope.data.loser = 'Tied';
        $scope.data.survivingLosers = survivingAutobots.concat(survivingDecepticons);
      }
    };
  });