"use strict";

const listItem = document.querySelector(".list-item");
const items = document.querySelectorAll(".item");

// Handle title
items.forEach((item) => {
  const span = document.createElement("span");
  item.insertBefore(span, item.firstChild);
});
const updateItemOrder = () => {
  let unitIndex = 0;
  let moduleIndex = 0;
  items.forEach((item, index) => {
    const span = item.querySelector("span");
    if (!item.classList.contains("module")) {
      unitIndex++;
      span.innerText = `Bài ${unitIndex}: `;
    } else {
      moduleIndex++;
      span.innerText = `Module ${moduleIndex} : `;
    }
  });
};
updateItemOrder();

//Handle Drag
items.forEach((item) => {
  item.setAttribute("draggable", "true");
  item.addEventListener("dragstart", function () {
    setTimeout(() => {
      item.classList.add("dragging");
    }, 0);
  });
  item.addEventListener("dragend", function () {
    item.classList.remove("dragging");
    updateItemOrder();
  });
});

const initSortableList = function (e) {
  e.preventDefault();
  const draggingItem = listItem.querySelector(".dragging");
  const siblings = [...listItem.querySelectorAll(".item")];
  let nextSibling = null;

  for (let i = 0; i < siblings.length; i++) {
    const sibling = siblings[i];
    const rect = sibling.getBoundingClientRect();
    const offsetY = e.clientY - rect.top;

    if (offsetY > sibling.offsetHeight / 2) {
      nextSibling = sibling.nextElementSibling;
    } else {
      nextSibling = sibling;
      break;
    }
  }

  if (!nextSibling) {
    listItem.appendChild(draggingItem);
  } else {
    listItem.insertBefore(draggingItem, nextSibling);
  }

  updateItemOrder();
};

listItem.addEventListener("dragover", initSortableList);
listItem.addEventListener("dragend", function (e) {
  e.preventDefault();
  updateItemOrder();
});
