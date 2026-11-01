// вешает обработчики на форму и кнопки
function initEvents() {

  const taskForm = document.getElementById('taskForm');
  const taskList = document.getElementById('taskList');

  // отправка формы добавляет задачу
  taskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const titleInput = taskForm.querySelector('input[name="title"]');
    const dateInput = taskForm.querySelector('input[name="date"]');

    const title = titleInput.value.trim();
    const date = dateInput.value;

    if (!title || !date) {
      return;
    }

    addTask(title, date);
    showTasks();

    titleInput.value = '';
    dateInput.value = '';
    
  });

  // клики внутри списка задач
  taskList.addEventListener('click', (event) => {

    const deleteBtn = event.target.closest('.task-item_delete');
    if (deleteBtn) {
      const id = deleteBtn.closest('.task-item').dataset.id;
      deleteTask(id);
      showTasks();
    }

    const checkbox = event.target.closest('.task-item_checkbox');
    if (checkbox) {
        const id = Number(checkbox.closest('.task-item').dataset.id);
        toggleDone(id);
        showTasks();
    }

  });

}