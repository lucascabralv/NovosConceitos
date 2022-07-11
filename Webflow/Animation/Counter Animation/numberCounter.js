function numberCounter(objID, start, end, duration){
	let playAnimation = true;
	let obj = document.getElementById(objID);

	function animateValue(obj, start, end, duration) {
		let startTimestamp = null;
		const step = (timestamp) => {
			if (!startTimestamp) startTimestamp = timestamp;
			const progress = Math.min((timestamp - startTimestamp) / duration, 1);
			obj.innerHTML = Math.floor(progress * (end - start) + start);
			if (progress < 1) {
			window.requestAnimationFrame(step);
			}
		};
		window.requestAnimationFrame(step);
	}

	function isScrolledIntoView(elem) {
		var docViewTop = $(window).scrollTop();
		var docViewBottom = docViewTop + $(window).height();
		var elemTop = $(elem).offset().top;
		var elemBottom = elemTop + $(elem).height();
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}

	function inView() {
		if(playAnimation && isScrolledIntoView(obj)){
			animateValue(obj, start, end, duration);
			playAnimation = false;
		}
	}

	$(window).scroll(inView);
};