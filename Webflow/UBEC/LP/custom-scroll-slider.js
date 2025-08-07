(function () {
  function inicializarGaleria(wrapper) {
    const galeria = wrapper.querySelector('[data-nc-slider="galeria"]');
    const setaDireita = wrapper.querySelector(
      '[data-nc-slider="seta direita"]'
    );
    const setaEsquerda = wrapper.querySelector(
      '[data-nc-slider="seta esquerda"]'
    );

    if (!galeria) return;

    const getCardWidth = () => {
      const card = galeria.querySelector("*");
      const gap = parseFloat(getComputedStyle(galeria).columnGap || 0);
      return card ? card.offsetWidth + gap : 0;
    };

    const atualizarSetas = () => {
      const scrollLeft = galeria.scrollLeft;
      const scrollMax = galeria.scrollWidth - galeria.clientWidth;

      if (setaEsquerda) {
        setaEsquerda.style.display = scrollLeft > 0 ? "flex" : "none";
      }

      if (setaDireita) {
        setaDireita.style.display =
          scrollLeft < scrollMax - 1 ? "flex" : "none";
      }
    };

    const ajustarScrollAposResize = () => {
      const cardWidth = getCardWidth();
      const indexAtual = Math.round(galeria.scrollLeft / cardWidth);
      galeria.scrollTo({ left: cardWidth * indexAtual, behavior: "auto" });
    };

    const ativarSlider = () => {
      // Inicializa setas
      atualizarSetas();

      galeria.addEventListener("scroll", atualizarSetas);

      if (setaDireita) {
        setaDireita.addEventListener("click", () => {
          galeria.scrollBy({ left: getCardWidth(), behavior: "smooth" });
        });
      }

      if (setaEsquerda) {
        setaEsquerda.addEventListener("click", () => {
          galeria.scrollBy({ left: -getCardWidth(), behavior: "smooth" });
        });

        // Oculta no carregamento
        setaEsquerda.style.display = "none";
      }

      window.addEventListener("resize", ajustarScrollAposResize);
    };

    // Verifica se os cards já existem
    if (galeria.children.length > 0) {
      ativarSlider();
    } else {
      // Observa mudanças no DOM até os cards serem carregados
      const observer = new MutationObserver((mutations, obs) => {
        if (galeria.children.length > 0) {
          ativarSlider();
          obs.disconnect(); // para de observar após carregar
        }
      });

      observer.observe(galeria, { childList: true });
    }
  }

  // Aplica em todas as galerias na página
  document.querySelectorAll('[data-nc-slider="wrapper"]').forEach((wrapper) => {
    inicializarGaleria(wrapper);
  });
})();