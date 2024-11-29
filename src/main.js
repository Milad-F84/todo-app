//DOM NUDES
const input = document.getElementById("input");
const btn = document.getElementById("btn");
const root = document.getElementById("root");
let editableItemId = null;
let TODOS = JSON.parse(localStorage.getItem("todos"));
if (!TODOS) {
  TODOS = [];
}

//FUNCTIONS
function addTodo() {
  const inputVal = input.value;
  if (inputVal) {
    const newId = Math.floor(Math.random() * 10000000);

    const newTodo = {
      id: newId,
      text: inputVal,
      isDone: false,
    };
    TODOS.push(newTodo);
    input.value = "";
    window.localStorage.setItem("todos", JSON.stringify(TODOS));
    render();
  }
}
render();

function render() {
  const template = TODOS.map((todo) => {
    if (todo.id === editableItemId) {
      return `
          <li>
          <input class="w-auto bg-transparent text-black border-b-2 border-solid border-slate-300 py-4 px-2 focus:outline-none focus:border-blue-600 placeholder:text-black"  id="editInput" type="text" value="${todo.text}" placeholder="add your new text"></input>
          <i class="fa-solid fa-check cursor-pointer relative text-lg" onclick="sumbitTodo(${todo.id})"></i>
          </li>
          `;
    }
    return `
      <li>
      ${todo.text}
      <i class="fa-solid fa-trash cursor-pointer text-lg" onclick="deleteTodo(${todo.id})"></i>
      <i class="fa-solid fa-pen-to-square cursor-pointer text-lg" onclick="editTodo(${todo.id})"></i>
      </li>
      `;
  }).join("");
  root.innerHTML = template;
}

function deleteTodo(todoId) {
  const newTodos = TODOS.filter((todo) => todo.id != todoId);
  TODOS = newTodos;
  window.localStorage.setItem("todos", JSON.stringify(TODOS));
  render();
}

function editTodo(todoId) {
  editableItemId = todoId;
  render();
}

function sumbitTodo(todoId) {
  const inputEdit = document.getElementById("editInput");
  const newTodos = TODOS.map((todo) => {
    if (todo.id === todoId) {
      return {
        ...todo,
        text: inputEdit.value,
      };
    } else {
      return todo;
    }
  });
  TODOS = newTodos;
  editableItemId = null;
  window.localStorage.setItem("todos", JSON.stringify(TODOS));
  render();
}

//EVENT
input.addEventListener("keypress", (evt) => {
  if (evt.key === "Enter") {
    addTodo();
  }
});
