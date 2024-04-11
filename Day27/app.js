var input = document.querySelector("input");
var button = document.querySelector("button");
var form = document.querySelector("form");
var todos = document.querySelector(".todo");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let value = input.value.trim();
  if (value) {
    addTodoElement({
      text: value,
    });
  }
  input.value = "";
});
function addTodoElement(todo) {
  var li = document.createElement("li");
  li.innerHTML = `
       <div>
          <i class=" edit fa-solid fa-pen-to-square"></i>
          <i class="delete fa-solid fa-trash"></i>
       </div>
       <button class="update" type="submit">Update</button>
       `;
  //Fix XSS
  var p = document.createElement("p");
  p.innerText = todo.text;
  li.prepend(p);
  //Completed
  var pCompleted = li.querySelector("p");
  pCompleted.addEventListener("click", function () {
    if (!btnUpdate.classList.contains("active")) {
      pCompleted.classList.toggle("completed");
    }
  });

  //Delete
  var deleteBtn = li.querySelector(".delete");
  deleteBtn.addEventListener("click", function () {
    this.parentElement.parentElement.remove();
  });

  //Edit
  var editBtn = li.querySelector(".edit");
  var div = editBtn.parentElement;
  var btnUpdate = div.nextElementSibling;
  var paragraph = div.previousElementSibling;
  var liParent = div.parentElement;
  editBtn.addEventListener("click", function () {
    liParent.setAttribute("class", "update-value");
    btnUpdate.classList.add("active");
    div.style.display = "none";
    paragraph.setAttribute("contenteditable", "true");
    pCompleted.classList.remove("completed");
  });
  btnUpdate.addEventListener("click", function () {
    liParent.setAttribute("class", "");
    btnUpdate.classList.remove("active");
    div.style.display = "flex";
    paragraph.setAttribute("contenteditable", "false");
  });

  todos.appendChild(li);
}
