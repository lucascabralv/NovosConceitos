function detectMutation(b,a){new MutationObserver(function(c){c.forEach(function(c){if(c.addedNodes&&c.addedNodes.length>0){let d;[].some.call(c.addedNodes,function(c){return d=c.querySelectorAll("#"+a+" "+b)})&&updateNewLinks(d)}})}).observe(document.getElementById(a),{attributes:!0,childList:!0,characterData:!0})}function updateNewLinks(c){new URL(window.location.href);for(let a=0;a<c.length;a++){let b=new URL(links[a].href),d=`${b.origin}${b.pathname}?${b.search.substring(1)}&${b.hash}`;c[a].href=d}}function updateLinks(d,e,f){new URL(window.location.href);let c=document.querySelectorAll("#"+e+" "+d);for(let a=f;a<c.length;a++){let b=new URL(links[a].href),g=`${b.origin}${b.pathname}?${b.search.substring(1)}&${b.hash}`;c[a].href=g}}function updateUTM(c){let a=c.LinkClass,b=c.CollectionListID,d=$("#"+b+" "+a).length;updateLinks(a,b,d-3),detectMutation(a,b)}


/**------------------------------------------------------------------------
 *!!!                           REFAZER MIN JS
 *------------------------------------------------------------------------**/