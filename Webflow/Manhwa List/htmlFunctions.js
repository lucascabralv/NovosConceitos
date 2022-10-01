/**------------------------------------------------------------------------
 *h/                         2 HTML FUNCTIONS
 *------------------------------------------------------------------------**/

/**----------------------
 *note    CREATE
 *------------------------**/
/* ------------------------ GET INPUT FROM ADD FORM ----------------------- */
function getAddInputValues() {
  return {
    nome: $("#nome").val(),
    capitulo: $("#capitulo").val(),
    max_capitulo: $("#max_capitulo").val(),
    imagem: $("#imagem").val(),
    url: $("#url").val(),
    nota: $("#nota").val(),
    status: $("#status").val(),
    tipo: $("#tipo").val(),
  };
}
/* ------------------------ CREATE HTML CARD ----------------------- */
function createCard(manhwa) {
  // t = template
  const t = document.querySelector("#manhwa-template");
  const tc = t.content;
  // Set ID
  tc.querySelector(".manhwa-item").setAttribute("manhwa-id", manhwa.id);
  // Set Data Attributes
  tc.querySelector(".manhwa-item").setAttribute(
    "data-manhwa-nome",
    manhwa.nome
  );
  tc.querySelector(".manhwa-item").setAttribute(
    "data-manhwa-status",
    manhwa.status
  );
  tc.querySelector(".manhwa-item").setAttribute(
    "data-manhwa-nota",
    manhwa.nota
  );
  tc.querySelector(".manhwa-item").setAttribute(
    "data-manhwa-tipo",
    manhwa.tipo
  );
  // Set Content
  tc.querySelector(".manhwa-card").href = manhwa.url;
  tc.querySelector(
    ".manhwa-card"
  ).style.backgroundImage = `url(${manhwa.imagem})`;
  tc.querySelector(".manhwa-status").textContent = manhwa.status;
  tc.querySelector(".manhwa-card-nome").textContent = manhwa.nome;
  tc.querySelector(".card-manhwa-capitulo").textContent = `Capítulo: ${manhwa.capitulo}/${manhwa.max_capitulo}`;
  tc.querySelector(".card-manhwa-nota").textContent = `Nota: ${manhwa.nota}`;
  //Import Node
  const clone = document.importNode(tc, true);
  return clone;
}
/* ------------------------ APPENDS MANHWA TO LIST ------------------------ */
function appendManhwa(el) {
  document.getElementById("manhwa-list").appendChild(el);
}
/* ----------------------------- LOAD MANHWAS ----------------------------- */
function loadManhwas(manhwas) {
  for (let manhwa of manhwas) {
    appendManhwa(createCard(manhwa));
  }
}
/* ----------------------- ADD MANHWA TO HTML AND DB ---------------------- */
function addManhwa() {
  const manhwa = getAddInputValues();
  $(".input-field").val("");
  appendManhwa(createCard(manhwa));
  createDBManhwa(manhwa);
}
/**----------------------
 *note    UPDATE
 *------------------------**/
/* ---------------------------- SET EDIT INPUT ---------------------------- */
function setEditInput(manhwa) {
  $("#nome-edit").val(manhwa.nome);
  $("#capitulo-edit").val(manhwa.capitulo);
  $("#max_capitulo-edit").val(manhwa.max_capitulo);
  $("#imagem-edit").val(manhwa.imagem);
  $("#url-edit").val(manhwa.url);
  $("#nota-edit").val(manhwa.nota);
  $("#status-edit").val(manhwa.status);
  $("#tipo-edit").val(manhwa.tipo);
}
/* ---------------------------- GET EDIT INPUT ---------------------------- */
function getEditInputValues() {
  return {
    nome: $("#nome-edit").val(),
    capitulo: $("#capitulo-edit").val(),
    max_capitulo: $("#max_capitulo-edit").val(),
    imagem: $("#imagem-edit").val(),
    url: $("#url-edit").val(),
    nota: $("#nota-edit").val(),
    status: $("#status-edit").val(),
    tipo: $("#tipo-edit").val(),
  };
}
/* --------------------------- UPDATE HTML CARD --------------------------- */
function updateCard(id, manhwa) {
  const el = $("[manhwa-id=" + id + "]");
  el.find(".manhwa-item").attr("manhwa-id", manhwa.id);
  el.find(".manhwa-card").attr("href", manhwa.url);
  el.find(".manhwa-card").css("background-image", `url(${manhwa.imagem})`);
  el.find(".manhwa-status").text(manhwa.status);
  el.find(".manhwa-card-nome").text(manhwa.nome);
  el.find(".card-manhwa-capitulo").text(
    `Capítulo: ${manhwa.capitulo}/${manhwa.max_capitulo}`
  );
  el.find(".card-manhwa-nota").text(`Nota: ${manhwa.nota}`);
}
/* --------------------------- UPDATE LIST --------------------------- */
function updateList(updated_manhwa) {
  const manhwa_index = manhwas_db.findIndex(
    (manhwa) => manhwa.id == updated_manhwa.id
  );
  console.log("updateList | manhwa_index", manhwa_index);

  manhwas_db[manhwa_index] = updated_manhwa;

  localStorage.setItem("manhwas", JSON.stringify(manhwas_db));
}
