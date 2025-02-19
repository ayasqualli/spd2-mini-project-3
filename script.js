const addButton = document.querySelector(".fa.fa-tasks");
var sound = new Audio("/alert.mp3");

// Load tasks from localStorage
function loadTasks() {
    const taskList = document.querySelector(".task-list");
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach((task, index) => {
        const newTask = document.createElement("li");
        newTask.innerHTML = `
            <form class="add-form">
                <input type="checkbox" ${task.checked ? 'checked' : ''} />
                <input type="number" min="0" max="23" value="${task.hour}" />
                <span style="color: black; margin-right: 2px">:</span>
                <input type="number" min="0" max="60" value="${task.minute}" />
                <input type="text" value="${task.text}" placeholder="Add your task note" />
                <button class="fa fa-trash"></button>
            </form>
        `;
        taskList.appendChild(newTask);
    });
}

// Save tasks to localStorage
function saveTasks() {
    const tasks = document.querySelectorAll(".task-list li");
    const taskArray = Array.from(tasks).map(task => {
        return {
            checked: task.querySelector('input[type="checkbox"]').checked,
            hour: task.querySelector('input[type="number"]:nth-child(2)').value,
            minute: task.querySelector('input[type="number"]:nth-child(4)').value,
            text: task.querySelector('input[type="text"]').value
        };
    });
    localStorage.setItem("tasks", JSON.stringify(taskArray));
}

// Current time display
function showTime() {
    const timer = document.querySelector("#time");
    let time = new Date();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let seconds = time.getSeconds();
    let currentTime = String(hour).padStart(2, '0') + ":" + String(minute).padStart(2, '0') + ":" + String(seconds).padStart(2, '0');
    timer.textContent = "Il est actuellement " + currentTime;
}

setInterval(showTime, 1000);

// Add tasks functionality
function addTask() {
    const taskList = document.querySelector(".task-list");
    const newTask = document.createElement("li");
    newTask.innerHTML = `
        <form class="add-form">
            <input type="checkbox" />
            <input type="number" min="0" max="23" value="0" />
            <span style="color: black; margin-right: 2px">:</span>
            <input type="number" min="0" max="60" value="0" />
            <input type="text" placeholder="Add your task note" />
            <button class="fa fa-trash"></button>
        </form>
    `;
    taskList.appendChild(newTask);
    saveTasks();
}

addButton.addEventListener('click', addTask);

// Alert function with sound playing
function alertChecked() {
    let time = new Date();
    const tasks = document.querySelectorAll(".task-list li");
    tasks.forEach(task => {
        const checkbox = task.querySelector('input[type="checkbox"]');
        let taskText = task.querySelector('input[type="text"]').value;
        let hour = task.querySelector('input[type="number"]:nth-child(2)').value;
        let minute = task.querySelector('input[type="number"]:nth-child(4)').value;
        if (checkbox.checked) {
            if (time.getHours() == hour && time.getMinutes() == minute) {
                sound.play();
                alert(taskText);
            checkbox.checked = false; // Uncheck the checkbox to prevent further alerts
            }
        }
    });
}


// Delete function
document.querySelector(".task-list").addEventListener("click", function(event) {
    if (event.target.classList.contains("fa-trash")) {
        event.target.closest("li").remove();
        saveTasks();
    }
});

// Load tasks on page load
window.addEventListener('load', loadTasks);