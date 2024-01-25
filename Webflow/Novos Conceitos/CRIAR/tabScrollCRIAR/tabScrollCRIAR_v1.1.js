function tabScrollCRIAR() {
  // CRIAR HANDLE PARA WINDOW RESIZE EM AMBAS AS FUNCOES -> changePositionSteps deve ser rodado sempre que alterar.

  // CÓDIGO BUGA AO ALTERAR DE DESKTOP PARA MOBILE OU VICE-VERSA

  // GLOBAL VARIABLES
  let total_progress;
  let currentViewport;

  // DESKTOP || MOBILE
  if (window.matchMedia("(min-width:991px)").matches) {
    // DESKTOP
    currentViewport = "Desktop";
  } else {
    // MOBILE
    currentViewport = "Mobile";
  }

  // SETUP FUNCTIONS
  changePositionSteps();
  scrollCRIAR();

  // EVENT - SCROLL PAGE
  document.addEventListener("scroll", () => {
    scrollCRIAR();
  });

  function scrollCRIAR() {
    const CONTAINER = document
      .getElementById("criar-wrapper")
      .getBoundingClientRect();
    const SECTION = document.getElementById("criar").getBoundingClientRect();
    if (CONTAINER.top < 0 && SECTION.top >= 0) {
      // Progresso Total do Scroll
      total_progress =
        ((-1 * CONTAINER.top) / (CONTAINER.height - SECTION.height)) * 100;
      switch (true) {
        case total_progress > 80: // R.esultados -> Current + Variando
          $("#tab_resultados").trigger("click");

          progressBarState(100, 100, 100, 100, calculateCurrentProgress(80));
          break;
        case total_progress > 60: // A.ções -> Current + Variando
          $("#tab_acoes").trigger("click");
          progressBarState(100, 100, 100, calculateCurrentProgress(60), 0);
          break;
        case total_progress > 40: // I.deias -> Current + Variando
          $("#tab_ideias").trigger("click");
          progressBarState(100, 100, calculateCurrentProgress(40), 0, 0);
          break;
        case total_progress > 20: // R.ecursos -> Current + Variando
          $("#tab_recursos").trigger("click");
          progressBarState(100, calculateCurrentProgress(20), 0, 0, 0);
          break;
        case total_progress >= 0: // C.ontexto -> Current + Variando
          $("#tab_contexto").trigger("click");
          progressBarState(calculateCurrentProgress(0), 0, 0, 0, 0);
          break;
      }
    }
  }

  function calculateCurrentProgress(min) {
    if (currentViewport === "Desktop") {
      return ((total_progress - min) / 20) * 100;
    } else {
      return -1;
    }
  }

  function progressBarState(
    w_contexto,
    w_recursos,
    w_ideias,
    w_acoes,
    w_resultados
  ) {
    if (currentViewport === "Desktop") {
      $("#p_contexto").width(w_contexto + "%");
      $("#p_recursos").width(w_recursos + "%");
      $("#p_ideias").width(w_ideias + "%");
      $("#p_acoes").width(w_acoes + "%");
      $("#p_resultados").width(w_resultados + "%");
    } else {
      // Se o valor for diferente de null, então será considerado 0, caso contrário será 100,
      // para que apenas o pilar atual seja selecionado
      $("#p_contexto").height(((w_contexto === -1 ) ? 100 : 0) + "%");
      $("#p_recursos").height((w_recursos === -1 ? 100 : 0) + "%");
      $("#p_ideias").height((w_ideias === -1 ? 100 : 0) + "%");
      $("#p_acoes").height((w_acoes === -1 ? 100 : 0) + "%");
      $("#p_resultados").height((w_resultados === -1 ? 100 : 0) + "%");
    }
  }

  // EVENT - CLICK TAB
  $(".tab-link-criar").on("click", function (evt) {
    if (evt.originalEvent) {
      const tab_name = $(this).attr("id").replace("tab_", "");
      $("html, body").animate(
        {
          scrollTop: $("#step_" + tab_name).offset().top,
        },
        200
      );
    }
  });

  function changePositionSteps() {
    //step_contexto já tem posição 0
    $("#step_recursos").css("top", calcPositionStep(0.21) + "px");
    $("#step_ideias").css("top", calcPositionStep(0.41) + "px");
    $("#step_acoes").css("top", calcPositionStep(0.61) + "px");
    $("#step_resultados").css("top", calcPositionStep(0.81) + "px");
  }
  function calcPositionStep(percent) {
    const containerH = document
      .getElementById("criar-wrapper")
      .getBoundingClientRect().height;
    let sectionH = document
      .getElementById("criar")
      .getBoundingClientRect().height;

    return Math.round((containerH - sectionH) * percent * 10) / 10;
  }
}
