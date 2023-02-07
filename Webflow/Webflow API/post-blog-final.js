/**--------------------------------------------
 *h/               FORMAT SLUG
 *---------------------------------------------**/
function formatSlug(name){
	return name
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove os acentos
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**--------------------------------------------
 *h/               FORMAT GALERIA
 *---------------------------------------------**/
function formatGaleriaImagens() {
  $("#Galeria").on("input", () => {
    let imagesArray = [];
    let imagesInput = $("#Galeria").val().trim().replaceAll(" ", "").split(";");
    for (let i = 0; i < imagesInput.length; i++) {
      if (imagesInput[i]) {
        const imagem = {
          url: `${imagesInput[i]}`,
          alt: "",
        };
        imagesArray.push(JSON.stringify(imagem));
      }
    }
  });
}
formatGaleriaImagens();


