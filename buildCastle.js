var buildCastle = function (arr) {
  var numCastles = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i - 1] <= arr[i] && arr[i] >= arr[i + 1]) {
      numCastles++;
    } else if (arr[i - 1] >= arr[i] && arr[i + 1] >= arr[i]) {
      numCastles++;
    }
  }
  return numCastles;
};