function formScript(links) {
  if (
    $(".option-modalidade.w-condition-invisible").length ==
    $(".option-modalidade").length - 1
  ) {
    $("#text-formas-ingresso").removeClass("hidden");
    $(".option-modalidade").not(".w-condition-invisible").addClass("selected");
    showFormas();
    selectForm();
  }
  $(".option-modalidade").click(function () {
    $("#text-formas-ingresso").removeClass("hidden");
    if (!$(this).hasClass("selected")) {
      $(".formulario-button-inscricao").addClass("hidden");
      $(".option-modalidade").removeClass("selected");
      $(this).addClass("selected");
      $(".select-forma-extras").addClass("hidden");
      $(".option-forma").removeClass("selected");
      showFormas();
      selectForm();
    }
  });
  $(".option-forma").click(function () {
    if (!$(this).hasClass("selected")) {
      $(".option-forma").removeClass("selected");
      $(this).addClass("selected");
      selectForm();
    }
  });
  function showFormas() {
    if ($(".option-modalidade.selected").attr("data-modalidade") == 0) {
      $(".select-forma-extras.presencial.hidden").removeClass("hidden");
    } else if ($(".option-modalidade.selected").attr("data-modalidade") == 1) {
      $(".select-forma-extras.semipresencial.hidden").removeClass("hidden");
    } else if ($(".option-modalidade.selected").attr("data-modalidade") == 2) {
      $(".select-forma-extras.ead.hidden").removeClass("hidden");
    }
  }
  function selectForm() {
    if (
      $(".option-modalidade.selected").length &&
      $(".option-forma.selected").length
    ) {
      const modalidade = $(".option-modalidade.selected").attr(
        "data-modalidade"
      );
      const forma = $(".option-forma.selected").attr("data-forma");
      const link = links[modalidade][forma];
      $(".formulario-button-inscricao").attr("href", link);
      $(".formulario-button-inscricao").removeClass("hidden");
    }
    return false;
  }
}
