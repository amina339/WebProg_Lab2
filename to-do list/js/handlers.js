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

  //drag and drop
  let draggedTaskId = null; // айди задачи которую тащим

  // начали тащить
  taskList.addEventListener('dragstart', (event) => {
    const li = event.target.closest('.task-item');
    if (li) {
      draggedTaskId = li.dataset.id;
      li.classList.add('dragging'); // добавляем класс для визуальной красоты
    }
  });

  // закончили тащить 
  taskList.addEventListener('dragend', (event) => {
    const li = event.target.closest('.task-item');
    if (li) {
      li.classList.remove('dragging');
    }

    document.querySelectorAll('.task-item').forEach(item => {
    item.classList.remove('drag-over-top', 'drag-over-bottom');
    });

  });

  // тащим над другой задачей 
  taskList.addEventListener('dragover', (event) => {
    event.preventDefault(); // отменяем стандартное поведение браузера

        // Находим задачу, над которой сейчас курсор
    const targetLi = event.target.closest('.task-item');
    
    // Убираем полоски со всех остальных задач
    document.querySelectorAll('.task-item').forEach(item => {
        item.classList.remove('drag-over-top', 'drag-over-bottom');
    });

    // Если курсор над задачей и это не та задача, которую мы тащим
    if (targetLi && targetLi.dataset.id !== draggedTaskId) {
        // Вычисляем, над верхней или нижней половиной задачи находится курсор
        const rect = targetLi.getBoundingClientRect();
        const middle = rect.y + rect.height / 2;
        
        if (event.clientY < middle) {
        targetLi.classList.add('drag-over-top'); // Если мышка сверху — полоска сверху
        } else {
        targetLi.classList.add('drag-over-bottom'); // Если снизу — полоска снизу
        }
    }
  });

  // бросили задачу
  taskList.addEventListener('drop', (event) => {
    event.preventDefault();
    const targetLi = event.target.closest('.task-item');
    
    // если бросили не на задачу или на ту же самую — ничего не делаем
    if (!targetLi || !draggedTaskId) return;
    
    const targetId = targetLi.dataset.id;
    if (targetId === draggedTaskId) return;

    // бросили: выше или ниже середины блока
    const isDropTop = targetLi.classList.contains('drag-over-top');

    const fromIndex = tasks.findIndex(t => t.id === draggedTaskId);
    
    // Вырезаем задачу из старой позиции
    const [movedTask] = tasks.splice(fromIndex, 1);

    // Находим новую позицию  задачи
    let toIndex = tasks.findIndex(t => t.id === targetId);

    // Если бросили в нижнюю половину — вставляем после задачи
    if (!isDropTop) {
      toIndex = toIndex + 1;
    }

    tasks.splice(toIndex, 0, movedTask);

    // Очищаем классы и перерисовываем
    document.querySelectorAll('.task-item').forEach(item => {
      item.classList.remove('drag-over-top', 'drag-over-bottom');
    });
    saveTasks();   
    showTasks();   
  });

}