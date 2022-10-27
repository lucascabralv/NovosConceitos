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
$(".range-slider").on("input", function () {
  nota = $(this).val();
  $("#Nota").val(nota);
  checkNota();
  desconto = calcDesconto(nota);
});
$("#Nota").on("input", function () {
  nota = $(this).val();
  $(".range-slider").val(nota);
  checkNota();
  desconto = calcDesconto(nota);
});

function checkNota() {
  if (nota < 10) {
    $("#Nota").css("width", "30px");
  } else if (nota < 100) {
    $("#Nota").css("width", "45px");
  } else if (nota < 1000) {
    $("#Nota").css("width", "60px");
  } else if (nota == 1000) {
    $("#Nota").css("width", "75px");
  } else {
    nota = 1000;
    $("#Nota").val(1000);
    $(".range-slider").val(1000);
    $("#Nota").css("width", "120px");
  }
}
$("#Interesse-DP .form-calc-dropdown-link[modalidade='EAD']").css(
  "display",
  "none"
);

$(".form-calc-modalidade").click(function () {
  if (!$(this).hasClass("selected")) {
    modalidade = $(this).text();
    $(".form-calc-modalidade").toggleClass("selected");
  }
  $("#Interesse-DP .form-calc-dropdown-link").css("display", "block");
  if (modalidade == "EAD") {
    $("#Interesse-DP .form-calc-dropdown-link:not([modalidade='EAD'])").css(
      "display",
      "none"
    );
  } else {
    $("#Interesse-DP .form-calc-dropdown-link[modalidade='EAD']").css(
      "display",
      "none"
    );
  }
});

/**--------------------------------------------
 *h/               SECOND STEP
 *---------------------------------------------**/

$("#name").on("input", function () {
  nome = $(this).val();
  checkFields();
});
$("#lastname").on("input", function () {
  sobrenome = $(this).val();
  checkFields();
});
$("#mobilephone").on("input", function () {
  telefone = $(this).val();
  checkFields();
});
$("#Email").on("input", function () {
  email = $(this).val();
  checkFields();
});
$("#Escolaridade-DP .form-calc-dropdown-link").click(function () {
  $("#Escolaridade-DP .form-calc-dropdown-link").removeClass("selected");
  $(this).addClass("selected");
  escolaridade = $(this).text();
  $("#Escolaridade-DP .form-calc-dropdown-placeholder").text(escolaridade);
  checkFields();
  $(".w-dropdown-toggle").removeClass("w--open");
  $(".w-dropdown-list").removeClass("w--open");
});

/**--------------------------------------------
 *h/               THIRD PAGE
 *---------------------------------------------**/
$("#Interesse-DP .form-calc-dropdown-link").click(function () {
  $("#Interesse-DP .form-calc-dropdown-link").removeClass("selected");
  $(this).addClass("selected");
  interesse = $(this).text();
  $("#Interesse-DP .form-calc-dropdown-placeholder").text(interesse);
  checkFields();
  $(".w-dropdown-toggle").removeClass("w--open");
  $(".w-dropdown-list").removeClass("w--open");
});
$("#Pretende-DP .form-calc-dropdown-link").click(function () {
  $("#Pretende-DP .form-calc-dropdown-link").removeClass("selected");
  $(this).addClass("selected");
  pretende = $(this).text();
  $("#Pretende-DP .form-calc-dropdown-placeholder").text(pretende);
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
  $(".form-calc-page").css("left", -1 * pageIndex * WIDTH + "px");
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

function calcDesconto(notaENEM){
  let desconto = 0;
  switch (true) {
    case notaENEM <= 450: 
      desconto = 20;
      break;
    case notaENEM <= 700: 
      desconto = 50;
      break;
    default:
      desconto = 65;
      break;
  }
  return desconto;
}

$("#send-calc").click(function(){
  $("#success-desconto").text(desconto);
  $("#success-nome").text(nome);
});