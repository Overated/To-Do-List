// Select elements
const form = document.getElementById('todoform');
const todoInput = document.getElementById('newtodo');
const todosListEl = document.getElementById('todos-list');
const notificationEl = document.querySelector('.notification');

// Variables
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let EditTodoId = -1;

// 1st render
renderTodos();

// Form submit
form.addEventListener('submit', function (event) {
  event.preventDefault();

  saveTodo();
  renderTodos();
  localStorage.setItem('todos', JSON.stringify(todos));
});

// Save todo
function saveTodo() {
  const todoValue = todoInput.value;

  // check if the todo is empty
  const isEmpty = todoValue === '';

  // check for duplicate todos
  const isDuplicate = todos.some((todo) => todo.value.toUpperCase() === todoValue.toUpperCase());

  if (isEmpty) {
    showNotification("Todo's input is empty");
  } else if (isDuplicate) {
    showNotification('Todo already exists!');
  } else {
    if (EditTodoId >= 0) {
      todos = todos.map((todo, index) => ({
        ...todo,
        value: index === EditTodoId ? todoValue : todo.value,
      }));
      EditTodoId = -1;
    } else {
      todos.push({
        value: todoValue,
        checked: false,
        color: '#' + Math.floor(Math.random() * 16777215).toString(16),
      });
    }

    todoInput.value = '';
  }
}

// Render todo
function renderTodos() {
  if (todos.length === 0) {
    todosListEl.innerHTML = '<center>Nothing to do! Please add something to do :)</center>';
    return;
  }

  // Clear element before Render
  todosListEl.innerHTML = '';

  // Render todo
  todos.forEach((todo, index) => {
    todosListEl.innerHTML += `
    <div class="todo" id=${index}>
      <i 
        class="bi ${todo.checked ? 'bi-check-circle-fill' : 'bi-circle'}"
        style="color : ${todo.color}"
        data-action="check"
      ></i>
      <p class="${todo.checked ? 'checked' : ''}" data-action="check">${todo.value}</p>
      <i class="bi bi-pencil-square" data-action="edit"></i>
      <i class="bi bi-trash" data-action="delete"></i>
    </div>
    `;
  });
}

// Click event for all checked
todosListEl.addEventListener('click', (event) => {
  const target = event.target;
  const parentElement = target.parentNode;

  if (parentElement.className !== 'todo') return;

  // todo id
  const todo = parentElement;
  const todoId = Number(todo.id);

  // target action
  const action = target.dataset.action;

  action === 'check' && checkTodo(todoId);
  action === 'edit' && editTodo(todoId);
  action === 'delete' && deleteTodo(todoId);
});

// Check todo
function checkTodo(todoId) {
  todos = todos.map((todo, index) => ({
    ...todo,
    checked: index === todoId ? !todo.checked : todo.checked,
  }));

  renderTodos();
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Edit todo
function editTodo(todoId) {
  todoInput.value = todos[todoId].value;
  EditTodoId = todoId;
}

// Delete todo
function deleteTodo(todoId) {
  todos = todos.filter((todo, index) => index !== todoId);
  EditTodoId = -1;

  // Re-render
  renderTodos();
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Show a notification
function showNotification(msg) {
  // change the message
  notificationEl.innerHTML = msg;

  // notification enter
  notificationEl.classList.add('notif-enter');

  // notification leave
  setTimeout(() => {
    notificationEl.classList.remove('notif-enter');
  }, 2000);
}