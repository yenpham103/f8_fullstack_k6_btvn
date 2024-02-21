var btn = document.querySelector(".show-modal");
var boxModal = document.querySelector(".box-modal");
var closeModal = document.querySelector(".close-modal");
var overlay = document.querySelector(".overlay");

btn.addEventListener("click", function () {
  boxModal.classList.add("active");
  overlay.classList.add("active")
});
function removeActive() {
  boxModal.classList.remove("active");
  overlay.classList.remove("active")

}
closeModal.addEventListener("click", removeActive);
overlay.addEventListener("click", removeActive);

