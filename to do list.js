document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    loadTasks();

    // Add task event
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addTask(taskInput.value);
        taskInput.value = '';
    });

    // Task list event (Edit, Delete, Complete)
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit')) {
            editTask(e.target.parentElement.parentElement);
        } else if (e.target.classList.contains('delete')) {
            deleteTask(e.target.parentElement.parentElement);
        } else if (e.target.tagName === 'LI') {
            toggleComplete(e.target);
        }
    });

    // Add task function
    function addTask(task) {
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(task));
        addTaskActions(li);
        taskList.appendChild(li);
        saveTasks();
    }

    // Edit task function
    function editTask(taskItem) {
        const newTask = prompt('Edit the task:', taskItem.firstChild.textContent);
        if (newTask) {
            taskItem.firstChild.textContent = newTask;
            saveTasks();
        }
    }

    // Delete task function
    function deleteTask(taskItem) {
        taskList.removeChild(taskItem);
        saveTasks();
    }

    // Toggle complete function
    function toggleComplete(taskItem) {
        taskItem.classList.toggle('completed');
        saveTasks();
    }

    // Add task actions (edit, delete)
    function addTaskActions(taskItem) {
        const actions = document.createElement('span');
        actions.classList.add('actions');
        
        const editButton = document.createElement('button');
        editButton.classList.add('edit');
        editButton.innerHTML = '✏️';
        actions.appendChild(editButton);
        
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete');
        deleteButton.innerHTML = '🗑️';
        actions.appendChild(deleteButton);

        taskItem.appendChild(actions);
    }

    // Save tasks to local storage
    function saveTasks() {
        const tasks = [];
        taskList.querySelectorAll('li').forEach(taskItem => {
            tasks.push({
                text: taskItem.firstChild.textContent,
                completed: taskItem.classList.contains('completed')
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Load tasks from local storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        if (tasks) {
            tasks.forEach(task => {
                const li = document.createElement('li');
                li.appendChild(document.createTextNode(task.text));
                if (task.completed) {
                    li.classList.add('completed');
                }
                addTaskActions(li);
                taskList.appendChild(li);
            });
        }
    }
});
