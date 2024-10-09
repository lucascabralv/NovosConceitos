function numberToReal(number) {
  if (!number || typeof number !== "number") {
    return "R$ 0,00";
  }
  let resp = "";
  const spltNum = number.toString().split(".");
  let inteiros = "";
  let j = 0;
  for (let i = spltNum[0].length - 1; i >= 0; i--) {
    if (j == 3) {
      inteiros = spltNum[0][i] + "." + inteiros;
      j = 1;
    } else {
      inteiros = spltNum[0][i] + inteiros;
      j++;
    }
  }
  if (spltNum.length == 2) {
    resp = "R$ " + inteiros + "," + spltNum[1];
  } else {
    resp = "R$ " + inteiros + "," + "00";
  }
  return resp;
}
