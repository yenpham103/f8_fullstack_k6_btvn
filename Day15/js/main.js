var btnShowProfile = document.querySelector(".btn-show");
console.log(btnShowProfile);
var boxMyProfile = document.querySelector(".my-profile");
console.log(boxMyProfile);
var closeProfile = document.querySelector(".overlay");
console.log(closeProfile);

function showProfile() {
  boxMyProfile.classList.add("active");
  closeProfile.classList.add("active");
}
function removeProfile() {
  boxMyProfile.classList.remove("active");
  closeProfile.classList.remove("active");
}
btnShowProfile.addEventListener("click", showProfile);
closeProfile.addEventListener("click", removeProfile);
