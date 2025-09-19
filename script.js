let buttonClick = document.getElementById("but");
let input = document.getElementById("input");
let todos = document.getElementById("ul");

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach(task => {
    createTask(task.text, task.completed);
});

buttonClick.addEventListener("click", () => {
    if (input.value.trim() == "") {
        let msg = document.getElementById("msg");
        msg.style.display = "block"; // Shows an error message for an empty input 
    } else {
        msg.style.display = "none"; // Removes the error messages
        createTask(input.value, false);
        saveTasks();
        input.value = "";
    }
});

input.addEventListener("input", () => {
    if (input.value.trim() !== "") {
        msg.style.display = "none";
    } // this removes the error message when a key is pressed
});

function createTask(text, completed) {
    let li = document.createElement("li"); // creates a list tag in the unordered list

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";    // creates a checkbox to mark completed task
    checkbox.checked = completed;

    let span = document.createElement("span");
    span.textContent = text;
    if (completed) span.classList.add("completed");

    let deleteBut = document.createElement("button");
    deleteBut.textContent = "Delete Task";
    deleteBut.classList.add("deletebutton");

    deleteBut.addEventListener("click", () => {
        li.remove();
        saveTasks();
    });

    checkbox.addEventListener("change", () => {
        span.classList.toggle("completed");
        saveTasks();
    });

    li.appendChild(checkbox); 
    li.appendChild(span);
    li.appendChild(deleteBut);
    todos.append(li);
}

function saveTasks() {
    let taskArr = [];
    document.querySelectorAll("#ul li").forEach(li => {
        let span = li.querySelector("span");
        let checkbox = li.querySelector("input[type='checkbox']");
        taskArr.push({
            text: span.textContent,
            completed: checkbox.checked
        });
    });
    localStorage.setItem("tasks", JSON.stringify(taskArr));
}