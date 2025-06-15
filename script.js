document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage on page load
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Function to add a task (either from input or Local Storage)
    function addTask(taskText, save = true) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        removeBtn.onclick = () => {
            taskList.removeChild(li);
            removeTaskFromLocalStorage(taskText);
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save to Local Storage if not loading from storage
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Function to remove a task from Local Storage
    function removeTaskFromLocalStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Add task when button is clicked
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText === "") {
            alert('Please enter a task.');
            return;
        }
        addTask(taskText);
        taskInput.value = '';
    });

    // Add task when Enter key is pressed
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const taskText = taskInput.value.trim();
            if (taskText === "") {
                alert('Please enter a task.');
                return;
            }
            addTask(taskText);
            taskInput.value = '';
        }
    });
});
