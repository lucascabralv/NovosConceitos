function clientesSlideAnimation(){
    let dir = true;
    var timeoutDesktop;
    var timeoutMobile;

    $(document).ready(startSlideAnimation);
    $(window).resize(()=>{
      resetPosition();
    });

    function startSlideAnimation(){
      if(isDesktop()){
        moveSlidesDesktop();
      } else {
        moveSlidesMobile();
      }
    }

    function resetPosition(){
      clearTimeout(timeoutDesktop);
      clearTimeout(timeoutMobile);
      $('.cl-clientes').css('transition', '0s linear');
      const slideOdd = $(".cl-clientes.column-odd");
      const slideEven = $(".cl-clientes.column-even");
      if(isDesktop()){
        slideEven.css('bottom', '0px');
        slideOdd.css('top', '0px');
        slideEven.css('right', 'auto');
        slideOdd.css('left', 'auto');
        slideEven.css('transition', 'bottom 30s linear');
        slideOdd.css('transition', 'top 30s linear');
      } else {
        slideEven.css('bottom', 'auto');
        slideOdd.css('top', 'auto');
        slideEven.css('right', '0px');
        slideOdd.css('left', '0px');

        slideEven.css('transition', 'right 30s linear');
        slideOdd.css('transition', 'left 30s linear');
      }
      dir = true;  
      startSlideAnimation();
    }

    function isDesktop(){
      if($(".desktop-tablet").css('display') == 'block'){
        return true;
      }
      return false;
    }

    function moveSlidesDesktop(){
      const wrapperHeight = $(".wrapper-clientes").height();
      const slideHeight = $(".cl-clientes").height();
      const maxMovement = slideHeight - wrapperHeight;
      const slideOdd = $(".cl-clientes.column-odd");
      const slideEven = $(".cl-clientes.column-even");

      if(dir){
        slideEven.css('bottom', (0-maxMovement) + 'px');
        slideOdd.css('top', (0-maxMovement) + 'px');
        // changes direction
        dir = false;
      } else {
        slideEven.css('bottom', '0px');
        slideOdd.css('top', '0px');
        // changes direction
        dir = true;
      }
      timeoutDesktop = setTimeout(moveSlidesDesktop, 30000);
    }

    function moveSlidesMobile(){
      const wrapperWidth = $(".wrapper-clientes").width();
      const slideWidth = $(".cl-clientes").width();
      const maxMovement = slideWidth - wrapperWidth;
      const slideOdd = $(".cl-clientes.column-odd");
      const slideEven = $(".cl-clientes.column-even");

      if(dir){
        slideEven.css('right', (0-maxMovement) + 'px');
        slideOdd.css('left', (0-maxMovement) + 'px');
        // changes direction
        dir = false;
      } else {
        slideEven.css('right', '0px');
        slideOdd.css('left', '0px');
        // changes direction
        dir = true;
      }
      timeoutMobile = setTimeout(moveSlidesMobile, 25000);
    }
  }
  clientesSlideAnimation();