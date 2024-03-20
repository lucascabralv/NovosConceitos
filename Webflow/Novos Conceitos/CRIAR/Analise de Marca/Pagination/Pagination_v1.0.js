function Pagination() {
  //todo -> Verificar se usuário já completou a análise e paginar direto para o resultado.
  //todo -> Opção do usuário editar suas respostas após estar completo
  let Slider = {
    items: $("#container_analise .page-analise"),
    left: $(".page-analise [pagination-direction='previous']"),
    right: $(".page-analise [pagination-direction='next']"),
    index: 0,
    get width() {
      return this.items.outerWidth();
    },
    get length() {
      return this.items.length;
    },
  };

  Slider.right.click(() => {
    moveSlideToDirection(1);
    //clearInterval(slideLoop);
  });
  Slider.left.click(() => {
    moveSlideToDirection(-1);
    //clearInterval(slideLoop);
  });

  function moveSlideToDirection(direction) {
    Slider.index +=
      Slider.index + direction >= 0 && Slider.index + direction < Slider.length
        ? direction
        : 0;
    moveSlide();
  }
  function moveSlideToIndex(index) {
    Slider.index =
      index && index >= 0 && index < Slider.length ? index : Slider.index;
    moveSlide();
  }
  function moveSlide() {
    Slider.items.css("right", Slider.index * Slider.width + "px");
  }

  $(window).resize(() => {
    moveSlide(); // Will keep slide in current page
  });
}
Pagination();