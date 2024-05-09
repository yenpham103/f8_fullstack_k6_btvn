"use strict";

const btnColor = document.querySelector(".control-color");
const btnLeftAll = document.querySelectorAll(".control-left .btn");
const btnFile = document.querySelector(".btn-file");
const dropdown = btnFile.nextElementSibling;
const btnNew = document.querySelector("#new-btn");
const btnTxt = document.querySelector("#txt-btn");
const btnPdf = document.querySelector("#pdf-btn");
const content = document.querySelector("#content");
const filenameInput = document.querySelector("#filename-input");

//Ham
window.onload = function () {
  content.focus();
};
function bold() {
  document.execCommand("bold");
}
function underline() {
  document.execCommand("underline");
}
function italic() {
  document.execCommand("italic");
}
function color() {
  document.execCommand("foreColor", false, btnColor.value);
}
function toggleDropdown() {
  dropdown.classList.toggle("active");
}
function newContent() {
  content.textContent = "";
  content.focus();
  dropdown.classList.remove("active");
}
function saveFileTxt() {
  toggleDropdown();
  const a = document.createElement("a");
  const blob = new Blob([content.textContent]);
  const dataUrl = URL.createObjectURL(blob);
  a.href = dataUrl;
  a.download = filenameInput.value + "txt";
  a.click();
}
function saveFilePdf() {
  toggleDropdown();
  html2pdf().from(content).save(filenameInput.value);
}
//Event

btnLeftAll.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    btn.classList.toggle("active");
    if (e.target.classList.contains("btn-b")) {
      bold();
    } else if (e.target.classList.contains("btn-u")) {
      underline();
    } else if (e.target.classList.contains("btn-i")) {
      italic();
    }
  });
});

btnColor.addEventListener("input", color);
btnFile.addEventListener("click", toggleDropdown);
btnNew.addEventListener("click", newContent);
btnTxt.addEventListener("click", saveFileTxt);
btnPdf.addEventListener("click", saveFilePdf);

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
