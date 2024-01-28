var listItem = document.querySelectorAll(".item");
var listContent = document.querySelectorAll(".content");

listItem.forEach((item, index) => {
  const content = listContent[index];
  item.onclick = function () {
    const reContentClass = document.querySelector(".content.active");
    const reItemClass = document.querySelector(".item.active");

    reContentClass.classList.remove("active");
    reItemClass.classList.remove("active");
    item.classList.add("active");
    content.classList.add("active");
  };
});
// for (var item = 0; item < listItem.length; item++) {
//   console.log(item);
// }
