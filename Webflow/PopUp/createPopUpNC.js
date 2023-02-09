function createPopUpNC(elOpen, elClose, popUpWrapper) {
  $(elOpen).click(function () {
    $(this).siblings(popUpWrapper).removeClass("hidden");
    disableScroll();
  });
  $(elClose).click(function () {
    $(this).parents(popUpWrapper).addClass("hidden");
    enableScroll();
  });

  var $body = $(document.body);
  var scrollPosition = 0;

  function enableScroll() {
    if ($body.css("overflow") != "hidden") {
      scrollPosition = window.pageYOffset;
    }
    $body.css("overflow", "");
    $body.css("position", "");
    $body.css("top", "");
    $body.width("");
    $(window).scrollTop(scrollPosition);
  }

  function disableScroll() {
    var oldWidth = $body.innerWidth();
    scrollPosition = window.pageYOffset;
    $body.css("overflow", "hidden");
    $body.css("position", "fixed");
    $body.css("top", `-${scrollPosition}px`);
    $body.width(oldWidth);
  }
}