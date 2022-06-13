/**
 * Same as createSlider but moves all shown slides 
 * @param {Element} slides 
 * @param {Element} leftControl 
 * @param {Element} rightControl 
 * @param {Int} delay 
 */
function createSliderMult(slides, leftControl, rightControl, delay){
  if(slides.length > 1){

    const slider = slides.parent();
    const MIN = 0;
    let MAX = Math.ceil( slides.length / Math.floor( slider.width()/slides.width() ) ); 
    let WIDTH = slider.width();
    let index = 0;
    let slideLoop = setInterval(nextSlide, delay);
    
    function moveSlide(){ slides.css("right", index * WIDTH + "px"); }
    function nextSlide(){
      if(index + 1 < MAX){
        index++;
        moveSlide(); 
      } else { 
        index = MIN;
        moveSlide(); 
      }
    }
    function prevSlide(){
      if(index - 1 >= MIN){
        index--;
        moveSlide(); 
      } 
      else {
        index = MAX-1;
        moveSlide(); 
      }
    }
    // CONTROLS CLICK EVENT
    leftControl.click(function(){ prevSlide(); clearInterval(slideLoop); });
    rightControl.click(function(){ nextSlide(); clearInterval(slideLoop); });

    // RESIZE HANDLE
    function resizeEvent(){ 
      MAX = Math.ceil( slides.length / Math.floor( slider.width()/slides.width() ) ); 
      WIDTH = slider.width(); 
      index = MIN;
      moveSlide();
    }
    $(window).resize(resizeEvent);

    // MOBILE FINGER SWIPE DETECTION
    slider.on("touchstart", handleTouchStart);    
    slider.on('touchmove', handleTouchMove);
    let xDown = null;                                                        
    let yDown = null;
    function getTouches(evt) {
      return evt.touches ||  // browser API
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
    leftControl.remove();
    rightControl.remove();
  }
};