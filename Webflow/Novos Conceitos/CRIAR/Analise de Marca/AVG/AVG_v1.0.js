// AUX FUNCTIONS
function AVG(arr) {
  let sum = 0;
  let i = 0;
  for (i; i < arr.length; i++) {
    sum += arr[i];
  }
  // Similar to .toFixed(3)
  return Math.round((sum / i) * 1000) / 1000;
}
