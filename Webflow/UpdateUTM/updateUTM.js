function detectMutation(lClass, clID) {
  let observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.addedNodes && mutation.addedNodes.length > 0) {
        let addedCards;
        let addedNewCards = [].some.call(mutation.addedNodes, function (el) {
          addedCards = el.querySelectorAll("#" + clID + " " + lClass);
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
  observer.observe(document.getElementById(clID), config);
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

function updateLinks(lClass, clID, alreadyUpdated) {
	let elArray = null;
	if(clID){
		elArray = document.querySelectorAll("#" + clID + " " + lClass);
	} else {
		elArray = document.querySelectorAll(lClass);
		alreadyUpdated = 0;
	}
  const pageURL = new URL(window.location.href);
  for (let i = alreadyUpdated; i < elArray.length; i++) {
    const elCurrentURL = new URL(elArray[i].href);
    const elNewURL = `${elCurrentURL.origin}${
      elCurrentURL.pathname
    }?${pageURL.search.substring(1)}&${elCurrentURL.hash}`;
    elArray[i].href = elNewURL;
  }
}

function updateCollectionUTM(obj) {
  const { LinkClass: lClass, CollectionListID: clID, InitialItems: iItems } = obj;
  let el_length = $("#" + clID + " " + lClass).length;
  updateLinks(lClass, clID, iItems);
  detectMutation(lClass, clID);
}
function updateNormalLinkUTM(obj){
	const { LinkClass: lClass, CollectionListID: clID} = obj;
	updateLinks(lClass);
}


function updateUTM(objArray){
	objArray.forEach(function(obj){
		if(obj.isCollection){
			updateCollectionUTM(obj);
		} else {
			updateNormalLinkUTM(obj);
		}
	});
}
// Formato para alterar UTM em links dentro de collection
// A função verifica se elementos novos foram carregados dentro da collection
const treinamentos = {
  LinkClass: ".compra", // Sempre colocar a classe com o . antes
  CollectionListID: "treinamentos", // Nunca colocar a # antes do ID
  InitialItems: 3, // Itens da collection que mostram junto da classe
  isCollection: true, // true se for uma collection CMS, false se for para links simples
};

// Formato de objeto para alterar UTM em todos os links com a classe
// A função é executada após a página carregada
const linkCompra = { // Nesse caso, ele está atualizando todos os elementos carregados inicialmente na collection
	LinkClass: ".compra",
	isCollection: false,
}

updateUTM([treinamentos, linkCompra]);
