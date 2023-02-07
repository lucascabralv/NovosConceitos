function detectMutation(e){let t;new MutationObserver(function(e){e.forEach(function(e){if(e.addedNodes&&e.addedNodes.length>0){let t;[].some.call(e.addedNodes,function(e){return t=e.querySelectorAll("a")})&&updateNewLinks(t)}})}).observe(e,{attributes:!0,childList:!0,characterData:!0})}function updateNewLinks(e){let t=new URL(window.location.href);for(let n=0;n<e.length;n++){let l=new URL(e[n].href),o=`${l.origin}${l.pathname}?${t.search.substring(1)}&${l.hash}`;e[n].href=o}}function updateStaticLinksUTM(e){let t=document.querySelectorAll(e),n=new URL(window.location.href);for(let l=0;l<t.length;l++){let o=new URL(t[l].href),a=`${o.origin}${o.pathname}?${n.search.substring(1)}&${o.hash}`;t[l].href=a}}function updateCollectionsUTM(){let e=document.querySelectorAll(".w-dyn-items");for(let t=0,n;n=e[t];t++)detectMutation(n)}

//note: Adiciona a UTM a todos os links de collection carregados ao clicar em "Veja mais", Paginações, etc. 
//! OBS: Os links de elementos da collection que já aparecem quando a página é carregada não são alterados. Exemplo: os 3 itens da collection Treinamentos que ficam aparentes quando a página inicialamente.
// Em resumo, essa função altera apenas os link que são adicionados, ao corpo do site (HTML DOM), posteriormente ao carregamento padrão do site.
updateCollectionsUTM();

//note: Adiciona a UTM a todos os links com a classe "compra" que já aparecem quando a página é carregada.
//!OBS: Inclui os links de elementos da collection que já aparecem quando a página é carregada. Exemplo: os 3 itens da collection Treinamentos.
// Em resumo, essa função altera todos os links de elementos que já estão no corpo do site (HTML DOM).
updateStaticLinksUTM(".compra");
