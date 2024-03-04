var a = 10;
var b = -5;
var c = 20;

// Bai 1
a = a + b;
b = a - b;
a = a - b;
console.log(a);
console.log(b);

//Bai 2
s = 10 + 20 + 5 ** 10 / 2;
console.log(s);

//Bai 3

var max = b;
if (a - max > 0 && a - c > 0) {
  document.write(`<h2>${a} la so lon nhat</h2>`);
} else if (c - max > 0 && c - a > 0) {
  document.write(`<h2>${c} la so lon nhat</h2>`);
} else {
  document.write(`<h2>${max} la so lon nhat</h2>`);
}

// Bai 4
if (a > 0 && b > 0) {
  document.write("<h2>Day la 2 so cung dau</h2>");
} else {
  document.write("<h2>2 so nay nguoc dau nhau</h2>");
}

// Bai 5
if (a > b) {
  let value = a;
  a = b;
  b = value;
}
if (b > c) {
  let value = b;
  b = c;
  c = value;
}
if (a > b) {
  let value = a;
  a = b;
  b = value;
}
document.write(`Sep theo thu tu tang dan la ${a} , ${b}, ${c}`);
