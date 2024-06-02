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

nextBtn.addEventListener("click", async function () {
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
  //   const optionList = section.querySelector(".option-list");
  const totalQuest = document.querySelector(".total-que");
  const indexNow = totalQuest.children[0].children[0];
  indexNow.innerText = `${number}`;
  const htmlQuiz = ` <div class="que-text">
  <span>${number}. ${question}</span>
</div>
<div class="option-list">
  <div class="option">
      <span>${options[0]}</span>
  </div>
  <div class="option ">
      <span>${options[1]}</span>
  </div>
  <div class="option ">
      <span>${options[2]}</span>
  </div>
  <div class="option ">
      <span>${options[3]}</span>
  </div>
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
  const correctAnswer = String(answer).trim().toLowerCase();
  options.forEach((option, index) => {
    option.addEventListener("click", function (e) {
      clearInterval(counter);
      clearInterval(counterLine);
      const option = e.target;
      const userAnswer = String(option.innerText).trim().toLowerCase();
      if (userAnswer === correctAnswer) {
        userScore += 10;
        option.classList.add("correct");
        option.insertAdjacentHTML("beforeend", iconTick);
      } else {
        option.classList.add("incorrect");
        option.insertAdjacentHTML("beforeend", iconCross);
        options.forEach((option, i) => {
          if (String(option.innerText).trim().toLowerCase() === correctAnswer) {
            option.setAttribute("class", "option correct");
          }
        });
      }
      options.forEach((option) => {
        option.classList.add("disabled");
      });
      nextBtn.style.display = "block";
    });
  });
}
function showResultBox() {
  infoBox.classList.remove("active");
  quizBox.classList.remove("active");
  resultBox.classList.add("active");
  const scoreText = resultBox.querySelector(".score-text");
  scoreText.innerText = userScore;
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
  counter = setInterval(timer, 1000);
  async function timer() {
    timeCount.innerText = time;
    time--;
    if (time < 9) {
      let addZero = timeCount.innerText;
      timeCount.innerText = "0" + addZero;
    }
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
