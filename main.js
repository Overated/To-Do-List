// todoform
const form = document.getElementById("todoform");
const todoInput = document.getElementById("newtodo");

// variable
let todos = [];

// Form submit
form.addEventListener('submit', function (event) {
    event.preventDefault();
  
    saveTodo();
    console.log("submit");
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
