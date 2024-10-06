document.addEventListener("DOMContentLoaded", () => {
 // script.js
const taskForm = document.getElementById('create-task-form');
const taskInput = document.getElementById('new-task-description');
const userInput = document.getElementById('userInput');
const priorityInput = document.getElementById('priorityInput');
const taskList = document.getElementById('list');

let tasks = [];

// Handle form submission
taskForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const taskText = taskInput.value;
    const user = userInput.value;
    const priority = priorityInput.value;

    const task = {
        text: taskText,
        user: user,
        priority: priority,
    };
    
    tasks.push(task);
    renderTasks();
    clearInputs();
});

function renderTasks() {
    // taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.priority;
        li.innerHTML = `
            <span>${task.text} <br/>(Created by: ${task.user}, Priority: ${task.priority})</span>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function editTask(index) {
    const task = tasks[index];
    taskInput.value = task.text;
    userInput.value = task.user;
    durationInput.value = task.duration;
    dateInput.value = task.dueDate;
    priorityInput.value = task.priority;
    deleteTask(index); // Remove from list, user can update and add again
}

function clearInputs() {
    taskInput.value = '';
    userInput.value = '';
    priorityInput.value = 'low';
}

// Sort tasks by priority
function sortTasks(order = 'asc') {
    tasks.sort((a, b) => {
        const priorityValues = { low: 1, medium: 2, high: 3 };
        return order === 'asc' 
            ? priorityValues[a.priority] - priorityValues[b.priority]
            : priorityValues[b.priority] - priorityValues[a.priority];
    });
    renderTasks();
}


});
