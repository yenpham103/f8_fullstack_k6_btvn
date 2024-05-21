"use strict";

const searchForm = document.querySelector("#search-form");
const searchFormInput = searchForm.querySelector("input");

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (SpeechRecognition) {
  //Sp
  searchForm.insertAdjacentHTML(
    "beforeend",
    `<button type="button">
        <i class="fa-solid fa-microphone"></i>
     </button>`
  );
  const micBtn = searchForm.querySelector("button");
  const micIcon = micBtn.querySelector("i");
  const recognition = new SpeechRecognition();
  recognition.lang = "vi-VN";

  function micBtnClick() {
    if (micIcon.classList.contains("fa-microphone")) {
      recognition.start();
    } else {
      recognition.stop();
    }
  }
  micBtn.addEventListener("click", micBtnClick);

  function startSpeechRecognition() {
    micIcon.classList.remove("fa-microphone");
    micIcon.classList.add("fa-microphone-slash");
    searchFormInput.focus();
  }
  recognition.addEventListener("start", startSpeechRecognition);

  function endSpeechRecognition() {
    micIcon.classList.remove("fa-microphone-slash");
    micIcon.classList.add("fa-microphone");
    searchFormInput.focus();
  }
  recognition.addEventListener("end", endSpeechRecognition);

  recognition.addEventListener("result", resultOfSpeechRecognition);
  function resultOfSpeechRecognition(e) {
    const transcript = e.results[0][0].transcript;
    searchFormInput.value = transcript;
    setTimeout(() => {
      searchForm.submit();
    }, 500);
  }
} else {
  //no sp
  console.log("No support");
}
