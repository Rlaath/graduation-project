const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
let toDos = [];

function saveTodo() {
  localStorage.setItem('TODOS', JSON.stringify(toDos));
}
function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  toDos = toDos.filter((todo) => todo.id !== parseInt(li.id));
  saveTodo();
}

function paintTodo(newTodo) {
  const li = document.createElement('li');
  li.id = newTodo.id;
  todoList.appendChild(li);
  const span = document.createElement('span');
  li.innerText = newTodo.text;
  li.appendChild(span);
  const button = document.createElement('button');
  button.innerText = '🚀';
  li.appendChild(button);

  button.addEventListener('click', deleteTodo);
}

function handleSubmit(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  todoInput.value = '';
  toDos.push(newTodoObj);

  paintTodo(newTodoObj);
  saveTodo();
}

todoForm.addEventListener('submit', handleSubmit);

const savedTodos = localStorage.getItem('TODOS');

if (savedTodos !== null) {
  const parsedTodos = JSON.parse(savedTodos);
  toDos = parsedTodos;
  parsedTodos.forEach(paintTodo);
}
