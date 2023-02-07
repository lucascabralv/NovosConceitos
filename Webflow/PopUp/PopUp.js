function createPopUp(elOpen, elClose){
	
	$(elOpen).click(function(){
    	$(this).siblings('.popup-arquivo-wrapper.hidden').removeClass('hidden');
		disableScroll();
	});
	$(elClose).click(function(){
		$(this).parents(".popup-arquivo-wrapper").addClass("hidden");
		enableScroll();
	});

	var $body = $(document.body);
	var scrollPosition = 0;

	function enableScroll(){
		if ($body.css("overflow") != "hidden") {
			scrollPosition = window.pageYOffset;
		}
		$body.css("overflow", "");
		$body.css("position", "");
		$body.css("top", "");
		$body.width("");
		$(window).scrollTop(scrollPosition);
	}

	function disableScroll(){
		var oldWidth = $body.innerWidth();
		scrollPosition = window.pageYOffset;
		$body.css("overflow", "hidden");
		$body.css("position", "fixed");
		$body.css("top", `-${scrollPosition}px`);
		$body.width(oldWidth);
	}

}