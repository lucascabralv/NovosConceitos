/** createSlider
 * Creates Slider in Div
 * Moves only one slide per click
 * @param {Element} slides 
 * @param {Element} leftControl 
 * @param {Element} rightControl 
 * @param {Boolean} hasKeepClass // 0 or 1
 * @param {Integer} delay // ms
 * @param {String} currentClass // class to add to current slider
 */
function createSlider(slides, leftControl, rightControl, hasKeepClass, delay, currentClass){
  if(slides.length-hasKeepClass > 1){
    slides.eq(0).addClass(currentClass);
    const slider = slides.parent();
    const MIN = 0;
    const MAX = slides.length - hasKeepClass; 
    let WIDTH = slider.width();
    let index = 0;
    let slideLoop = setInterval(nextSlide, delay);
    
    function moveSlide(){ slides.css("right", index * WIDTH + "px"); }
    function nextSlide(){
      if(index + 1 < MAX){
        slides.eq(index).removeClass(currentClass);
        index++;
        slides.eq(index).addClass(currentClass); 
        moveSlide(); 
      } else { 
        slides.eq(index).removeClass(currentClass);
        index = MIN;
        slides.eq(index).addClass(currentClass); 
        moveSlide(); 
      }
    }
    function prevSlide(){
      if(index - 1 >= MIN){
        slides.eq(index).removeClass(currentClass);
        index--;
        slides.eq(index).addClass(currentClass); 
        moveSlide(); 
      } 
      else {
        slides.eq(index).removeClass(currentClass);
        index = MAX-1;
        slides.eq(index).addClass(currentClass);
        moveSlide(); 
      }
    }
    // CONTROLS CLICK EVENT
    leftControl.click(function(){ prevSlide(); clearInterval(slideLoop); });
    rightControl.click(function(){ nextSlide(); clearInterval(slideLoop); });

    // RESIZE HANDLE
    function getCardWidth(){ WIDTH = slider.width(); moveSlide() }
    $(window).resize(getCardWidth);

    // MOBILE FINGER SWIPE DETECTION
    slider.on("touchstart", handleTouchStart);    
    slider.on('touchmove', handleTouchMove);
    let xDown = null;                                                        
    let yDown = null;
    function getTouches(evt) {
      return evt.touches ||             // browser API
        evt.originalEvent.touches; // jQuery
    }                                                     
    function handleTouchStart(evt) {
      const firstTouch = getTouches(evt)[0];                                      
      xDown = firstTouch.clientX;                                      
      yDown = firstTouch.clientY;                                      
    };                                                
    function handleTouchMove(evt) {
      if ( ! xDown || ! yDown ) { return; }
      let xUp = evt.touches[0].clientX;                                    
      let yUp = evt.touches[0].clientY;
      let xDiff = xDown - xUp;
      let yDiff = yDown - yUp;
      if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        if ( xDiff > 0 ) { nextSlide(); clearInterval(slideLoop); }
        else { prevSlide(); clearInterval(slideLoop); }                       
      }
      /* reset values */
      xDown = null;
      yDown = null;                                             
    };
  } else {
    slides.eq(0).addClass(currentClass);
    leftControl.remove();
    rightControl.remove();
  }
};