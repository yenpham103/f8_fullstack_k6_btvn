var tabSwitchButtons = document.querySelectorAll(".tab-switch-button");
var formBoxs = document.querySelectorAll(".form-box");
tabSwitchButtons.forEach(function (tabSwitchButton, index) {
  const formBox = formBoxs[index];
  tabSwitchButton.onclick = function () {
    console.log(formBox);
    const removeActiveTab = document.querySelector(".tab-switch-button.active");
    removeActiveTab.classList.remove("active");
    tabSwitchButton.classList.add("active");
    const removeActiveForm = document.querySelector(".form-box.active");
    removeActiveForm.classList.remove("active");
    formBox.classList.add("active");
  };
});
