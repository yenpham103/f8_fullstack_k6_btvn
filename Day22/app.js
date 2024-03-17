// //Bai 1

var arrA = [1, 4, 3, 2];
var arrB = [5, 2, 6, 7, 1];

// //Cach 1
function sameNumber(arr1, arr2) {
  return arr1.filter((number) => arr2.includes(number));
}
var result = sameNumber(arrA, arrB);
console.log(result);

// //Cach 2
var result = [];
arrA.filter((number) => {
  if (arrB.includes(number)) {
    result.push(number);
  }
});
console.log(result);

//Bai 2

//Cach 1
var arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];
var newArr = arr.flat(Infinity);
console.log(newArr);

//Cach 2
var array = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];
const flatArray = array.reduce((prev, current) => {
  if (Array.isArray(current)) {
    const flatArrayChild = current.reduce((prevChild, currentChild) => {
      return prevChild.concat(currentChild);
    }, []);
    return prev.concat(...flatArrayChild);
  } else {
    return prev.concat(current);
  }
}, []);
console.log(flatArray);

//Bai 3
const arrThree = [
  ["a", 1, true],
  ["b", 2, false],
];
const resultTwo = [[], [], []];

arrThree.forEach((item) => {
  item.forEach((type) => {
    if (typeof type === "string") {
      resultTwo[0].push(type);
    }
    if (typeof type === "number") {
      resultTwo[1].push(type);
    }
    if (typeof type === "boolean") {
      resultTwo[2].push(type);
    }
  });
});
console.log(resultTwo);

//Using reduce

const arr3 = [
  ["a", 1, true],
  ["b", 2, false],
];

const ketQua = arr3.reduce((acc, items) => {
  items.forEach((item) => {
    const type = typeof item;
    acc[type] = acc[type] || [];
    acc[type].push(item);
  });
  return acc;
}, []);
console.log(ketQua);

//Bai 4
const app = [
  {
    title: "Tieu de bai viet 1",
    des: "Lorem ipsum dolor sit amet, consectetur ",
    img: "./asset/img/photo1.png",
  },
  {
    title: "Tieu de bai viet 2",
    des: "Lorem ipsum dolor sit amet, consectetur ",
    img: "./asset/img/photo2.png",
  },
  {
    title: "Tieu de bai viet 3",
    des: "Lorem ipsum dolor sit amet, consectetur ",
    img: "./asset/img/photo3.png",
  },
];
