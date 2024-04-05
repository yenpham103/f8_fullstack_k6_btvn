//Bai 5
const categories = [
  {
    id: 1,
    name: "Chuyên mục 1",
  },
  {
    id: 2,
    name: "Chuyên mục 2",
    children: [
      {
        id: 4,
        name: "Chuyên mục 2.1",
      },
      {
        id: 5,
        name: "Chuyên mục 2.2",
        children: [
          {
            id: 10,
            name: "Chuyên mục 2.2.1",
          },
          {
            id: 11,
            name: "Chuyên mục 2.2.2",
          },
          {
            id: 12,
            name: "Chuyên mục 2.2.3",
          },
        ],
      },
      {
        id: 6,
        name: "Chuyên mục 2.3",
      },
    ],
  },
  {
    id: 3,
    name: "Chuyên mục 3",
    children: [
      {
        id: 7,
        name: "Chuyên mục 3.1",
      },
      {
        id: 8,
        name: "Chuyên mục 3.2",
      },
      {
        id: 9,
        name: "Chuyên mục 3.3",
      },
      {
        id: 10,
        name: "Chuyên mục 3.4",
      },
    ],
  },
];
const selectContainer = document.querySelector("#select-container");
function createSelect(categories) {
  console.log(categories);
  let selectHtml = "<select>";
  selectHtml += "<option value=''>Chọn chuyên mục</option>";
  categories.forEach((category) => {
    selectHtml += `<option value="${category.id}">${category.name}</option>`;
    if (category.children) {
      createOption(category.children, "-").forEach((option) => {
        selectHtml += option;
      });
    }
  });
  selectHtml += "</select>";
  return selectHtml;
}
function createOption(categories, line) {
  let options = [];
  categories.forEach((category) => {
    options.push(
      `<option value="${category.id}">${line}${category.name}</option>`
    );
    if (category.children) {
      createOption(category.children, line + " - ").forEach((option) => {
        options.push(option);
      });
    }
  });
  return options;
}
const selectHtml = createSelect(categories);
selectContainer.innerHTML = selectHtml;

//Bai 1

// function sum(...args) {
//   let total = 0;
//   for (const arg of args) {
//     if (typeof arg !== "number" || isNaN(arg)) {
//       return "Tất cả phải là số";
//     }
//     total += arg;
//   }
//   return total;
// }
// const result = sum(1, 2, 3);
// const result1 = sum(1, "haha", 3);

// console.log(result);
// console.log(result1);

//Bai 2
// Object.prototype.getCurrency = function (currency) {
//   const price = +this;
//   if (isNaN(price)) {
//     return "Phải là số";
//   }
//   return `${price.toLocaleString()} ${currency}`;
// };

// let price1 = 12000;
// console.log(price1.getCurrency("đ"));

//bai3
// Array.prototype.push2 = function (...elements) {
//   let length = this.length;
//   for (let i = 0; i < elements.length; i++) {
//     this[length + i] = elements[i];
//   }
//   return this.length;
// };
// let myArray = ["Pham", "Yen"];
// myArray.push2(1, 2, 3);
// // myArray.push2("a", "b", "c");
// console.log(myArray);

//bai4
// Array.prototype.filter2 = function (callback) {
//   const result = [];
//   for (let i = 0; i < this.length; i++) {
//     if (callback(this[i], i, this)) {
//       result.push(this[i]);
//     }
//   }
//   return result;
// };

// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// const result = numbers.filter2(function (num) {
//   return num % 2 !== 0;
// });

// console.log(result);
