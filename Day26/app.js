//Button Element
const btnShow = document.querySelector(".btn-menu");
const btnClose = document.querySelector(".btn-close");
const btnLogin = document.querySelector(".btn-login");
const btnRegister = document.querySelector(".btn-register");
const btnSubmitLogin = document.querySelector(".btn-login--submit");
const btnSubmitRegister = document.querySelector(".btn-login--register");

const boxModal = document.querySelector(".box-modal");
const overlay = document.querySelector(".overlay");
const containerLogin = document.querySelector(".container-login");
const containerRegister = document.querySelector(".container-register");

const showPassword = document.querySelector(".show-password");
const hidePassword = document.querySelector(".hide-password");

//Element form login
const formLogin = document.querySelector("#form-login");
let email = document.querySelector("#email");
let password = document.querySelector("#password");

//form register
const formRegister = document.querySelector("#form-register");
let emailRegister = document.querySelector("#email-register");
let passwordRegister = document.querySelector("#password-register");
let fullnameRegister = document.querySelector("#fullname-register");
//show modal
btnShow.addEventListener("click", function (e) {
  e.preventDefault();
  boxModal.classList.add("active");
  overlay.classList.add("active");
});

//hide modal
function hideModal() {
  boxModal.classList.remove("active");
  overlay.classList.remove("active");
}
btnClose.addEventListener("click", hideModal);
overlay.addEventListener("click", hideModal);
document.addEventListener("keyup", function (e) {
  if (e.key === "Escape") {
    hideModal();
  }
});

//show login
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  containerLogin.classList.add("active");
  containerRegister.classList.remove("active");
  btnLogin.classList.add("active");
  btnRegister.classList.remove("active");
});

//show register
btnRegister.addEventListener("click", function (e) {
  e.preventDefault();
  containerLogin.classList.remove("active");
  containerRegister.classList.add("active");
  btnLogin.classList.remove("active");
  btnRegister.classList.add("active");
});

//Show and Hide Password
showPassword.addEventListener("click", function () {
  password.type = "text";
  passwordRegister.type = "text";
  showPassword.classList.remove("active");
  hidePassword.classList.add("active");
});
hidePassword.addEventListener("click", function () {
  password.type = "password";
  passwordRegister.type = "password";
  showPassword.classList.add("active");
  hidePassword.classList.remove("active");
});
//Validate Form

function showError(input, message) {
  let parent = input.parentElement;
  let spanMessage = parent.querySelector(".form-message");
  parent.classList.add("error");
  spanMessage.innerText = message;
}
function showSuccess(input) {
  let parent = input.parentElement;
  let spanMessage = parent.querySelector(".form-message");
  parent.classList.remove("error");
  spanMessage.innerText = "";
}

function checkEmptyError(listInput) {
  listInput.forEach((input) => {
    input.value = input.value.trim();
    if (input.value === "") {
      showError(input, "Vui lòng nhập thông tin");
    } else {
      showSuccess(input);
    }
  });
}

function checkEmailError(input) {
  const regexEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  input.value = input.value.trim();
  let isEmailError = !regexEmail.test(input.value);
  if (!isEmailError) {
    showSuccess(input);
  } else if (input.value === "") {
    showError(input, "Vui lòng nhập thông tin");
  } else {
    showError(input, "Vui lòng nhập đúng định dạng email");
  }
}

function checkPasswordError(input, min, max) {
  input.value = input.value.trim();
  if (input.value === "") {
    showError(input, "Vui lòng nhập thông tin");
  } else if (input.value.length < min) {
    showError(input, `Mật khẩu tối thiểu ${min} - ${max} ký tự`);
  } else if (input.value.length > max) {
    showError(input, `Mật khẩu tối thiểu ${min} - ${max} ký tự`);
  } else {
    showSuccess(input);
  }
}

function checkFullnameError(input) {
  input.value = input.value.trim();
  if (input.value === "") {
    showError(input, "Vui lòng nhập thông tin");
  } else {
    showSuccess(input);
  }
}

formLogin.addEventListener("submit", function (e) {
  e.preventDefault();
  let isEmptyError = checkEmptyError([email, password]);
  let isEmailError = checkEmailError(email);
  let isPasswordError = checkPasswordError(password, 6, 20);
});
formRegister.addEventListener("submit", function (e) {
  e.preventDefault();
  let isEmptyError = checkEmptyError([
    emailRegister,
    passwordRegister,
    fullnameRegister,
  ]);
  let isEmailError = checkEmailError(emailRegister);
  let isPasswordError = checkPasswordError(passwordRegister, 6, 20);
  let isFullnameError = checkFullnameError(fullnameRegister);
});
