(function () {
  function inicializarPopupCursos() {
    const popupWrapper = document.querySelector('[data-nc-popup="popup-wrapper"]');
    const popupContent = document.querySelector('[data-nc-popup="popup-content"]');
    const overlay = document.querySelector('[data-nc-popup="overlay"]');
    const closeButton = document.querySelector('[data-nc-popup="close-button"]');
    const cards = document.querySelectorAll('[data-nc-popup="card"]');

    if (!popupWrapper || !popupContent || !overlay || !closeButton || !cards.length) return;

    let scrollPosition = 0;

    function disableScroll() {
      scrollPosition = window.pageYOffset;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.overflow = 'hidden';
      document.body.style.width = '100%';
    }

    function enableScroll() {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.overflow = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollPosition);
    }

    function abrirPopup(html) {
      popupContent.innerHTML = html;
      popupWrapper.classList.remove('hidden');
      disableScroll();
    }

    function fecharPopup() {
      popupWrapper.classList.add('hidden');
      popupContent.innerHTML = '';
      enableScroll();
    }

    cards.forEach(card => {
      const cardContent = card.querySelector('[data-nc-popup="card-content"]');
      const temConteudo = cardContent && cardContent.innerHTML.trim() !== "";

      card.style.cursor = temConteudo ? 'pointer' : 'default';

      if (!temConteudo) return;

      card.addEventListener('click', () => {
        abrirPopup(cardContent.innerHTML);
      });
    });

    overlay.addEventListener('click', fecharPopup);
    closeButton.addEventListener('click', fecharPopup);
  }

  document.addEventListener('DOMContentLoaded', inicializarPopupCursos);
})();