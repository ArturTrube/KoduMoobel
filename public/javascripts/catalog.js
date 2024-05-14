var modal = document.getElementById("myModal");
var btn = document.getElementById("openModal");


function cardModal() {
  modal.style.display = "block";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}