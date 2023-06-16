SelectFilial(0); // Seleciona os primeiros itens

$(".c-item-filiais").click(function () {
  const filialIndex = $(this).index();
  SelectFilial(filialIndex);
  if (window.matchMedia("(min-width: 768px)").matches) {
    ScrollToFilial($(this));
  } else {
    ScrollToFilial($(".c-item-filial-info:eq(" + filialIndex + ")"));
  }
});

function ScrollToFilial(scrollTarget, delay = 300, offSet = 80) {
  setTimeout(() => {
    const y = scrollTarget[0].getBoundingClientRect().top + window.scrollY;
    window.scroll({
      top: y - offSet,
      behavior: "smooth",
    });
  }, delay);
}

function SelectFilial(index) {
  $(".c-item-filiais, .c-item-filial-info").removeClass("selected");
  $(`.c-item-filiais:eq(${index}), .c-item-filial-info:eq(${index})`).addClass(
    "selected"
  );
}
