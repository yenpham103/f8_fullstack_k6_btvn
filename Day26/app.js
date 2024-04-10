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

const togglePasswords = document.querySelectorAll(".toggle-password");
const formLogin = document.querySelector("#form-login");
const formRegister = document.querySelector("#form-register");

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
  resetForm(formRegister);
  resetForm(formLogin);
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
  resetForm(formRegister);
});

//show register
btnRegister.addEventListener("click", function (e) {
  e.preventDefault();
  containerLogin.classList.remove("active");
  containerRegister.classList.add("active");
  btnLogin.classList.remove("active");
  btnRegister.classList.add("active");
  resetForm(formLogin);
});

//reset form
function resetForm(form) {
  form.reset();
  const groups = form.querySelectorAll(".form-group");
  groups.forEach((group) => {
    const span = group.querySelector(".form-message");
    group.classList.remove("error");
    span.innerText = "";
  });
}
//Show and Hide Password
function togglePassword(passwords) {
  passwords.forEach((password) => {
    const input = password.previousElementSibling;
    password.addEventListener("click", function () {
      const icon = password.querySelector("i");
      if (icon.classList.contains("fa-eye")) {
        input.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
      } else {
        input.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
      }
    });
  });
}
togglePassword(togglePasswords);

//Validator Form
function Validator(formSelector, options) {
  if (!options) {
    options = {};
  }
  //
  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement;
      }
      element = element.parentElement;
    }
  }

  let formRules = {};
  let validatorRules = {
    required: function (value) {
      return value ? undefined : "Vui lòng nhập thông tin";
    },
    email: function (value) {
      const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return regex.test(value)
        ? undefined
        : "Vui lòng nhập đúng định dạng email";
    },
    min: function (min) {
      return function (value) {
        return value.length >= min
          ? undefined
          : `Mật khẩu tối thiểu ${min} - 20 ký tự`;
      };
    },
    max: function (max) {
      return function (value) {
        return value.length <= max
          ? undefined
          : `Mật khẩu tối đa 6 - ${max} ký tự`;
      };
    },
  };

  const formElement = document.querySelector(formSelector);
  if (formElement) {
    let inputs = formElement.querySelectorAll("input[name][rules]");
    for (const input of inputs) {
      let rules = input.getAttribute("rules").split("|");
      rules.forEach((rule) => {
        let ruleInfo;
        let isRuleHasValue = rule.includes(":");

        if (isRuleHasValue) {
          ruleInfo = rule.split(":");
          rule = ruleInfo[0];
        }

        let ruleFunc = validatorRules[rule];

        if (isRuleHasValue) {
          ruleFunc = ruleFunc(ruleInfo[1]);
        }

        if (Array.isArray(formRules[input.name])) {
          formRules[input.name].push(ruleFunc);
        } else {
          formRules[input.name] = [ruleFunc];
        }
      });
      //add event
      input.onblur = handleValidate;
      input.oninput = handleClearError;
    }

    //Ham Validate
    function handleValidate(e) {
      let rules = formRules[e.target.name];
      let errorMessage;
      for (const rule of rules) {
        errorMessage = rule(e.target.value);
        if (errorMessage) break;
      }
      if (errorMessage) {
        let formGroup = getParent(e.target, ".form-group");
        if (formGroup) {
          formGroup.classList.add("error");
          let formMessage = formGroup.querySelector(".form-message");
          if (formMessage) {
            formMessage.innerText = errorMessage;
          }
        }
      }
      return !errorMessage;
    }
    //Ham clear error
    function handleClearError(e) {
      let formGroup = getParent(e.target, ".form-group");
      if (formGroup.classList.contains("error")) {
        formGroup.classList.remove("error");
        let formMessage = formGroup.querySelector(".form-message");
        if (formMessage) {
          formMessage.innerText = "";
        }
      }
    }
    //handle submit form
    formElement.onsubmit = function (e) {
      e.preventDefault();
      let inputs = formElement.querySelectorAll("input[name][rules]");
      let isValid = true;
      inputs.forEach((input) => {
        if (!handleValidate({ target: input })) {
          isValid = false;
        }
      });
      if (isValid) {
        if (typeof options.onSubmit === "function") {
          return options.onSubmit();
        }
      }
    };
  }
}
