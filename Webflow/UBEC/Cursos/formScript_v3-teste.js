function formScript(links, isInteresse, buttonTexts) {
  const modalidadeOption = ".option-modalidade",
    modalidadeInvisible = ".option-modalidade.w-condition-invisible",
    modalidadeSelected = ".option-modalidade.selected",
    wInvisible = ".w-condition-invisible",
    formButton = ".formulario-button-inscricao";

  // Se tiver apenas uma modalidade disponível, já a seleciona automaticamente
  if ($(modalidadeInvisible).length == $(modalidadeOption).length - 1) {
    $(modalidadeOption).not(wInvisible).addClass("selected");
    if (isInteresse[$(modalidadeSelected).attr("data-modalidade")] == true) {
      // Se formulário de interesse estiver ativo, não mostra as formas
      selectFormInteresse();
    } else {
      // Mostra o texto "Selecione forma de ingresso"
      $("#text-formas-ingresso").removeClass("hidden");
      showFormas();
      selectForm();
    }
  }
  // Clique na MODALIDADE
  $(modalidadeOption).click(function () {
    // Se a modalide não estiver selecionada
    if (!$(this).hasClass("selected")) {
      $(formButton).addClass("hidden");
      $(modalidadeOption).removeClass("selected");
      $(this).addClass("selected");
      $(".select-forma-extras").addClass("hidden");
      $(".option-forma").removeClass("selected");
      if (isInteresse[$(modalidadeSelected).attr("data-modalidade")] == true) {
        // Se formulário de interesse estiver ativo, não mostra as formas
        selectFormInteresse();
      } else {
        // Mostra o texto "Selecione forma de ingresso"
        $("#text-formas-ingresso").removeClass("hidden");
        showFormas();
        selectForm();
      }
    }
  });
  $(".option-forma").click(function () {
    if (!$(this).hasClass("selected")) {
      $(".option-forma").removeClass("selected");
      $(this).addClass("selected");
      selectForm();
    }
  });
  // Mostra as formas de ingresso, baseando-se em qual modalidade está selecionada
  function showFormas() {
    if ($(modalidadeSelected).attr("data-modalidade") == 0) {
      $(".select-forma-extras.presencial.hidden").removeClass("hidden");
    } else if ($(modalidadeSelected).attr("data-modalidade") == 1) {
      $(".select-forma-extras.semipresencial.hidden").removeClass("hidden");
    } else if ($(modalidadeSelected).attr("data-modalidade") == 2) {
      $(".select-forma-extras.ead.hidden").removeClass("hidden");
    }
  }
  function selectForm() {
    // Botão de inscrição terá o texto "Inscreva-se"
    $(formButton).text(buttonTexts[0]);
    if (
      // Se MODALIDADE e FORMA DE INGRESSO estiverem selecionadas
      $(modalidadeSelected).length &&
      $(".option-forma.selected").length
    ) {
      const modalidade = $(modalidadeSelected).attr("data-modalidade");
      const forma = $(".option-forma.selected").attr("data-forma");
      // Altera o link, para a correspondente Modalidade e Forma de Ingresso
      const link = links[modalidade][forma];
      $(formButton).attr("href", link);
      $(formButton).removeClass("hidden");
    }
    return false;
  }
  function selectFormInteresse() {
    // Botão de inscrição terá o texto "Tenho interesse"
    $(formButton).text(buttonTexts[1]);
    const modalidade = $(modalidadeSelected).attr("data-modalidade");
    // O link para o formulário de interesse deve sempre estar em último
    const interesseIndex = links[modalidade].length - 1;
    const link = links[modalidade][interesseIndex];
    $(formButton).attr("href", link);
    $(formButton).removeClass("hidden");
  }
}
