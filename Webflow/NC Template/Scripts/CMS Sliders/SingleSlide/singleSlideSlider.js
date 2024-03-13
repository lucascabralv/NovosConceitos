function singleSlideSlider(
  SWrapper_Id /* Banner Wrapper ID */,
  CItem_Class /* Collection Item Class */,
  PArrowLeft_Class,
  PArrowRight_Class,
  LoopInterval,
  EmptyRemovals
) {
  let Slider = {
    items: $(SWrapper_Id + " " + CItem_Class),
    left: $(SWrapper_Id + " " + PArrowLeft_Class),
    right: $(SWrapper_Id + " " + PArrowRight_Class),
    index: 0,
    get width() {
      return this.items.outerWidth();
    },
    get length() {
      return this.items.length;
    }
  };

  if(Slider.length === 0){
	// Remove elements if empty
	$(EmptyRemovals).remove();
	return;
  } else if(Slider.length === 1){
	// Remove arrows if 
	Slider.left.remove();
	Slider.right.remove();
	return;
  }

  // Slider Auto Scroll
  let slideLoop;
  if (LoopInterval && LoopInterval > 0) {
    slideLoop = setInterval(moveSlide(1), LoopInterval);
  }

  Slider.right.click(() => {
    moveSlide(1);
    //clearInterval(slideLoop);
  });
  Slider.left.click(() => {
    moveSlide(-1);
    //clearInterval(slideLoop);
  });

  function moveSlide(direction) {
    Slider.index += direction;
    Slider.index =
      Slider.index < 0
        ? Slider.length-1
        : Slider.index < Slider.length
        ? Slider.index
        : 0;
    Slider.items.css("right", Slider.index * Slider.width + "px");
  }
  $(window).resize((evt) => {
    moveSlide(0);
  });

  // MOBILE FINGER SWIPE DETECTION
  Slider.items.on("touchstart", handleTouchStart);
  Slider.items.on("touchmove", handleTouchMove);
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
        moveSlide(1);
      } else {
        moveSlide(-1);
      }
      //clearInterval(slideLoop);
    }
    /* reset values */
    xDown = null;
    yDown = null;
  }
}