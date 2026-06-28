const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('tasks')) || []; // C = Create, R = Read

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks)); // Save to browser
}

function renderTasks() {
  list.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.classList.add('task-item');
    if (task.done) li.classList.add('done'); // U = Update

    li.innerHTML = `
      <span onclick="toggleTask(${index})">${task.text}</span>
      <button class="delete-btn" onclick="deleteTask(${index})">X</button>
    `; // D = Delete
    list.appendChild(li);
  });
}

function toggleTask(index) {
  tasks[index].done =!tasks[index].done;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text) {
    tasks.push({ text, done: false }); // Create
    input.value = '';
    saveTasks();
    renderTasks();
  }
});

renderTasks(); // Load on start