"use strict";

const counter = document.querySelector(".counter");
const btn = document.querySelector(".btn");
let countdown = 15;
let time = 0;

function blockViewSource() {
  document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "F12") {
      e.preventDefault();
    }
  });
}
blockViewSource();
function getLink() {
  window.location.href = "https://fullstack.edu.vn/";
  console.log(1);
}
function updateCountdown(timestamp) {
  if (!time) time = timestamp;
  const elapsed = (timestamp - time) / 1000;
  if (elapsed >= 1) {
    countdown--;
    counter.textContent = countdown;
    time = timestamp;
  }
  if (countdown > 0) {
    requestAnimationFrame(updateCountdown);
  } else {
    btn.disabled = false;
    btn.classList.add("active");
  }
}
requestAnimationFrame(updateCountdown);
btn.addEventListener("click", getLink);
