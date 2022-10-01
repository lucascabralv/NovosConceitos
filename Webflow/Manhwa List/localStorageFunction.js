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
