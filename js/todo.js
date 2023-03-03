const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');
let todos = [];
const TODOS_KEY = 'TODOS';

function saveTodo() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function deleteTodo(event) {
  const li = event.target.parentElement;
  li.remove();
  todos = todos.filter((todo) => todo.id !== parseInt(li.id));
  saveTodo();
}

function paintTodo(newTodo) {
  const li = document.createElement('li');
  li.id = newTodo.id;
  todoList.appendChild(li);
  const span = document.createElement('span');
  span.innerText = newTodo.text;
  li.appendChild(span);
  const button = document.createElement('button');
  button.innerText = '🐬';
  li.appendChild(button);

  button.addEventListener('click', deleteTodo);
}

function todoSubmit(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  todos.push(newTodoObj);
  todoInput.value = '';

  paintTodo(newTodoObj);
  saveTodo();
}

todoForm.addEventListener('submit', todoSubmit);

const savedTodo = localStorage.getItem(TODOS_KEY);

if (savedTodo !== null) {
  const parsedTodos = JSON.parse(savedTodo);
  todos = parsedTodos;
  parsedTodos.forEach(paintTodo);
}
