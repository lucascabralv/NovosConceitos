function Slider(obj) {
  const {
    $slides,
    $previous_button,
    $next_button,
    delay,
    initial_index = 0,
    current_item_class = "",
  } = obj;

  $(document).ready(() => {
    if ($slides.length <= 1) {
      $slides.eq(initial_index).addClass(current_item_class);
      $previous_button.remove();
      $next_button.remove();
      return;
    }

    // Global Variables
    const $slider = $slides.parent();
    const MIN = 0;
    const MAX = $slides.length;
    let WIDTH = $slider.width();
    let index = initial_index;
    let slide_loop = delay ? setInterval(nextSlide, delay) : null;

    $slider.attr("delay", slide_loop);
    $slider.attr("initial_index", initial_index);
    $slider.attr("slide-width", WIDTH);

    // Initial Function
    moveSlide();

	// Slide Functions
    function changeSlideClass(new_index_value) {
      $slides.eq(index).removeClass(current_item_class);
      index = new_index_value;
      $slides.eq(index).addClass(current_item_class);
    }

    // Slide Movement Functions
    function moveSlide() {
      $slides.css("right", index * WIDTH + "px");
    }

    function nextSlide() {
      const movement = index + 1 < MAX ? index + 1 : MIN;
      changeSlideClass(movement);
      moveSlide();
    }

    function prevSlide() {
      const movement = index - 1 >= MIN ? index - 1 : MAX - 1;
      changeSlideClass(movement);
      moveSlide();
    }

    // CONTROLS CLICK EVENT
    $previous_button.click(function () {
      prevSlide();
      clearInterval(slide_loop);
    });
    $next_button.click(function () {
      nextSlide();
      clearInterval(slide_loop);
    });

    // RESIZE HANDLE
    function getCardWidth() {
      WIDTH = $slider.width();
      moveSlide();
    }
    $(window).resize(getCardWidth);

    // MOBILE FINGER SWIPE DETECTION
    $slider.on("touchstart", handleTouchStart);
    $slider.on("touchmove", handleTouchMove);
    let xDown = null;
    let yDown = null;
    function getTouches(evt) {
      return (
        evt.touches || // browser API
        evt.originalEvent.touches
      ); // jQuery
    }
    function handleTouchStart(evt) {
      const firstTouch = getTouches(evt)[0];
      xDown = firstTouch.clientX;
      yDown = firstTouch.clientY;
    }
    function handleTouchMove(evt) {
      if (!xDown || !yDown) {
        return;
      }
      let xUp = evt.touches[0].clientX;
      let yUp = evt.touches[0].clientY;
      let xDiff = xDown - xUp;
      let yDiff = yDown - yUp;
      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          nextSlide();
          clearInterval(slide_loop);
        } else {
          prevSlide();
          clearInterval(slide_loop);
        }
      }
      /* reset values */
      xDown = null;
      yDown = null;
    }
  });
}
