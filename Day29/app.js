const progressBar = document.querySelector(".progress-bar");
const progress = progressBar.children[0];
const progressSpan = progress.children[0];

let isDrag = false;
let progressBarWidth = progressBar.clientWidth;
let initialSpace = 0;
let dragSpace = 0;
let initialClientX = 0;

progressBar.addEventListener("mousedown", function (e) {
  if (e.which === 1) {
    dragSpace = e.offsetX;
    //Tinh phần trăm
    let rate = (dragSpace * 100) / progressBarWidth;
    progress.style.width = `${rate}%`;
    document.addEventListener("mousemove", handleDrag);
    initialClientX = e.clientX;
    initialSpace = dragSpace;
    const currentTime = (rate / 100) * audio.duration;
    // console.log(currentTime);
    audio.currentTime = currentTime;
  }
});

progressSpan.addEventListener("mousedown", function (e) {
  e.stopPropagation();
  document.addEventListener("mousemove", handleDrag);
  initialClientX = e.clientX;
});
document.addEventListener("mouseup", function () {
  document.removeEventListener("mousemove", handleDrag);
  initialSpace = dragSpace;
});
const handleDrag = function (e) {
  let clientX = e.clientX;
  //tinh khoang cach keo
  dragSpace = clientX - initialClientX + initialSpace;
  let rate = (dragSpace * 100) / progressBarWidth;
  if (rate < 0) rate = 0;
  if (rate > 100) rate = 100;
  //tinh %
  progress.style.width = `${rate}%`;
  const currentTime = (dragSpace / progressBarWidth) * audio.duration;
  audio.currentTime = currentTime;
};
let audio = document.querySelector("audio");
let playerAction = document.querySelector(".player .player-action");
let durationEl = progressBar.nextElementSibling;
let currentTimeEl = progressBar.previousElementSibling;
let timerElement = progressBar.querySelector(".timer");

window.addEventListener("load", function () {
  const getTime = function (seconds) {
    const mins = Math.floor(seconds / 60);
    seconds = Math.floor(seconds - mins * 60);
    return `${mins < 10 ? "0" + mins : mins}: ${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  };
  progressBar.addEventListener("mousemove", function (e) {
    const mouseX = e.clientX - this.getBoundingClientRect().left;
    const rate = (mouseX * 100) / progressBarWidth;
    const currentTime = (rate / 100) * audio.duration;
    const timeString = getTime(currentTime);
    timerElement.style.left = `${rate}%`;
    timerElement.innerText = timeString; //
  });

  durationEl.innerText = getTime(audio.duration);
  playerAction.addEventListener("click", function () {
    if (audio.paused) {
      audio.play(); //Phat nhac
      this.children[0].classList.replace("fa-play", "fa-pause");
    } else {
      audio.pause(); //Dung nhac
      this.children[0].classList.replace("fa-pause", "fa-play");
    }
  });
  //Lang nghe su kien khi nhac dang phat
  audio.addEventListener("timeupdate", function () {
    currentTimeEl.innerText = getTime(audio.currentTime);

    let rate = (audio.currentTime * 100) / audio.duration;
    progress.style.width = `${rate}%`;
  });

  const icon = playerAction.children[0];
  audio.addEventListener("ended", function () {
    progress.style.width = "0%";
    icon.classList.replace("fa-pause", "fa-play");
  });
});
