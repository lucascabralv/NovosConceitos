function detectMutation(collection) {
  let observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        let addedCards;
        let addedNewCards = [].some.call(mutation.addedNodes, function (el) {
          addedCards = el.querySelectorAll('a');
          return addedCards;
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
    characterData: true,
  };
  observer.observe(collection, config);
}

function updateNewLinks(elArray) {
  const pageURL = new URL(window.location.href);
  for (let i = 0; i < elArray.length; i++) {
    const elCurrentURL = new URL(elArray[i].href);
    const elNewURL = `${elCurrentURL.origin}${
      elCurrentURL.pathname
    }?${pageURL.search.substring(1)}&${elCurrentURL.hash}`;
    elArray[i].href = elNewURL;
  }
}

function updateStaticLinksUTM(lClass) {
  const elArray = document.querySelectorAll(lClass);
  const pageURL = new URL(window.location.href);
  for (let i = 0; i < elArray.length; i++) {
    const elCurrentURL = new URL(elArray[i].href);
    const elNewURL = `${elCurrentURL.origin}${
      elCurrentURL.pathname
    }?${pageURL.search.substring(1)}&${elCurrentURL.hash}`;
    elArray[i].href = elNewURL;
  }
}

function updateCollectionsUTM() {
	let collections = document.querySelectorAll(".w-dyn-items");
	for (let i = 0, element; (element = collections[i]); i++) {
		detectMutation(element);
	}
}


updateCollectionsUTM(); 
updateStaticLinksUTM('.compra');

