// const textContainer = document.getElementById("text-container");
// const text =
//   "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
// let index = 0;
// let previousSpan = null;

// function animateText() {
//   const words = text.split(" ");
//   const newText = words
//     .map((word, i) => {
//       if (i === index) {
//         return `<span style="color: red">${word} </span>`;
//       } else {
//         return `${word} `;
//       }
//     })
//     .join("");
//   textContainer.innerHTML = newText;
//   if (previousSpan) {
//     previousSpan.style.color = "black";
//   }
//   previousSpan = textContainer.querySelector("span");
//   index = (index + 1) % words.length;
// }
// setInterval(animateText, 500);
var div = document.getElementById("text-container");
var content =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. ";

content = content.replaceAll(" ", "</span> <span>");
content = `<span>${content}</span>`;
console.log(content);
var i = 0;

setInterval(() => {
  var word = content.charAt(i);
  var nextWord = content.charAt(i + 1);
  var htmls = "";
  if (word === ">" && nextWord !== " ") {
    htmls = content.slice(0, i) + ` class="color"` + content.slice(i);
    div.innerHTML = htmls;
  }
  if (i === content.length) {
    i = 0;
  }
  i++;
}, 50);
