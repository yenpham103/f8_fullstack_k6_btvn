import { api } from "./api.js";
const { SERVER_QUESTIONS_API } = api;

const startBtn = document.querySelector(".start-btn button");
const infoBox = document.querySelector(".info-box");
const quitBtn = infoBox.querySelector(".buttons .quit");
const restartBtn = infoBox.querySelector(".buttons .restart");
const quizBox = document.querySelector(".quiz-box");
const timeCount = quizBox.querySelector(".time-sec");
const timeLine = quizBox.querySelector(".time-line");
const timeOff = quizBox.querySelector(".time-text");

const nextBtn = document.querySelector(".next-btn");
const section = document.querySelector("section");
const resultBox = document.querySelector(".result-box");
const restartQuiz = resultBox.querySelector(".restart");
const quitQuiz = resultBox.querySelector(".quit");
const accuracyPer = resultBox.querySelector(".win");
const spanPer = accuracyPer.children[0];
const correctAudio = document.querySelector("#correct-audio");
const incorrectAudio = document.querySelector("#incorrect-audio");

//Start
startBtn.addEventListener("click", () => {
  infoBox.classList.add("active");
});
quitBtn.addEventListener("click", () => {
  infoBox.classList.remove("active");
});

let questCount = 0;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;
let remainingTime = timeValue;

restartQuiz.addEventListener("click", function () {
  window.location.reload();
});
quitQuiz.addEventListener("click", function () {
  window.location.reload();
});

restartBtn.addEventListener("click", () => {
  infoBox.classList.remove("active");
  quizBox.classList.add("active");
  getQuests(questCount);
  // startTime(timeValue);
  startTimeLine(widthValue);
});

//handleAudio
function stopAudio() {
  correctAudio.pause();
  correctAudio.currentTime = 0;
  incorrectAudio.pause();
  incorrectAudio.currentTime = 0;
}

nextBtn.addEventListener("click", async function () {
  stopAudio();
  const data = await getQuest();
  if (questCount < data.length - 1) {
    questCount++;
    getQuests(questCount);
    clearInterval(counter);
    clearInterval(counterLine);
    startTimeLine(timeValue);
    nextBtn.style.display = "none";
    timeOff.innerText = "Time Left";
  } else {
    clearInterval(counter);
    clearInterval(counterLine);
    showResultBox();
  }
  if (questCount === data.length - 1)
    return (nextBtn.innerText = "View Result");
});

const renderQuest = ({ number, question, options }) => {
  const totalQuest = document.querySelector(".total-que");
  const indexNow = totalQuest.children[0].children[0];
  indexNow.innerText = `${number}`;
  let optionHtml = "";
  options.forEach((option, index) => {
    const optionID = `option${index + 1}`;
    optionHtml += `<div class="option">
    <input type="checkbox" id="${optionID}" name="answer" hidden>
    <label for="${optionID}">${option}</label>
  </div>`;
  });

  const htmlQuiz = ` <div class="que-text">
  <span>${number}. ${question}</span>
</div>
<div class="option-list">
  ${optionHtml}
</div>`;
  section.innerHTML = htmlQuiz;
};

const getQuests = async (quest) => {
  const response = await fetch(`${SERVER_QUESTIONS_API}/questions`);
  const quests = await response.json();
  const data = quests[quest];
  if (response.ok) {
    renderQuest(data);
    handleAnswer(data);
  } else {
    throw new Error("Không lấy được câu hỏi");
  }
};
const getQuest = async () => {
  const response = await fetch(`${SERVER_QUESTIONS_API}/questions`);
  const quests = await response.json();
  return quests;
};

