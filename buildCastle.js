var buildCastle = function (arr) {
  var numCastles = 1;
  var previousHeight = arr[0];

  for (var i = 1; i < arr.length; i++) {
    
    if (arr[i] === previousHeight) {
      continue;
    }
    
    if (arr[i - 1] >= arr[i] && arr[i + 1] >= arr[i]) {
      numCastles++;
      previousHeight = arr[i];
    } else if (arr[i - 1] <= arr[i] && arr[i + 1] <= arr[i]) {
      numCastles++;
      previousHeight = arr[i];
    }
    
  }

  return numCastles;
};

console.log('Building castles on:', process.argv.slice(2, process.argv.length));
console.log('Number of castles built:', buildCastle(process.argv.slice(2, process.argv.length)));