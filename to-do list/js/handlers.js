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

    const deleteBtn = event.target.closest('.task-item_delete'); //удаление задачи
    if (deleteBtn) {
      const id = deleteBtn.closest('.task-item').dataset.id;
      deleteTask(id);
      showTasks();
    }

    const checkbox = event.target.closest('.task-item_checkbox'); //выполнение задачи
    if (checkbox) {
        const id = checkbox.closest('.task-item').dataset.id;
        toggleDone(id);
        showTasks();
    }

    const editBtn = event.target.closest('.task-item_edit'); //редактирование задачи
    if (editBtn) {
        
    const li = editBtn.closest('.task-item');
    const id = li.dataset.id;
    const task = tasks.find(t => t.id === id);

    // очищаем li и вставляем форму из ui.js 
    li.replaceChildren();
    li.append(createEditForm(task, (newTitle, newDate) => {
        editTask(id, newTitle, newDate);
        showTasks();
    }));

    return;
    }

  });

  const filtersContainer = document.querySelector('.filters');
  
  filtersContainer.addEventListener('click', (event) => {
    const btn = event.target.closest('.filter-btn');
    if (!btn) return;

    // Убираем класс active у всех кнопок
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    
    // Добавляем active на нажатую
    btn.classList.add('active');

    // Меняем глобальную переменную
    currentFilter = btn.dataset.filter;

    // Перерисовываем список
    showTasks();
  });

  const searchInput = document.getElementById('searchInput');
  
  searchInput.addEventListener('input', () => {
    currentSearch = searchInput.value.trim(); //совпадение по названию
    showTasks();
  });

  const sortButton = document.getElementById('sortButton');
  
  sortButton.addEventListener('click', () => {
    sortTasksByDate();        
    isAscending = !isAscending; // переключаем направление при нажатии

    if (isAscending) {
      sortButton.textContent = 'Сортировать по дате ↑'; // старые сначала
    } else {
      sortButton.textContent = 'Сортировать по дате ↓'; // новые сначала
    }

    showTasks();              
  });

}