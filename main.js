// todoform
const form = document.getElementById("todoform");
const todoInput = document.getElementById("newtodo");
const todoListElement = document.getElementById("todos-list");


// variable
let todos = [];

// Form submit
form.addEventListener('submit', function (event) {
    event.preventDefault();
  
    saveTodo();
    renderTodos();
});

// Save todo function

function saveTodo(){
    const todoValue = todoInput.value
    
    // check if the to do is empty
    const isEmpty = todoValue === "";

    //check
    const isDuplicate = todos.some((todo) => todo.value.toUpperCase === todoValue.toLowerCase);

    if(isEmpty){
        alert("Todo's input is empty");
    } else if (isDuplicate) {
        alert("Todo already exists!");
    } else {
        todos.push({
            value : todoValue,
            checked : false,
            color : "#" + Math.floor(Math.random() * 16777215).toString(16),
        });        
        todoInput.value = "";        
    }
    

}

// Render todo function
function renderTodos (){

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
        <p class="" data-action="check">${todo.value}</p>
        <i class="bi bi-pencil-square" data-action="edit"></i>
        <i class="bi bi-trash3" data-action="delete"></i>
      </div>
      `
    })

}

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

// check to do button 
function checkTodo(todoId) {
    todos = todos.map((todo, index) => ({
        ...todo,
        checked: index === todoId ? !todo.checked : todo.checked,
    }));
    renderTodos();

}