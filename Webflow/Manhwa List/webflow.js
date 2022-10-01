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
  });
}
