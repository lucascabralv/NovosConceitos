function createSliderJetboost(slidesClass, leftControl, rightControl, delay, onClickElements, onKeyUpElements, delayFilter){
    let slides = $(slidesClass); 
    // SLIDE FUNCTION
    if(slides.length > 1){
      const slider = slides.parent();
      const MIN = 0;
      let MAX = Math.ceil( slides.length / Math.floor( slider.width()/slides.outerWidth() ) ); 
      let WIDTH = slider.width();
      let index = 0;
      let slideLoop;
      let filterTimeOut;
      if(delay){
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
      function resizeEvent(){ 
        MAX = Math.ceil( slides.length / Math.floor( slider.width()/slides.width() ) ); 
        WIDTH = slider.width(); 
        index = MIN;
        moveSlide();
      }
      $(window).resize(resizeEvent);

      // FILTER HANDLER
      function filterChangeHandler(){
        slides = $(slidesClass); 
        MAX = Math.ceil( slides.length / Math.floor( slider.width()/slides.outerWidth() ) ); 
        index = MIN;
        moveSlide();
      };

      // FILTER CLICK HANDLER
      onClickElements.click(function(){
        clearTimeout(filterTimeOut);
        filterTimeOut = setTimeout(filterChangeHandler, delayFilter);
      });

      // FILTER KEYUP HANDLER
      onKeyUpElements.keyup(function(){
        clearTimeout(filterTimeOut);
        filterTimeOut = setTimeout(filterChangeHandler, delayFilter);
      });

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