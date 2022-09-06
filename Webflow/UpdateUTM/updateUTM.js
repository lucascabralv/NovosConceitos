function detectMutation(lClass, clID){
	let observer = new MutationObserver(function(mutations) {
	    mutations.forEach(function(mutation) {
	        if (mutation.addedNodes && mutation.addedNodes.length > 0) {
	        	let addedCards;
	            let addedNewCards = [].some.call(mutation.addedNodes, function(el) {
	            	addedCards =  el.querySelectorAll('#' + clID + ' ' + lClass);
	                return addedCards
	            });
	            if (addedNewCards) {
					updateNewLinks(addedCards);
				}
	        }
	    });
	});
	const config = {
	    attributes: true,
	    childList: true,
	    characterData: true
	};
	observer.observe(document.getElementById(clID), config);
}

function updateNewLinks(elArray){
	const pageURL = new URL(window.location.href);
	for(let i = 0; i < elArray.length; i++){
        const elCurrentURL = new URL(links[i].href);
        const elNewURL = `${elCurrentURL.origin}${elCurrentURL.pathname}?${elCurrentURL.search.substr(1)}&${elCurrentURL.hash}`;
        elArray[i].href = elNewURL;
	}
}

function updateLinks(lClass, clID, alreadyUpdated){
	const pageURL = new URL(window.location.href);
	const elArray = document.querySelectorAll('#' + clID + ' ' + lClass);
	for(let i = alreadyUpdated; i < elArray.length; i++){
        const elCurrentURL = new URL(links[i].href);
        const elNewURL = `${elCurrentURL.origin}${elCurrentURL.pathname}?${elCurrentURL.search.substr(1)}&${elCurrentURL.hash}`;
        elArray[i].href = elNewURL;
	}
}

function updateUTM(obj){
	const lClass = obj.LinkClass;
	const clID = obj.CollectionListID;
	let el_length = $('#' + clID + ' ' + lClass).length;
	updateLinks(lClass, clID, (el_length-3));
	detectMutation(lClass, clID);
}