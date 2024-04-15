const products = [
  {
    id: 1,
    name: "Product One",
    src: "./image-1.jpg",
  },
  {
    id: 2,
    name: "Product Two",
    src: "./image-2.jpg",
  },
  {
    id: 3,
    name: "Product Three",
    src: "./image-3.jpg",
  },
  {
    id: 4,
    name: "Product Four",
    src: "./image-4.jpg",
  },
];
const root = document.getElementById("root");
//Render
const htmls = `  <div class="carousel">
                         <div class="carousel-inner">
                           ${
                             products?.length
                               ? products
                                   .map?.((product, index) => {
                                     return `<div class="item">
                                           <img src="${product.src}" alt="Ảnh thứ ${product.id}">
                                      </div>`;
                                   })
                                   .join(" ")
                               : "<h2>Không có data trả về</h2>"
                           }
                         </div>
                         <div class="carousel-nav">
                               <span class="prev">&lt;</span>
                               <span class="next">&gt;</span>
                         </div>
                         <div class="carousel-dots"> 
                            ${
                              products?.length
                                ? products
                                    .map?.((product, index) => {
                                      return `
                                      <span data-index="${index}" class=""></span>`;
                                    })
                                    .join(" ")
                                : "<h2>Không có data trả về</h2>"
                            }
                         </div>
                </div> `;
root.innerHTML = htmls;

const carousel = document.querySelector(".carousel");
const carouselInner = carousel.querySelector(".carousel-inner");
const carouselItems = carousel.querySelectorAll(".item");
const carouselDots = carousel.querySelector(".carousel-dots");
const dots = carouselDots.querySelectorAll("span");

//btn
const btnPrev = document.querySelector(".prev");
const btnNext = document.querySelector(".next");

//dots
function updateActiveDot(index) {
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });
}
dots.forEach((dot, index) => {
  dot.addEventListener("click", function () {
    currentSlide = index;
    showSlide(currentSlide);
    updateActiveDot(currentSlide);
  });
});

let currentSlide = 0;
showSlide(currentSlide);

function showSlide(index) {
  carouselItems.forEach((item) => {
    item.classList.remove("active");
  });
  carouselItems[index].classList.add("active");
}

btnPrev.addEventListener("click", function () {
  currentSlide--;
  if (currentSlide < 0) {
    currentSlide = carouselItems.length - 1;
  }
  showSlide(currentSlide);
  updateActiveDot(currentSlide);
});

btnNext.addEventListener("click", function () {
  currentSlide++;
  if (currentSlide >= carouselItems.length) {
    currentSlide = 0;
  }
  showSlide(currentSlide);
  updateActiveDot(currentSlide);
});

//Drag
let isDrag = false;
let initialOffsetX = 0;
let moveWidth;
carouselInner.addEventListener("mousedown", function (e) {
  console.log(e);
  if (e.which === 1) {
    isDrag = true;
    initialOffsetX = e.offsetX;
  }
});
carouselInner.addEventListener("mouseup", function (e) {
  isDrag = false;
  if (moveWidth < 0) {
    if (Math.abs(moveWidth) > 100 && currentSlide < carouselItems.length - 1) {
      currentSlide++;
    } else {
      currentSlide = 0;
    }
    showSlide(currentSlide);
  } else {
    if (Math.abs(moveWidth) > 100 && currentSlide > 0) {
      currentSlide--;
    } else {
      currentSlide = carouselItems.length - 1;
    }
    showSlide(currentSlide);
  }
});
carouselInner.addEventListener("mousemove", function (e) {
  e.preventDefault();
  if (isDrag) {
    console.log(e);
    moveWidth = e.offsetX - initialOffsetX;
  }
});
