let todoList = document.getElementById("todo-list")
let todoForm = document.querySelector(".todo-input-form")
let todoFormInput = document.getElementById("todo-input")

let todoListContent = []

function sanitizeInput(input) {
    console.log(`Sanitizing: ${JSON.stringify(input)}`)
    input["name"] = input["name"].replaceAll("<", "")
    input["name"] = input["name"].replaceAll(">", "")
    console.log(`Sanitized object: ${JSON.stringify(input)}`)
}

todoForm.addEventListener("submit", async (event) => {

    console.log("Form got submitted")
    event.preventDefault()
    console.log("Prevented Page reload")

    if (!todoFormInput.value) {
        console.log("Input is empty")
        return
    } else {
        console.log(`Input Value: ${todoFormInput.value}`)
    }

    let todoListEntry = {name: todoFormInput.value, status: "❌"}
    sanitizeInput(todoListEntry)

    if (todoListContent.some(entry => entry["name"] === todoListEntry["name"])) {
        console.log("Error adding Todo Entry: Todo Name already present")
        return
    } 
    

    todoListContent.push(todoListEntry)
    updateTodoList(todoListEntry)
    todoFormInput.value = ""

    console.log(`New Todo List: ${JSON.stringify(todoListContent)}`)
    console.log("--------------------")
    
})

function updateTodoList() {
    todoList.innerHTML = ""
    todoListContent.forEach(entry => {
        todoList.innerHTML += `
        <li class="todo-list-entry">
            <span class="todo-entry-name">Todo: ${entry["name"]}</span>
            <div class="todo-entry-buttons"> 
                <button id="${entry["name"]}-toggle-status-btn" 
                        class="todo-entry-button todo-entry-status-button">
                
                        ${entry["status"]}
                </button>

                <button id="${entry["name"]}-delete-btn" 
                        class="todo-entry-button todo-entry-delete-button">

                        🗑️
                </button>
            </div>
        </li>
    `
    });
}

todoList.addEventListener("click", (event) => {
    
    if(event.target.classList.contains("todo-entry-status-button")) {
        let todoListEntryName = event.target.id.slice(0, -18)
        console.log(`Status button triggered für ${todoListEntryName}`)

        let todo = todoListContent.find(entry => entry.name === todoListEntryName)

        console.log(JSON.stringify(todo))
        if(todo) {
            
            todo.status = todo.status === "❌" ? "✅" : "❌"
            console.log(`Changing status to ${todo.status}`)
            updateTodoList()
        }
        console.log(todo)
        
        console.log("---------------------------------------------")

    } else if(event.target.classList.contains("todo-entry-delete-button")) {
        let todoListEntryName = event.target.id.slice(0, -11)
        console.log(`Delete button triggered für ${todoListEntryName}`)

        let todo = todoListContent.find(entry => entry.name === todoListEntryName)
        console.log(`Todo to delete: ${todoListEntryName}`)

        todoListContent = todoListContent.filter(entry => entry.name != todoListEntryName)
        console.log(JSON.stringify(todoListContent))
        updateTodoList()
    }
})
 