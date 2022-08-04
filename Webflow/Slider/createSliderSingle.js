/** createSliderSingle
 * Creates Slider in Div
 * Moves only one slide per click
 * @param {Element} slides 
 * @param {Element} leftControl 
 * @param {Element} rightControl 
 * @param {Boolean} hasKeepClass // 0 or 1
 * @param {Integer} delay // ms
 */
function createSliderSingle(slides, leftControl, rightControl, hasKeepClass = 0, delay){
  const slider = slides.parent();
  let initialItems = Math.floor(slider.width()/slides.outerWidth());

  if(slides.length-hasKeepClass > 1 && slides.length > initialItems){
    const MIN = 0;
    let MAX = slides.length - hasKeepClass - initialItems+1; 
    let WIDTH = slides.outerWidth();
    let index = 0;
    // Slider Auto Scroll
    let slideLoop;
    if(delay && delay > 0){
     slideLoop = setInterval(nextSlide, delay);
    }

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
    function resizeHandler(){ 
      initialItems = Math.floor(slider.width()/slides.outerWidth());
      MAX = slides.length - hasKeepClass - initialItems+1;
      WIDTH = slides.outerWidth(); 
      if(slides.length > initialItems){
        leftControl.css('display', 'block');
        rightControl.css('display', 'block');
      } else {
        leftControl.css('display', 'none');
        rightControl.css('display', 'none');
      }

      moveSlide() 
    }
    
    $(window).resize(() => {
    	resizeHandler();
    });

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
    leftControl.css('display', 'none');
    rightControl.css('display', 'none');
  }
};
