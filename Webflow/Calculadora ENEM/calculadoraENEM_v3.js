function calculadoraENEM() {
  /**------------------------------------------------------------------------
   *h/                           FORMULÁRIO
   *------------------------------------------------------------------------**/
  // Variaveis
  let nota = 0;
  let modalidade = "Presencial";

  let nome = null;
  let sobrenome = null;
  let telefone = null;
  let email = null;
  let escolaridade = null;

  let interesse = null;
  let pretende = null;

  let desconto = 0;

  /**--------------------------------------------
   *h/               FIRST STEP
   *---------------------------------------------**/
  $(".range-slider-enem").on("input", function () {
    nota = $(this).val();
    $("#Nota-ENEM").val(nota);
    checkNota();
    desconto = calcDesconto(nota);
  });
  $("#Nota-ENEM").on("input", function () {
    nota = $(this).val();
    $(".range-slider-enem").val(nota);
    checkNota();
    desconto = calcDesconto(nota);
  });

  function checkNota() {
    if (nota < 10) {
      $("#Nota-ENEM").css("width", "30px");
    } else if (nota < 100) {
      $("#Nota-ENEM").css("width", "45px");
    } else if (nota < 1000) {
      $("#Nota-ENEM").css("width", "60px");
    } else if (nota == 1000) {
      $("#Nota-ENEM").css("width", "75px");
    } else {
      nota = 1000;
      $("#Nota-ENEM").val(1000);
      $(".range-slider-enem").val(1000);
      $("#Nota-ENEM").css("width", "120px");
    }
  }
  $("#Interesse-DP-ENEM .form-calc-dropdown-link[modalidade='EAD']").css(
    "display",
    "none"
  );

  $(".form-calc-modalidade").click(function () {
    if (!$(this).hasClass("selected")) {
      modalidade = $(this).text();
      $(".form-calc-modalidade").toggleClass("selected");
    }
    $("#Interesse-DP-ENEM .form-calc-dropdown-link").css("display", "block");
    if (modalidade == "EAD") {
      $(
        "#Interesse-DP-ENEM .form-calc-dropdown-link:not([modalidade='EAD'])"
      ).css("display", "none");
    } else {
      $("#Interesse-DP-ENEM .form-calc-dropdown-link[modalidade='EAD']").css(
        "display",
        "none"
      );
    }
  });

  /**--------------------------------------------
   *h/               SECOND STEP
   *---------------------------------------------**/

  $("#Name-ENEM").on("input", function () {
    nome = $(this).val();
    checkFields();
  });
  $("#Lastname-ENEM").on("input", function () {
    sobrenome = $(this).val();
    checkFields();
  });
  $("#Mobilephone-ENEM").on("input", function () {
    telefone = $(this).val();
    checkFields();
  });
  $("#Email-ENEM").on("input", function () {
    email = $(this).val();
    checkFields();
  });
  $("#Escolaridade-DP-ENEM .form-calc-dropdown-link").click(function () {
    $("#Escolaridade-DP-ENEM .form-calc-dropdown-link").removeClass("selected");
    $(this).addClass("selected");
    escolaridade = $(this).text();
    $("#Escolaridade-DP-ENEM .form-calc-dropdown-placeholder").text(
      escolaridade
    );
    checkFields();
    $(".w-dropdown-toggle").removeClass("w--open");
    $(".w-dropdown-list").removeClass("w--open");
  });

  /**--------------------------------------------
   *h/               THIRD PAGE
   *---------------------------------------------**/
  $("#Interesse-DP-ENEM .form-calc-dropdown-link").click(function () {
    $("#Interesse-DP-ENEM .form-calc-dropdown-link").removeClass("selected");
    $(this).addClass("selected");
    interesse = $(this).text();
    $("#Interesse-DP-ENEM .form-calc-dropdown-placeholder").text(interesse);
    checkFields();
    $(".w-dropdown-toggle").removeClass("w--open");
    $(".w-dropdown-list").removeClass("w--open");
  });
  $("#Pretende-DP-ENEM .form-calc-dropdown-link").click(function () {
    $("#Pretende-DP-ENEM .form-calc-dropdown-link").removeClass("selected");
    $(this).addClass("selected");
    pretende = $(this).text();
    $("#Pretende-DP-ENEM .form-calc-dropdown-placeholder").text(pretende);
    checkFields();
    $(".w-dropdown-toggle").removeClass("w--open");
    $(".w-dropdown-list").removeClass("w--open");
  });

  /**--------------------------------------------
   *h/               CHECK FIELDS
   *---------------------------------------------**/
  function checkFields() {
    if (nome && sobrenome && telefone && email && escolaridade) {
      $("input[name='modalidade']").val(modalidade);
      $("input[name='escolaridade']").val(escolaridade);
      $("input[name='desconto_enem']").val(desconto);
      $("#next-overflow-2").css("display", "none");
    }
    if (interesse && pretende) {
      $("input[name='graduacao_curso']").val(interesse);
      $("input[name='pretende_se_matricular_em_breve']").val(pretende);
      $("#next-overflow-3").css("display", "none");
    }
  }

  /**--------------------------------------------
   *h/               NEXT BUTTON
   *---------------------------------------------**/
  let WIDTH = $(".form-calc-page").outerWidth();
  let pageIndex = 0;

  $(".form-calc-next").click(nextSlide);

  function moveSlide() {
    $(".form-calc-page").css("left", -1 * pageIndex * 100 + "%");
  }
  function nextSlide() {
    pageIndex++;
    moveSlide();
  }
  // RESIZE HANDLE
  $(window).resize(() => {
    WIDTH = $(".form-calc-page").outerWidth();
    moveSlide();
  });

  /**--------------------------------------------
   *h/               NOTA ENEM
   *---------------------------------------------**/

  function calcDesconto(notaENEM) {
    let desconto = 0;
    switch (true) {
      case notaENEM <= 679:
        desconto = 40;
        break;
      case notaENEM <= 699:
        desconto = 50;
        break;
      case notaENEM <= 719:
        desconto = 60;
        break;
      case notaENEM <= 779:
        desconto = 70;
        break;
      case notaENEM <= 819:
        desconto = 80;
        break;
      default:
        desconto = 90;
        break;
    }
    return desconto;
  }

  $("#send-calc").click(function () {
    $("#success-desconto").text(desconto);
    $("#success-nome").text(nome);
  });

  $(".form-calc-wrapper input").on("keypress", function (e) {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  });
}