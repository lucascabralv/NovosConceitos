function graphPreviewCRIAR() {
  // VARIÁVEIS GLOBAIS
  let Pilares = {
    contexto: 0,
    recursos: 0,
    ideias: 0,
    acoes: 0,
    resultados: 0,
  };
  let Eixos = {
    // Eficácia = Ideias + Ações
    x: 0,
    // Eficiência = Contexto + Recursos + Resultados
    y: 0,
  };
  // ELEMENTS
  const range_inputs = $(".input-range-criar");
  const dot_plot = $("#CRIAR_Graph_Dot_Plot");

  // FUNCTIONS
  function getRangeValue(pilar, value) {
    Pilares[pilar] = value;
  }

  function calcEixos() {
    let {contexto, recursos, ideias, acoes, resultados} = Pilares;
    Eixos.x = (ideias + acoes)/2;
	Eixos.y = (contexto + recursos + resultados)/3;
  }

  function changeDotVector(){
	dot_plot.css("left", Eixos.x + "%").css("bottom", Eixos.y + "%");
  }

  // EVENT LISTENERS
  range_inputs.on("change", function () {
    // Atualiza apenas o pilar que sofreu alteraçõa
    getRangeValue($(this).attr("input-bar"), parseInt($(this).val()));
	calcEixos();
	changeDotVector();
    //
    //todo Atualiza valor que fica no preview do slider
    //todo Atualiza posição do ponto no gráfico
    //todo Verifica em qual quadrante o ponto se localiza
  });
}
