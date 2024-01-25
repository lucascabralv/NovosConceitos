// Pilares → "contexto" | "recursos" | "ideais" | "acoes" | "resultados"

function contentFilterCRIAR(pilar){
	const tabPane = $(".tab-pane-criar[CRIAR='"+ pilar +"']");
	const filters = tabPane.find(".c-item-solucoes");
	const contents = tabPane.find(".c-item-solucoes-content");

	// Inicializa
	selectSolucao(0);

	// EVENTS
	filters.on('click', function(){
		const index = $(this).index();
		selectSolucao(index);
	});

	// FUNCTIONS
	function selectSolucao(index){
		clearOldSelection();
		filters.eq(index).addClass("selected");
		contents.eq(index).addClass("selected");
	}

	function clearOldSelection(){
		filters.removeClass("selected");
		contents.removeClass("selected");
	}
}