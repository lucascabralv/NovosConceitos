/**--------------------------------------------
 *h/               OBJECTS/VARIABLES
 *---------------------------------------------**/
let RadarChart;
// PILAR
class Pilar {
  constructor(id) {
    this.id = id;
    this[0] = 0;
    this[1] = 0;
    this[2] = 0;
  }
  updateProgress(index) {
    // MINI PROGRESS CIRCLE
    $(".page-analise[CRIAR='" + this.id + "'")
      .find(".wrapper-pergunta-analise")
      .eq(index)
      .find(".small-circle-analise")
      .attr("value", this[index]);
    // BIG PROGRESS CIRCLE
    $(".page-analise[CRIAR='" + this.id + "'")
      .find(".big-circle-analise")
      .attr("value", this.average);
  }
  get average() {
    return AVG([this[0], this[1], this[2]]);
  }
}
// CRIAR
const CRIAR = {
  pilar: {
    contexto: new Pilar("contexto"),
    recursos: new Pilar("recursos"),
    ideias: new Pilar("ideias"),
    acoes: new Pilar("acoes"),
    resultados: new Pilar("resultados"),
  },
  // FATOR K = MEDIA(Contexto, Resultados)
  get fatorK() {
    return AVG([this.pilar.contexto.average, this.pilar.resultados.average]);
  },
  // EFICIENCIA = MEDIA(FatorK, Recursos)
  get eficiencia() {
    return AVG([this.fatorK, this.pilar.recursos.average]);
  },
  // EFICACIA = MEDIA(IDEIAS, ACOES)
  get eficacia() {
    return AVG([this.pilar.ideias.average, this.pilar.acoes.average]);
  },
  // Vetor do PONTO no plano cartesiano
  get ponto() {
    return { x: this.eficacia, y: this.eficiencia };
  },
  // Define o valor do criterio do pilar e o valor das analises
  updateValues: function (obj) {
    const { value, index, pilar } = obj;
    this.pilar[pilar][index] = value;
  },
  // UPDATE VISUALLY PROGRESS CIRCLES
  updateGraphs: function (obj) {
    const { index, pilar } = obj;
    this.pilar[pilar].updateProgress(index);
  },
  // ANALISES
  analise: {
    efetividade: {
      0: "saudavel", // Comparacao entre K e R
      1: "saudavel", // Comparacao entre I e A
      quadrante: "incipiente",
      area: "startup",
    },
    updateValues: function () {
      this.updateEfetividade();
      this.updateQuadrante();
      this.updateArea();
    },
    updateEfetividade: function () {
      this.efetividade[0] = "saudavel";
      this.efetividade[1] = "saudavel";
      if (CRIAR.fatorK <= CRIAR.pilar.recursos.average) {
        this.efetividade[0] = "insalubre";
      }
      if (CRIAR.pilar.ideias.average <= CRIAR.pilar.acoes.average) {
        this.efetividade[1] = "insalubre";
      }
    },
    updateQuadrante: function () {
      const { x, y } = CRIAR.ponto;
      let result = "";
      switch (true) {
        case x <= 5 && y <= 5:
          result = "incipiente";
          break;
        case x <= 5 && y > 5:
          result = "potencial";
          break;
        case x > 5 && y <= 5:
          result = "inerte";
          break;
        case x > 5 && y > 5:
          result = "efetivo";
          break;
      }
      this.efetividade.quadrante = result;
    },
    updateArea: function () {
      let result = "";
      let P = CRIAR.ponto;
      switch (true) {
        case isInsideTriangle(P, V.a, V.b, V.d):
          result = "startup";
          break;
        case isInsideTriangle(P, V.b, V.d, V.e):
          result = "risco";
          break;
        case isInsideTriangle(P, V.d, V.e, V.g):
          result = "oportunidade";
          break;
        case isInsideTriangle(P, V.e, V.g, V.h):
          result = "desafio";
          break;
        case isInsideTriangle(P, V.e, V.f, V.h):
          result = "commodity";
          break;
        case isInsideTriangle(P, V.f, V.h, V.i):
          result = "lideranca";
          break;
        case isInsideTriangle(P, V.b, V.c, V.e):
          result = "obsolescencia";
          break;
        case isInsideTriangle(P, V.c, V.e, V.f):
          result = "nicho";
          break;
        default:
          console.log("Erro na Area");
          break;
      }
      this.efetividade.area = result;
    },
    createGraphRadar: function () {
      chartJS_createRadar();
    },
    updateGraphRadar: function () {
      chartJS_updateRadar();
    },
    updateGraphBulb: function(){
      const fatorK = CRIAR.fatorK*10;
      const result = "";
      switch (true) {
        case fatorK < 10:
          result = "ignorante";
          break;
        case fatorK < 40:
          result = "leiga";
          break;
        case fatorK < 70:
          result = "intuitiva";
          break;
        case fatorK < 80:
          result = "experiente";
          break;
        case fatorK < 90:
          result = "inteligente";
          break;
        case fatorK <= 100:
          result = "proficiente";
          break;
      }
      $("#analise_fatorK").attr("fatorK", resul);
    },
    updateGraphBars: function () {
      const {
        fatorK,
        eficiencia,
        eficacia,
        pilar: { recursos, ideias, acoes },
      } = CRIAR;
      const barArray = [
        fatorK,
        recursos.average,
        ideias.average,
        acoes.average,
        eficiencia,
        eficacia,
      ];
      for (let i = 0; i < barArray.length; i++) {
        $(".graph-analise-2-wrapper")
          .eq(i)
          .find(".graph-analise-2-percent")
          .text(
            ((barArray[i] * 10) % 1 == 0
              ? barArray[i] * 10
              : (barArray[i] * 10).toFixed(2)) + "%"
          );
        $(".graph-analise-2-wrapper")
          .eq(i)
          .find(".graph-analise-bar")
          .css("height", barArray[i] * 10 + "px");
      }
    },
    updateGraphEfetividade: function () {
      $("#comparacoes")
        .attr("comparacao_1", this.efetividade[0])
        .attr("comparacao_2", this.efetividade[1]);
      $("#analise_final")
        .attr("efetividade_1", this.efetividade[0])
        .attr("efetividade_2", this.efetividade[1]);
    },
    updateGraphDotArea: function () {
      $("#analise_final").attr("area", this.efetividade.area);
    },
    updateGraphDotQuadrante: function () {
      $("#analise_final").attr("quadrante", this.efetividade.quadrante);
    },
    updateGraphDot: function () {
      const { x, y } = CRIAR.ponto;
      $("#analiseDot")
        .css("left", x * 10 + "%")
        .css("bottom", y * 10 + "%");

      this.updateGraphDotArea();
      this.updateGraphDotQuadrante();
    },
    updateAllGraphs: function () {
      this.updateGraphRadar();
      this.updateGraphBulb();
      this.updateGraphBars();
      this.updateGraphEfetividade();
      this.updateGraphDot();
    },
  },
};
/**--------------------------------------------
 *h/               INITIALIZATION
 *---------------------------------------------**/
