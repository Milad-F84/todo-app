//DOM NUDES
const input = document.getElementById("input");
const btn = document.getElementById("btn");
const root = document.getElementById("root");
let editableItemId = null;
let TODOS = [];

//FUNCTIONS
function addTodo() {
  const inputVal = input.value;
  const newId = Math.floor(Math.random() * 10000000);

  const newTodo = {
    id: newId,
    text: inputVal,
    isDone: false,
  };
  TODOS.push(newTodo);
  input.value = "";
  render();
}
render();

function render() {
  const template = TODOS.map((todo) => {
    if (todo.id === editableItemId) {
      return `
          <li>
          <input class="text-black text-sm w-auto flex-1 outline-none bg-transparent p-3 font-extralight border-b border-solid border-black placeholder:text-black"  id="editInput" type="text" value="${todo.text}" placeholder="add your new text"></input>
          <i class="fa-solid fa-check cursor-pointer" onclick="sumbitTodo(${todo.id})"></i>
          </li>
          `;
    }
    return `
      <li>
      ${todo.text}
      <i class="fa-solid fa-trash cursor-pointer" onclick="deleteTodo(${todo.id})"></i>
      <i class="fa-solid fa-pen-to-square cursor-pointer" onclick="editTodo(${todo.id})"></i>
      </li>
      `;
  }).join("");
  root.innerHTML = template;
}

function deleteTodo(todoId) {
  const newTodos = TODOS.filter((todo) => todo.id != todoId);
  TODOS = newTodos;
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
  render();
}

//EVENT
input.addEventListener("keypress", (evt) => {
  if (evt.key === "Enter") {
    addTodo();
  }
});
