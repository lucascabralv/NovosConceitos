/**------------------------------------------------------------------------
 *h/                          1 DATABASE FUNCTIONS
 *------------------------------------------------------------------------**/

/* ----------------------------- CREATE MANHWA ---------------------------- */
async function createDBManhwa(manhwa) {
  const { data, error } = await database.from("Manhwas").insert([manhwa]);
  manhwas_db = manhwas_db.concat(data);
  localStorage.setItem("manhwas", JSON.stringify(manhwas_db));
}

/**--------------------------------------------
 *todo           UPDATE MANHWA
 *---------------------------------------------**/
async function updateDBManhwa(manhwa, id) {
  const { data, error } = await database
    .from("Manhwas")
    .update({
      nome: manhwa.nome,
      capitulo: parseInt(manhwa.capitulo),
      max_capitulo: parseInt(manhwa.max_capitulo),
      imagem: manhwa.imagem,
      url: manhwa.url,
      nota: parseInt(manhwa.nota),
      status: manhwa.status,
      tipo: manhwa.tipo,
    })
    .match({ id: id });
  return data;
}
//! GLOBAL VARIABLES
let current_manhwa_id = null;
let current_editing_manhwa = null;

/**--------------------------------------------
 *todo           DELETE MANHWA
 *---------------------------------------------**/

//note UPDATE E DELETE TEM QUE RESETAR O TEMPO LASTCALL PARA QUE CARREGUE A MUDANÇA NA HORA