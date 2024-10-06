document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById('create-task-form');
    const taskInput = document.getElementById('new-task-description');
    const userInput = document.getElementById('userInput');
    const priorityInput = document.getElementById('priorityInput');
    const taskList = document.getElementById('list');

    let tasks = [];
    let editTaskIndex = null; // Track the index of the task being edited

    // Handle form submission
    taskForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        const taskText = taskInput.value;
        const user = userInput.value;
        const priority = priorityInput.value;

        if (editTaskIndex !== null) {
            // Update existing task
            tasks[editTaskIndex] = { text: taskText, user, priority };
            editTaskIndex = null; // Reset the index after editing
        } else {
            // Add new task
            const task = {
                text: taskText,
                user: user,
                priority: priority,
            };
            tasks.push(task);
        }

        renderTasks();
        clearInputs();
    });

    function renderTasks() {
        taskList.innerHTML = ''; // Clear the list before rendering

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

    window.deleteTask = function(index) {
        if (confirm("Are you sure you want to delete this task?")) {
            tasks.splice(index, 1); // Remove the task from the array
            renderTasks(); // Re-render the task list
        }
    };

    window.editTask = function(index) {
        const task = tasks[index];
        taskInput.value = task.text; // Populate input fields with task data
        userInput.value = task.user;
        priorityInput.value = task.priority;
        editTaskIndex = index; // Set the index to know which task to edit
    };

    function clearInputs() {
        taskInput.value = '';
        userInput.value = '';
        priorityInput.value = 'low'; // Reset priority to default
    }

    // Sort tasks by priority (optional feature)
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
