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
