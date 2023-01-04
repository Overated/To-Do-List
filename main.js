// todoform
const form = document.getElementById("todoform");
const todoInput = document.getElementById("newtodo");
const todoListElement = document.getElementById("todos-list");
const notEle = document.querySelector("notification");


// variable
//local storge last entries come from this code
let todos = JSON.parse(localStorage.getItem("todos")) || [];
let EditTodoId = -1;

//1st render
renderTodos();

// Form submit
form.addEventListener('submit', function (event) {
    event.preventDefault();
  
    saveTodo();
    renderTodos();
    //Local storage add
    localStorage.setItem("todos", JSON.stringify(todos))
});

// Save todo function

function saveTodo(){
    const todoValue = todoInput.value
    
    // check if the to do is empty
    const isEmpty = todoValue === "";

    //check
    const isDuplicate = todos.some((todo) => todo.value.toUpperCase === todoValue.toLowerCase);

    if(isEmpty){
        showNotification("Todo's input is empty");
    } else if (isDuplicate) {
        showNotification("Todo already exists!");
    } else {
        if (EditTodoId >= 0) {
            //update the edit todo
            todos = todos.map((todo, index) => ({
                    ...todo,
                    value : index === EditTodoId ? todoValue : todo.value,
                }));
                EditTodoId = -1;
        } else {
            todos.push({
                value : todoValue,
                checked : false,
                color : "#" + Math.floor(Math.random() * 16777215).toString(16),
            });
        }
        todoInput.value = "";        
    }
    
};


// Render todo function
function renderTodos (){
    if (todos.length === 0) {
        todoListElement.innerHTML = "<center>Nothing to do!</center>";
        return;
    }

    // clear element before re-render
    todoListElement.innerHTML = "";

    todos.forEach((todo, index) => {
        todoListElement.innerHTML += `
        <div class="todo" id=${index}>
        <i 
            class="bi ${todo.checked ? "bi-check-circle-fill" : "bi-circle"}"
            style="color : ${todo.color}"
            data-action="check"
        ></i>
        <p class="${todo.checked ? "checked" : ""}" data-action="check">${todo.value}</p>
        <i class="bi bi-pencil-square" data-action="edit"></i>
        <i class="bi bi-trash3" data-action="delete"></i>
      </div>
      `
    })

};

// click event listener for all the todos
todoListElement.addEventListener("click", (event) => {
    const target = event.target;
    const parentElement = target.parentNode;

    if(parentElement.className !== "todo") return;

    // todo id numbers
    const todo = parentElement;
    const todoId = Number(todo.id);

    // todo button actions
    const action = target.dataset.action

    action === "check" && checkTodo(todoId)
    action === "edit" && editTodo(todoId)
    action === "delete" && deleteTodo(todoId)
 
});

// Check to do button 
function checkTodo(todoId) {
    todos = todos.map((todo, index) => ({
        ...todo,
        checked: index === todoId ? !todo.checked : todo.checked,
    }));
    renderTodos();
    localStorage.setItem("todos", JSON.stringify(todos))

};

// Edit to do button
function editTodo(todoId) {
    todoInput.value = todos[todoId].value;
    EditTodoId = todoId;
};

//delete to do
function deleteTodo(todoId) {
    todos = todos.filter((todo, index) => index !== todoId);
    EditTodoId = -1;

    //re-render
    renderTodos();
    localStorage.setItem("todos", JSON.stringify(todos))
};

// show a notification alert
function showNotification(msg) {
    // change the message
    notEle.innerHTML = msg;
  
    // notification enter
    notEle.classList.add('notif-enter');
  
    // notification dissapear code 2000ms
    setTimeout(() => {
        notEle.classList.remove('notif-enter');
    }, 2000);
}