let iconTick = `<div class="icon tick">
<i class="fa-solid fa-check"></i></div>`;
let iconCross = `<div class="icon cross">
<i class="fa-solid fa-xmark"></i></div>`;
function handleAnswer({ answer }) {
  const listOption = document.querySelector(".option-list");
  const options = listOption.querySelectorAll(".option");
  startTime(timeValue, answer, options);

  let correctAnswer = [];
  if (Array.isArray(answer)) {
    correctAnswer = answer.map((a) => a.trim().toLowerCase());
  } else {
    correctAnswer.push(String(answer).trim().toLowerCase());
  }
  setTimeout(function () {
    if (correctAnswer.length > 1) {
      alert("Câu này có nhiều hơn 1 đáp án đúng");
    }
  }, 100);

  let selectedOptions = [];
  const isMultipleCorrect = correctAnswer.length > 1;

  options.forEach((option) => {
    option.addEventListener("click", function (e) {
      if (option.classList.contains("clicked")) return; // Bỏ qua nếu option đã được chọn

      clearInterval(counter);
      clearInterval(counterLine);

      const userStringAnswer = option.children[1].innerText
        .trim()
        .toLowerCase();
      selectedOptions.push(userStringAnswer); // Thêm đáp án đã chọn vào mảng
      option.classList.add("clicked"); // Đánh dấu option đã được click
      option.classList.add("disabled"); // Vô hiệu hóa option đã chọn

      if (selectedOptions.length === correctAnswer.length) {
        let isCorrect = checkArray(selectedOptions, correctAnswer);
        if (isCorrect) {
          userScore += 15;
          if (remainingTime > 10) {
            userScore += 5;
          }
          selectedOptions.forEach((ans) => {
            const correctOption = [...options].find(
              (option) =>
                option.children[1].innerText.trim().toLowerCase() === ans
            );
            correctOption.classList.add("correct");
            correctOption.insertAdjacentHTML("beforeend", iconTick);
          });
          correctAudio.play();
        } else {
          selectedOptions.forEach((ans) => {
            const incorrectOption = [...options].find(
              (option) =>
                option.children[1].innerText.trim().toLowerCase() === ans
            );
            incorrectOption.classList.add("incorrect");
            incorrectOption.insertAdjacentHTML("beforeend", iconCross);
          });
          incorrectAudio.play();
          correctAnswer.forEach((correct) => {
            const correctOption = [...options].find(
              (option) =>
                option.children[1].innerText.trim().toLowerCase() === correct
            );
            correctOption.classList.add("correct");
          });
        }

        options.forEach((option) => {
          option.classList.add("disabled");
        });
        nextBtn.style.display = "block";
      } else if (!isMultipleCorrect) {
        options.forEach((option) => {
          option.classList.add("disabled");
        });
        nextBtn.style.display = "block";
      }
    });
  });
}

function checkArray(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;

  let sortedArr1 = arr1.slice().sort();
  let sortedArr2 = arr2.slice().sort();

  for (let i = 0; i < sortedArr1.length; i++) {
    if (sortedArr1[i] !== sortedArr2[i]) return false;
  }
  return true;
}

function showResultBox() {
  infoBox.classList.remove("active");
  quizBox.classList.remove("active");
  resultBox.classList.add("active");
  const scoreText = resultBox.querySelector(".score-text");
  scoreText.innerText = userScore;
  accuracyPer.style.width = `${userScore}%`;
  spanPer.innerText = `${userScore}%`;
}
function startTimeLine(time) {
  counterLine = setInterval(timer, 29);
  function timer() {
    time += 1;
    timeLine.style.width = time + "px";
    if (time > 549) {
      clearInterval(counterLine);
    }
  }
}
function startTime(time, answer, options) {
  remainingTime = time;
  counter = setInterval(timer, 1000);
  async function timer() {
    timeCount.innerText = time < 10 ? "0" + time : time;
    remainingTime = time;
    time--;
    if (time < 0) {
      const correctAnswer = String(answer).trim().toLowerCase();
      clearInterval(counter);
      timeCount.innerText = "00";
      timeOff.innerText = "Time Off";
      options.forEach((option) => {
        const userAnswer = String(option.innerText).trim().toLowerCase();
        if (userAnswer === correctAnswer) {
          option.setAttribute("class", "option correct");
        }
      });
      options.forEach((option) => {
        option.classList.add("disabled");
      });
      nextBtn.style.display = "block";
    }
  }
}
