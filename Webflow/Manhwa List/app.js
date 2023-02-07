//! GLOBAL VARIABLE
let database = null;
//! GLOBAL VARIABLE
let manhwas_db = null;

async function app() {
  /* --------------------------------- DB KEYS -------------------------------- */
  const SUPABASE_URL = "https://kvxhnfthgmkqwruknkpa.supabase.co";
  const SUPABASE_ANON_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2eGhuZnRoZ21rcXdydWtua3BhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjMyMDM3MzgsImV4cCI6MTk3ODc3OTczOH0.4cd_KD6_ksNNsBw3mwLHLXUuQnJz6HVShdPz0rN8dJ8";

  /* ------------------------------- DATABASE ------------------------------- */
  database = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  /* -------------------------- CHECK LAST API CALL ------------------------- */
  if (checkLastCall()) {
    //GET DATA
    const { data, error } = await database
      .from("Manhwas")
      .select("*")
      .order("nota", { ascending: false })
      .order("nome", { ascending: true });

    localStorage.setItem("manhwas", JSON.stringify(data));
    manhwas_db = data;
  } else {
    manhwas_db = JSON.parse(localStorage.getItem("manhwas"));
  }

  /* ------------------------------ FIRST LOAD ------------------------------ */
  loadManhwas(manhwas_db);

  /* -------------------------- Handle Webflow Form ------------------------- */
  handleWebflowForms();
}
app();

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
 *note           UPDATE MANHWA
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

/**------------------------------------------------------------------------
 *h/                         2 HTML FUNCTIONS
 *------------------------------------------------------------------------**/

/**----------------------
 *note    CREATE
 *------------------------**/
/* ------------------------ GET INPUT FROM ADD FORM ----------------------- */
function getAddInputValues() {
  return {
    nome: $("#nome").val().replaceAll('"', "'"),
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
    nome: $("#nome-edit").val().replaceAll('"', "'"),
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
  el.find(".manhwa-item")
    .attr("manhwa-id", manhwa.id)
    .attr("data-manhwa-nome", manhwa.nome)
    .attr("data-manhwa-status", manhwa.status)
    .attr("data-manhwa-nota", manhwa.nota)
    .attr("data-manhwa-tipo", manhwa.tipo);
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


/**------------------------------------------------------------------------
 *h/                          3 EVENT TRIGGERS
 *------------------------------------------------------------------------**/

/* ------------------------ CLICK ON START EDITING ------------------------ */
$(".start-editing").click(() => {
  $(".edit-manhwa-overlay").css("display", "block");
});
/* ------------------------- CLICK ON EDIT OVERLAY ------------------------ */
$(document).on("click", ".edit-manhwa-overlay", function (e) {
  current_manhwa_id = $(e.target).parent(".manhwa-item").attr("manhwa-id");
  current_editing_manhwa = manhwas_db.find(
    (manhwa) => manhwa.id == current_manhwa_id
  );
  $(".edit-manhwa-modal").css("display", "flex");
  $(".edit-form-wrapper").css("opacity", "1");
  $(".edit-form-wrapper").css("transform", "translate3d(0px, 0vh, 0px)");

  setEditInput(current_editing_manhwa);
});
/* -------------------------- CLICK ON "CANCELAR" ------------------------- */
$("#cancel-edit-button").click(() => {
  current_manhwa_id = null;
  current_editing_manhwa = null;
  $(".input-field").val("");
  // Modal Close -> Webflow Animation
  $(".edit-manhwa-overlay").css("display", "none");
});
/* -------------------------- CLICK ON "CONCLUIR" ------------------------- */
$("#confirm-edit-button").click(() => {
  let new_manhwa_info = getEditInputValues();
  updateDBManhwa(new_manhwa_info, current_manhwa_id);
  updateCard(current_manhwa_id, new_manhwa_info);
  updateList(new_manhwa_info);
  $(".edit-manhwa-overlay").css("display", "none");
  $(".success-warning").removeClass("hidden");
  setTimeout(() => {
    $(".success-warning").addClass("hidden");
  }, 1500);
});
/* -------------------------- CLICK ON "DELETAR" -------------------------- */
$("#delete-edit-button").click(() => {
  $(".edit-manhwa-overlay").css("display", "none");
  $(".success-warning").removeClass("hidden");
  setTimeout(() => {
    $(".success-warning").addClass("hidden");
  }, 1500);
});
/* ------------------------- CLICK ON DISPLAY MODE ------------------------ */
$(".display-select").click(function () {
  if (!$(this).hasClass("active")) {
    $(".display-select").toggleClass("active");
    $(".wrapper-manhwa-list").toggleClass("list-mode");
  }
});

/* ------------------------- INPUT IN SEARCH MANHWA ------------------------- */
$("#search-nome").on("input", function () {
  searchManhwa();
});

/**------------------------------------------------------------------------
 *h/                          4 WEBFLOW FUNCTIONS
 *------------------------------------------------------------------------**/

/* ------------------ PREVENT DEFAULT WEBFLOW FORM SUBMIT ----------------- */
function handleWebflowForms() {
  Webflow.push(() => {
    // Disable submitting form fields during development
    $("#add_form").submit(function () {
      addManhwa();
      return false;
    });

    $("#edit_form").submit(function () {
      return false;
    });
    $("#search_form").submit(function () {
      searchManhwa();
      return false;
    });

  });
}

/**------------------------------------------------------------------------
 *h/                          5 Filter
 *------------------------------------------------------------------------**/ 

function searchManhwa(){
  const filtro = $("#search-nome").val().replaceAll('"',"'");
  filterManhwas("nome", filtro);
}

function filterManhwas(campo, filtro){
  if(filtro && campo){
    $(".manhwa-item").css("display", "flex");
	  $(".manhwa-item:not([data-manhwa-" + campo + ' *= "' + filtro +'"])').css("display", "none");
  } else {
    $(".manhwa-item").css("display", "flex");
  }
}

//NOTE TENTAR PAGINAR JUNTANDO :not() com :nth-child()

/**------------------------------------------------------------------------
 *h/                         6 LOCAL STORAGE FUNCTIONS
 *------------------------------------------------------------------------**/

function checkLastCall() {
  const lastCall = localStorage.getItem("lastCall");
  if (!lastCall || Date.now() - lastCall >= 60000) {
    //IS NOT SET OR MAIS DE 60 SEGUNDOS
    localStorage.setItem("lastCall", Date.now().toString());
    return true;
  }
  return false;
}
