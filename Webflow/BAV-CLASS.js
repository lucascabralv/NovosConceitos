function BAV(assessment) {
  this.name = assessment.brand.name;

  const resposta = assessment.result.resposta;
  this.D1 = resposta[0][0];
  this.D2 = resposta[0][1];
  this.D3 = resposta[0][2];
  this.EN1 = resposta[0][3];
  this.EN2 = resposta[0][4];
  this.EN3 = resposta[0][5];

  this.DEN1 = BAVRoundedMean(this.D1, this.EN1);
  this.DEN2 = BAVRoundedMean(this.D2, this.EN3);
  this.DEN3 = BAVRoundedMean(this.D3, this.EN3);

  this.R1 = resposta[1][0];
  this.R2 = resposta[1][1];
  this.R3 = resposta[1][2];

  this.E1 = resposta[2][0];
  this.E2 = resposta[2][1];
  this.E3 = resposta[2][2];

  this.C1 = resposta[3][0];
  this.C2 = resposta[3][1];
  this.C3 = resposta[3][2];

  // D | R | E | C
  this.D = BAVRoundedMean(
      this.D1,
      this.D2,
      this.D3,
      this.EN1,
      this.EN2,
      this.EN3
    );
  this.R = BAVRoundedMean(this.R1, this.R2, this.R3);

  this.E = BAVRoundedMean(this.E1, this.E2, this.E3);

  this.C = BAVRoundedMean(this.C1, this.C2, this.C3);

  // FORÇA | ESTATURA
  this.forca = BAVRoundedMean(this.D, this.R);
  this.estatura = BAVRoundedMean(this.E, this.C);

  // TOTAL
  this.total = BAVRoundedMean(this.forca, this.estatura);
}

function BAVRoundedMean(...args) {
  return Math.round(
    args.reduce((acc, cur) => {
      return (acc += parseInt(cur));
    }, 0) / args.length - 0.01
  );
}