CRIAR.analise.createGraphRadar();

/**--------------------------------------------
 *h/               EVENT HANDLERS
 *---------------------------------------------**/

$(".input-range-analise").on("change", function () {
  const obj = {
    pilar: $(this).parents(".page-analise").attr("CRIAR"),
    value: parseInt($(this).val()),
    index: $(this).parents(".wrapper-pergunta-analise").index(),
  };
  CRIAR.updateValues(obj);
  CRIAR.updateGraphs(obj);
  CRIAR.analise.updateValues();
  CRIAR.analise.updateAllGraphs();
});

/**--------------------------------------------
 *h/               CHART JS
 *---------------------------------------------**/
// CHART.JS
function chartJS_createRadar() {
  const radarChartCanvas = document.getElementById("radarChart");
  let radarChartData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  RadarChart = new Chart(radarChartCanvas, {
    type: "radar",
    data: {
      labels: [
        "C₁",
        "C₂",
        "C₃",
        "R₁",
        "R₂",
        "R₃",
        "I₁",
        "I₂",
        "I₃",
        "A₁",
        "A₂",
        "A₃",
        "Rᵉ₁",
        "Rᵉ₂",
        "Rᵉ₃",
      ],
      datasets: [
        {
          label: "",
          data: radarChartData,
          borderWidth: 1,
          backgroundColor: "rgba(3, 140, 140, 0.2)",
          borderColor: "#038C8C",
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        r: {
          beginAtZero: true,
          min: 0,
          max: 100,
          pointLabels: {
            font: {
              size: 14,
            },
          },
        },
      },
    },
  });
}

function chartJS_updateRadar() {
  RadarChart.data.datasets[0].data = [
    CRIAR.pilar.contexto[0],
    CRIAR.pilar.contexto[1],
    CRIAR.pilar.contexto[2],
    CRIAR.pilar.recursos[0],
    CRIAR.pilar.recursos[1],
    CRIAR.pilar.recursos[2],
    CRIAR.pilar.ideias[0],
    CRIAR.pilar.ideias[1],
    CRIAR.pilar.ideias[2],
    CRIAR.pilar.acoes[0],
    CRIAR.pilar.acoes[1],
    CRIAR.pilar.acoes[2],
    CRIAR.pilar.resultados[0],
    CRIAR.pilar.resultados[1],
    CRIAR.pilar.resultados[2],
  ].map((x) => x * 10);
  RadarChart.update();
}
/**--------------------------------------------
 *h/          AUX FUNCTIONS/VARIABLES
 *---------------------------------------------**/
function AVG(arr) {
  let sum = 0;
  let i = 0;
  for (i; i < arr.length; i++) {
    sum += arr[i];
  }
  // Similar to .toFixed(3)
  return Math.round((sum / i) * 1000) / 1000;
}
function isInsideTriangle(P, A, B, C) {
  const triangle_area = calcTriangleArea(A, B, C);
  let sum_area = 0;
  sum_area += calcTriangleArea(A, B, P);
  sum_area += calcTriangleArea(A, C, P);
  sum_area += calcTriangleArea(B, C, P);

  if (triangle_area.toFixed(2) == sum_area.toFixed(2)) {
    return true;
  }
  return false;
}
function calcTriangleArea(a, b, c) {
  //(ΔABC) = |x1(y2 − y3) + x2(y3 − y1) + x3(y1 − y2)| / 2
  let area = 0;
  area += a.x * (b.y - c.y); // x1(y2 − y3)
  area += b.x * (c.y - a.y); // x2(y3 − y1)
  area += c.x * (a.y - b.y); // x3(y1 − y2)
  area = Math.abs(area / 2);
  return area;
}
function createVector(x, y) {
  return { x: x, y: y };
}
const V = {
  a: createVector(0, 0),
  b: createVector(5, 0),
  c: createVector(10, 0),
  d: createVector(0, 5),
  e: createVector(5, 5),
  f: createVector(10, 5),
  g: createVector(0, 10),
  h: createVector(5, 10),
  i: createVector(10, 10),
};
