function setLocalStorage() {
  localStorage.setItem("DSSP", JSON.stringify(dssp.products));
}
function getLocalStorage() {
  if (localStorage.getItem("DSSP") != null) {
    dssp.products = JSON.parse(localStorage.getItem("DSSP"));
  }
}