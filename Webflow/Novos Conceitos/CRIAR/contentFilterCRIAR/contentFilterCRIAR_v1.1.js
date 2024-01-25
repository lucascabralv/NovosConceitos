// Pilares → "contexto" | "recursos" | "ideais" | "acoes" | "resultados"

function contentFilterCRIAR(pilar) {
  const tabPane = $(".tab-pane-criar[CRIAR='" + pilar + "']");
  const solucoes = tabPane.find(".c-item-solucoes");
  const contents = tabPane.find(".c-item-solucoes-content");

  // Inicializa
  selectSolucaoByIndex(0);

  // EVENTS
  solucoes.on("click", function () {
    //const index = $(this).index();
    //selectSolucaoByIndex(index);
	const name = $(this).attr("solucao");
	selectSolucaoByName(name);
  });

  // FUNCTIONS
  function selectSolucaoByIndex(index) {
    clearOldSelection();
    solucoes.eq(index).addClass("selected");
    contents.eq(index).addClass("selected");
  }
  function selectSolucaoByName(name) {
    clearOldSelection();
    contents.filter("[solucao='"+ name +"']").addClass("selected");
    solucoes.filter("[solucao='"+ name +"']").addClass("selected");
  }

  function clearOldSelection() {
    solucoes.removeClass("selected");
    contents.removeClass("selected");
  }
}
