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
        ></i>
        <p class="">${todo.value}</p>
        <i class="bi bi-pencil-square"></i>
        <i class="bi bi-trash3"></i>
      </div>
      `
    })

}
