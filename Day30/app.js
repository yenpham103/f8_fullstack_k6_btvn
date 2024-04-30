let list = document.querySelectorAll(".list .item");
let listUpdate = document.querySelectorAll(".update");
list.forEach((item) => {
  item.addEventListener("click", function (e) {
    if (e.target.classList.contains("add")) {
      var itemNew = item.cloneNode(true);
      var cloneContent = itemNew.querySelector(".content");
      let update = document.createElement("button");
      update.classList.add("update");
      update.innerText = "Update";
      cloneContent.appendChild(update);
      let checkIsset = false;
      let listCart = document.querySelectorAll(".cart .item");
      listCart.forEach((cart) => {
        if (
          cart.getAttribute("data-key") === itemNew.getAttribute("data-key")
        ) {
          checkIsset = true;
          cart.classList.add("danger");
          setTimeout(function () {
            cart.classList.remove("danger");
          }, 1000);
        }
      });
      if (checkIsset === false) {
        document.querySelector(".listCart").appendChild(itemNew);
        let listUpdate = cloneContent.querySelectorAll(".update");
        listUpdate.forEach((update) => {
          update.addEventListener("click", function (e) {
            e.preventDefault();
            const parent = e.target.parentElement;
            let totalCost = parent.children[2];
            let input = parent.children[3];
            totalCost.innerText = `${20.03 * +input.value}$`;
          });
        });
      }
    }
  });
});
function Remove($key) {
  let listCart = document.querySelectorAll(".cart .item");
  listCart.forEach((item) => {
    if (item.getAttribute("data-key") == $key) {
      item.remove();
      return;
    }
  });
}
