const options = {
  method: "POST",
  headers: { accept: "application/json", "content-type": "application/json" },
  body: JSON.stringify({
    fields: {
      _archived: false,
      _draft: false,
      slug: "", // NAME WITH REPLACED LETTERS // TESTAR CRIANDO UM NOVO ITEM E VER COMO O WEBFLOW SUBSTITUI
      name: "", // PLAIN TEXT
      destaque: false, // BOOLEAN
      "desabilitar-sumario": false, // BOOLEAN
      "breve-resumo": "", // PLAIN TEXT
      counteudo: "", // RICH TEXT
      tags: ["", ""], // ARRAY OF CMS ITEM ID
      imagem: {
        url: "",
        alt: "",
      },
      "unidades-2": "", // CMS ITEM ID
      categoria: "", // CMS ITEM ID
      cta: "", // CMS ITEM ID
      autor: "", // CMS ITEM ID
      "galeria-de-imagens": [
        {
          url: "",
          alt: "",
        },
        {
          url: "",
          alt: "",
        },
      ],
	  
    },
  }),
};

fetch(
  "https://api.webflow.com/collections/630692f12caa0f661c8d2425/items?live=true&access_token=6abe0af8c6cd7d1cc932cbfe17e24795bd20bad0df02d5d910ea4fa4bbc6ed7f",
  options
)
  .then((response) => response.json())
  .then((response) => console.log(response))
  .catch((err) => console.error(err));
