import { debounce } from "./debounce.js";
//
const addTodoContent = document.querySelector(".add-todo");
const overlay = document.querySelector(".overlay");
const form = addTodoContent.querySelector("#form");
const inputAddTodo = form.querySelector("input");
const listTodoCompleted = document.querySelector(".list-todo-completed");

//Element Btn
const btnAddTodo = document.querySelector(".btn-add-todo");
const btnCancel = document.querySelector(".btn-cancel");
const btnSaveTodo = form.querySelector(".btn-save");
const btnCancelTodo = form.querySelector(".btn-cancel");
const btnCompleted = document.querySelector(".completed");

//Api
const SERVER_API = `https://ktcmlw-8080.csb.app`;

//show add todo

//Ham
function showAddBtn() {
  addTodoContent.classList.add("active");
  overlay.classList.add("active");
}
function closeAddTodo() {
  addTodoContent.classList.remove("active");
  overlay.classList.remove("active");
}

//Event
btnAddTodo.addEventListener("click", (e) => {
  e.preventDefault;
  showAddBtn();
});
btnCancel.addEventListener("click", closeAddTodo);
overlay.addEventListener("click", closeAddTodo);
document.addEventListener("keyup", (e) => {
  if (e.key === "Escape") {
    closeAddTodo();
  }
});
const listTodo = document.querySelector(".list-todo-main");
const renderUser = (todos) => {
  listTodo.innerHTML = "";
  todos.map(({ id, name }) => {
    const todoDiv = document.createElement("div");
    todoDiv.className = "todo";
    const span = document.createElement("span");
    span.className = "content-todo";
    span.textContent = `${name}`;
    todoDiv.innerHTML = `
      <div class="list-btn">
        <button class="delete" data-type="delete" data-id="${id}">
          <i class="fa-regular fa-trash-can"></i>
        </button>
        <button class="edit" data-type="edit" data-id="${id}">
          <i class="fa-regular fa-pen-to-square"></i>
        </button>
        <button class="save" data-type="save" data-id="${id}">
          <i class="fa-solid fa-download"></i>
        </button>
      </div>
    `;
    todoDiv.prepend(span);
    return listTodo.appendChild(todoDiv);
  });
};

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const data = Object.fromEntries([...new FormData(e.target)]);
  if (e.target.dataset.id) {
    const todoId = e.target.dataset.id;
    if (e.target.dataset.url === "todos") {
      updateTodo(data, todoId, "todos");
    } else {
      updateTodo(data, todoId, "completed");
    }
  } else {
    addTodo(data, "todos");
  }
  form.reset();
  closeAddTodo();
});
const getTodos = async (url) => {
  const response = await fetch(`${SERVER_API}/${url}`);
  const todos = await response.json();
  renderUser(todos);
};
getTodos("todos");
// getTodos("completed");

