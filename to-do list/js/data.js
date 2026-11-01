// массив задач
let tasks = [];

// загружает задачи из localStorage
function loadTasks() {
  const saved = localStorage.getItem('tasks');
  if (saved) {
    tasks = JSON.parse(saved);
  } else {
    tasks = [];
  }
}

// сохраняет задачи в localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}