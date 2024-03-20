const CRIAR = {
  criterios: {
    contexto: [0, 0, 0],
    recursos: [0, 0, 0],
    ideias: [0, 0, 0],
    acoes: [0, 0, 0],
    resultados: [0, 0, 0],
  },
  pilares: {
    contexto: 0,
    recursos: 0,
    ideias: 0,
    acoes: 0,
    resultados: 0,
  },
  resultados: {
    cre: 0,
    eficiencia: 0,
    eficacia: 0,
  },
};
// INIT
let RadarChart;
createFinalGraphs_RadarChart();

$(".input-range-analise").on("change", function () {
  const pilar = $(this).parents(".page-analise").attr("CRIAR");
  const value = parseInt($(this).val());
  const index = $(this).parents(".wrapper-pergunta-analise").index();
  updateCRIAR(pilar, index, value);
});

function updateCRIAR(pilar, index, value) {
  updateCRIAR_Criterios(pilar, index, value);
  updateCRIAR_PilaresAvg(pilar);
  updateCRIAR_ResultadosAvg();
  updateCRIAR_Graphs(pilar, index, value);

  updateCRIAR_FinalGraphs();
}

function updateCRIAR_Criterios(pilar, index, value) {
  CRIAR.criterios[pilar][index] = value;
}
function updateCRIAR_PilaresAvg(pilar) {
  pilarAvg = AVG(CRIAR.criterios[pilar]);
  CRIAR.pilares[pilar] = pilarAvg;
}
function updateCRIAR_ResultadosAvg() {
  let { contexto, recursos, ideias, acoes, resultados } = CRIAR.pilares;
  const CRE = AVG([contexto, resultados]);
  CRIAR.resultados.cre = CRE;
  CRIAR.resultados.eficiencia = AVG([CRE, recursos]);
  CRIAR.resultados.eficacia = AVG([ideias, acoes]);
}

function updateCRIAR_Graphs(pilar, index, value) {
  updateGraphs_Criterios(pilar, index, value);
  updateGraphs_Pilares(pilar);
}

function updateGraphs_Criterios(pilar, index, value) {
  $(".page-analise[CRIAR='" + pilar + "'")
    .find(".wrapper-pergunta-analise")
    .eq(index)
    .find(".small-circle-analise")
    .attr("value", value);
}

function updateGraphs_Pilares(pilar) {
  $(".page-analise[CRIAR='" + pilar + "'")
    .find(".big-circle-analise")
    .attr("value", CRIAR.pilares[pilar]);
}

function updateCRIAR_FinalGraphs() {
  updateFinalGraphs_BarChart();
  updateFinalGraphs_Comparison();
  updateFinalGraphs_RadarChart();
  updateFinalGraphs_DotChart();
}

function updateFinalGraphs_Comparison() {
  const { recursos, ideias, acoes } = CRIAR.pilares;
  const { cre } = CRIAR.resultados;
  let comp_1 = "saudavel";
  let comp_2 = "saudavel";
  if (cre <= recursos) {
    comp_1 = "insalubre";
  }
  if (ideias <= acoes) {
    comp_2 = "insalubre";
  }
  $("#comparacoes").attr("comparacao_1", comp_1).attr("comparacao_2", comp_2);
}

function updateFinalGraphs_BarChart() {
  const { contexto, recursos, ideias, acoes } = CRIAR.pilares;
  const { cre, eficiencia, eficacia } = CRIAR.resultados;
  const barArray = [cre, recursos, ideias, acoes, eficiencia, eficacia];
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
}

function updateFinalGraphs_DotChart() {
  const { eficacia, eficiencia } = CRIAR.resultados;
  $("#analiseDot")
    .css("left", eficacia * 10 + "%")
    .css("bottom", eficiencia * 10 + "%");

  setDotGraphQuadrante(eficacia, eficiencia);
}

function setDotGraphQuadrante(x, y) {
  let quadrante = "";
  if (x < 5 && y < 5) {
    quadrante = "5";
  } else if (x > 5 && y < 5) {
    quadrante = "4";
  } else if (x < 5 && y > 5) {
    quadrante = "1";
  } else {
    let P = { x: x, y: y }; //	A  ---- C2 // P -> Graph "Dot/Point" Vector
    let A = { x: 5, y: 10 }; //	|	\ 	  |
    let B = { x: 10, y: 5 }; //	|   \   |
    let C1 = { x: 5, y: 5 }; //	|			\ |
    let C2 = { x: 10, y: 10 }; //	C1 ---- B
    if (isInsideTriangle(P, A, B, C1)) {
      quadrante = "2";
    } else if (isInsideTriangle(P, A, B, C2)) {
      quadrante = "3";
    } else {
      return;
    }
  }
  $("#dotChart").attr("quadrante", quadrante);
}

// CHART.JS
function createFinalGraphs_RadarChart() {
  const radarChartCanvas = document.getElementById("radarChart");
  let radarChartData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  RadarChart = new Chart(radarChartCanvas, {
    type: "radar",
    data: {
      labels: [
        "CRᵉ₁",
        "CRᵉ₂",
        "CRᵉ₃",
        "R₁",
        "R₂",
        "R₃",
        "I₁",
        "I₂",
        "I₃",
        "A₁",
        "A₂",
        "A₃",
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
function updateFinalGraphs_RadarChart() {
  RadarChart.data.datasets[0].data = [
    AVG([CRIAR.criterios.contexto[0], CRIAR.criterios.resultados[0]]),
    AVG([CRIAR.criterios.contexto[1], CRIAR.criterios.resultados[1]]),
    AVG([CRIAR.criterios.contexto[2], CRIAR.criterios.resultados[2]]),
    CRIAR.criterios.recursos[0],
    CRIAR.criterios.recursos[1],
    CRIAR.criterios.recursos[2],
    CRIAR.criterios.ideias[0],
    CRIAR.criterios.ideias[1],
    CRIAR.criterios.ideias[2],
    CRIAR.criterios.acoes[0],
    CRIAR.criterios.acoes[1],
    CRIAR.criterios.acoes[2],
  ].map((x) => x * 10);
  RadarChart.update();
}

// AUX FUNCTIONS
function isInsideTriangle(P, A, B, C) {
  const triangle_area = calcTriangleArea(A, B, C);
  let sum_area = 0;
  sum_area += calcTriangleArea(A, B, P);
  sum_area += calcTriangleArea(A, C, P);
  sum_area += calcTriangleArea(B, C, P);

  if (triangle_area == sum_area) {
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

function AVG(arr) {
  let sum = 0;
  let i = 0;
  for (i; i < arr.length; i++) {
    sum += arr[i];
  }
  return Math.round((sum / i) * 1000) / 1000;
}