//Gui todo len server
const addTodo = async (data, url) => {
  try {
    const response = await fetch(`${SERVER_API}/${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      getTodos("todos");
      getCompleteds();
    } else {
      alert("Đã có lỗi xảy ra");
    }
  } catch (error) {
    console.error("Đã xảy ra lỗi:", error);
    alert("Không thể thêm task. Vui lòng thử lại sau.");
  }
};
const handleTodos = (e) => {
  const target = e.target;
  const parent = target.parentElement;

  const todoId = target.dataset.id || parent.dataset.id;

  const spanValue =
    target.parentElement.parentElement.parentElement.children[0].innerText;
  if (target.classList.contains("edit") || parent.classList.contains("edit")) {
    e.stopPropagation();
    if (
      target.parentElement.parentElement.parentElement.classList.contains(
        "list-todo-main"
      ) ||
      parent.parentElement.parentElement.parentElement.classList.contains(
        "list-todo-main"
      )
    ) {
      getTodo(todoId, "todos");
    } else {
      getTodo(todoId, "completed");
    }
    showAddBtn();
  }

  if (
    target.classList.contains("delete") ||
    parent.classList.contains("delete")
  ) {
    e.stopPropagation();
    if (
      target.parentElement.parentElement.parentElement.classList.contains(
        "list-todo-main"
      ) ||
      parent.parentElement.parentElement.parentElement.classList.contains(
        "list-todo-main"
      )
    ) {
      deleteTodo(todoId, "todos");
    } else {
      deleteTodo(todoId, "completed");
    }
  }

  if (target.classList.contains("save") || parent.classList.contains("save")) {
    if (
      target.parentElement.parentElement.parentElement.classList.contains(
        "list-todo-main"
      ) ||
      parent.parentElement.parentElement.parentElement.classList.contains(
        "list-todo-main"
      )
    ) {
      changeTodo(todoId, spanValue, "todos");
    } else {
      changeTodo(todoId, spanValue, "completed");
    }
  }
};
const changeTodo = async (todoId, value, url) => {
  if (url === "todos") {
    deleteTodo(todoId, "todos");
    addTodo({ name: value }, "completed");
  } else {
    deleteTodo(todoId, "completed");
    addTodo({ name: value }, "todos");
  }
};
listTodo.addEventListener("click", handleTodos);
listTodoCompleted.addEventListener("click", handleTodos);

//delete function
const deleteTodo = async (todoId, url) => {
  try {
    const response = await fetch(`${SERVER_API}/${url}/${todoId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      alert("Không xóa được");
      return;
    }
    getTodos("todos");
    getCompleteds();
  } catch (error) {
    console.error("Lỗi");
  }
};
//edit function
const updateTodo = async (data, todoId, url) => {
  const response = await fetch(`${SERVER_API}/${url}/${todoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    getTodos("todos");
    getCompleteds();
    form.removeAttribute("data-id");
  } else {
    alert("Không update được");
  }
};

const getTodo = async (todoId, url) => {
  const response = await fetch(`${SERVER_API}/${url}/${todoId}`);
  const todo = await response.json();
  if (!response.ok) {
    alert("Không lấy được todo");
  }
  updateFormData(todo, url);
};

const updateFormData = ({ id, name }, url) => {
  form.elements.name.value = name;
  form.dataset.id = id;
  form.dataset.url = url;
};

//Completed

function toggleCompleted() {
  btnCompleted.classList.toggle("active");
  listTodoCompleted.classList.toggle("active");
  const icon = btnCompleted.querySelector("i");
  if (btnCompleted.classList.contains("active")) {
    icon.classList.replace("fa-circle-arrow-right", "fa-circle-arrow-down");
  } else {
    icon.classList.replace("fa-circle-arrow-down", "fa-circle-arrow-right");
  }
}
btnCompleted.addEventListener("click", (e) => {
  e.preventDefault();
  toggleCompleted();
});

const renderCompleted = (completeds) => {
  const countCompleted = document.querySelector(".count");
  let count = completeds.length;
  countCompleted.innerText = count;
  listTodoCompleted.innerHTML = "";
  completeds.map(({ id, name }, index) => {
    const todoDiv = document.createElement("div");
    todoDiv.className = "todo";
    const span = document.createElement("span");
    span.className = "content-todo";
    span.textContent = `${name}`;
    todoDiv.innerHTML = `
      <div class="list-btn">
        <button class="delete" data-type="delete" data-id="${id}">
          <i class="fa-regular fa-trash-can"></i>
        </button>
        <button class="edit" data-type="edit" data-id="${id}">
          <i class="fa-regular fa-pen-to-square"></i>
        </button>
        <button class="save" data-type="save" data-id="${id}">
          <i class="fa-solid fa-download"></i>
        </button>
      </div>
    `;
    todoDiv.prepend(span);
    return listTodoCompleted.appendChild(todoDiv);
  });
};
const getCompleteds = async () => {
  const response = await fetch(`${SERVER_API}/completed`);
  const completeds = await response.json();
  renderCompleted(completeds);
};
getCompleteds();

//search
const autoShowCompleted = () => {};
const keywordEl = document.querySelector(".search");
const handleSearch = debounce((e) => {
  const keyword = e.target.value;
  searchUser("todos", keyword);
  searchUser("completed", keyword);
}, 500);
const searchUser = async (url, keyword) => {
  const response = await fetch(`${SERVER_API}/${url}?q=${keyword}`);
  const data = await response.json();
  if (url === "todos") {
    renderUser(data);
  } else {
    renderCompleted(data);
    toggleCompleted();
  }

  // renderCompleted(todo);
};
keywordEl.addEventListener("input", handleSearch);
