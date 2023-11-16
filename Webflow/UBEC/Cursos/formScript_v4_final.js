/**
 * @param {array} links -> array bidimensional com os links para os formulários
 * @param {array} isInteresse -> array com booleanos de cada formulário de interesse de cada modalidade
 * @param {array} buttonTexts → array com os textos do botão "inscreva-se" ou "tenho interesse"
 */
function formScript(links, isInteresse, buttonTexts, showFormas) {
  // Se tiver apenas uma modalidade disponível, já a seleciona automaticamente
  if (
    $(".option-modalidade.w-condition-invisible").length ==
    $(".option-modalidade").length - 1
  ) {
    $(".option-modalidade").not(".w-condition-invisible").addClass("selected");
    if (
      isInteresse[$(".option-modalidade.selected").attr("data-modalidade")] ==
      true
    ) {
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
  $(".option-modalidade").click(function () {
    // Se a modalide não estiver selecionada
    if (!$(this).hasClass("selected")) {
      $(".formulario-button-inscricao").addClass("hidden");
      $(".option-modalidade").removeClass("selected");
      $(this).addClass("selected");
      $(".select-forma-extras").addClass("hidden");
      $(".option-forma").removeClass("selected");
      if (
        isInteresse[$(".option-modalidade.selected").attr("data-modalidade")] ==
        true
      ) {
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
  // Será implementada no webflow, para editar futuras modalidades
  // function showFormas() {
  //   if ($(".option-modalidade.selected").attr("data-modalidade") == 0) {
  //     $(".select-forma-extras.presencial.hidden").removeClass("hidden");
  //   } else if ($(".option-modalidade.selected").attr("data-modalidade") == 1) {
  //     $(".select-forma-extras.semipresencial.hidden").removeClass("hidden");
  //   } else if ($(".option-modalidade.selected").attr("data-modalidade") == 2) {
  //     $(".select-forma-extras.ead.hidden").removeClass("hidden");
  //   }
  // }
  function selectForm() {
    // Botão de inscrição terá o texto "Inscreva-se"
    $(".formulario-button-inscricao").text(buttonTexts[0]);
    if (
      // Se MODALIDADE e FORMA DE INGRESSO estiverem selecionadas
      $(".option-modalidade.selected").length &&
      $(".option-forma.selected").length
    ) {
      const modalidade = $(".option-modalidade.selected").attr(
        "data-modalidade"
      );
      const forma = $(".option-forma.selected").attr("data-forma");
      // Altera o link, para a correspondente Modalidade e Forma de Ingresso
      const link = links[modalidade][forma];
      $(".formulario-button-inscricao").attr("href", link);
      $(".formulario-button-inscricao").removeClass("hidden");
    }
    return false;
  }
  function selectFormInteresse() {
    // Botão de inscrição terá o texto "Tenho interesse"
    $(".formulario-button-inscricao").text(buttonTexts[1]);
    const modalidade = $(".option-modalidade.selected").attr("data-modalidade");
    // O link para o formulário de interesse deve sempre estar em último
    const interesseIndex = links[modalidade].length - 1;
    const link = links[modalidade][interesseIndex];
    $(".formulario-button-inscricao").attr("href", link);
    $(".formulario-button-inscricao").removeClass("hidden");
  }
}
