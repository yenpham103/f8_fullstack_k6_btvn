//Bai 1
const baiMot = [4, 6, 8, 1, 9, 2, -1];
let max = baiMot[0];
let maxIndex = 0;
baiMot.forEach((item, index) => {
  index++;
  if (max < item) {
    max = item;
    maxIndex = index;
  }
});
console.log(`So lon nhat la: ${max}, ở vị trí thứ: ${maxIndex}`);

let min = baiMot[0];
let minIndex = 0;
baiMot.forEach((item, index) => {
  index++;
  if (min > item) {
    min = item;
    minIndex = index;
  }
});
console.log(`So nho nhat la: ${min}, ở vị trí thứ: ${minIndex}`);

//Bai 2
const number = [1, 2, 5, 7, 8, 9, 10, 11, -2, 0];
let total = 0;
let isPrime = true;

number.forEach((item, index) => {
  if (item % 1 !== 0 || item < 2) {
    isPrime = false;
  } else if (item === 2) {
    isPrime = true;
  } else {
    for (var i = 2; i < item; i++) {
      if (item % i === 0) {
        isPrime = false;
        break;
      } else {
        isPrime = true;
      }
    }
  }
  if (isPrime) {
    console.log(item);
    total += item;
  }
});
console.log(total);

//Bai 3

const arrBa = [1, 2, 1, "a", "b", "a", 3, 5, 2];
const newArr = arrBa.filter((item, index) => {
  return arrBa.indexOf(item) === index;
});
console.log(newArr);

var newArray = [];
var arr = [1, 2, 1, "a", "b", "a", 3, 5, 2];
arr.forEach((item, index) => {
  if (arr.indexOf(item) === index) {
    newArray.push(item);
  }
});
console.log(newArray);

//bai 4
var baiBon = [-1, 3, 5, 0, 9, 6, -2];
var value = 4;
var result = baiBon.sort();
result.push(value);
console.log(result.sort());
// result.forEach((item, index) => {
//   if (value > item) {
//     result.push(value);
//   }
// });
