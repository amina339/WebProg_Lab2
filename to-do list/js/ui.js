let currentFilter = 'all'; //глобальная переменная фильтра
let currentSearch = ''; // глобальная переменная поиска
let isAscending = true; // глобальная переменная сортировки

// создает всю структуру приложения
function buildApp() {
  const app = document.createElement('div');
  app.className = 'app';

  // шапка
  const header = document.createElement('header');
  header.className = 'header'; 

  const title = document.createElement('h1');
  title.className = 'header_title';
  title.textContent = 'To-Do List Mina';

  header.append(title);

  // основная часть
  const main = document.createElement('main');
  main.className = 'main';

  // форма добавления задачи, отдельные элементы задачи
  const form = document.createElement('form');
  form.className = 'task-form';
  form.id = 'taskForm';

  const inputTaskTitle = document.createElement('input'); //Название таски
  inputTaskTitle.className = 'task-form_input';
  inputTaskTitle.type = 'text';
  inputTaskTitle.name = 'title';
  inputTaskTitle.placeholder = 'Название задачи';
  inputTaskTitle.required = true;

  const inputTaskDate = document.createElement('input'); // Дата таски
  inputTaskDate.className = 'task-form_input';
  inputTaskDate.type = 'date';
  inputTaskDate.name = 'date';
  inputTaskDate.required = true;

  const addTaskButton = document.createElement('button'); // Кнока добавления таски
  addTaskButton.className = 'btn btn--primary';
  addTaskButton.type = 'submit';
  addTaskButton.textContent = 'Добавить';

  form.append(inputTaskTitle, inputTaskDate, addTaskButton);

  // панель инструментов: фильтры, поиск, сортировка
  const toolbar = document.createElement('div');
  toolbar.className = 'toolbar';

  // фильтры: все, активные, выполненные
  const filters = document.createElement('div');
  filters.className = 'filters';

  const filterAll = document.createElement('button');
  filterAll.className = 'filter-btn active';
  filterAll.type = 'button';
  filterAll.dataset.filter = 'all';
  filterAll.textContent = 'Все';

  const filterActive = document.createElement('button');
  filterActive.className = 'filter-btn';
  filterActive.type = 'button';
  filterActive.dataset.filter = 'active';
  filterActive.textContent = 'Активные';

  const filterDone = document.createElement('button');
  filterDone.className = 'filter-btn';
  filterDone.type = 'button';
  filterDone.dataset.filter = 'done';
  filterDone.textContent = 'Выполненные';

  filters.append(filterAll, filterActive, filterDone);

  // поиск по названию
  const search = document.createElement('input');
  search.className = 'search';
  search.type = 'search';
  search.id = 'searchInput';
  search.placeholder = 'Поиск по названию';

  // сортировка по дате
  const sortButton = document.createElement('button');
  sortButton.className = 'btn';
  sortButton.type = 'button';
  sortButton.id = 'sortButton';
  sortButton.textContent = 'Сортировать по дате ↑';

  toolbar.append(filters, search, sortButton);

  // список задач
  const taskList = document.createElement('ul');
  taskList.className = 'task-list';
  taskList.id = 'taskList';

  // сообщение, если задач нет
  const emptyMessage = document.createElement('p');
  emptyMessage.className = 'empty-message';
  emptyMessage.id = 'emptyMessage';
  emptyMessage.textContent = 'Задач пока нет';

  main.append(form, toolbar, taskList, emptyMessage);
  app.append(header, main);

  // вставляем всё в body
  document.body.append(app);

}

// выводит все задачи на страницу
function showTasks() {

  const taskList = document.getElementById('taskList');
  const emptyMessage = document.getElementById('emptyMessage');

  let visibleTasks = tasks;

  // Фильтруем по статусу (кнопки Все/Активные/Выполненные)
  if (currentFilter === 'active') {
    visibleTasks = visibleTasks.filter(task => !task.done);
  } else if (currentFilter === 'done') {
    visibleTasks = visibleTasks.filter(task => task.done);
  }

  // Фильтруем по поиску (по названию)
  if (currentSearch) {
    visibleTasks = visibleTasks.filter(task => 
      task.title.toLowerCase().includes(currentSearch.toLowerCase())
    );
  }

  // очищаем список
  taskList.replaceChildren();

  // если задач нет — показываем сообщение
  if (visibleTasks.length === 0) {
    emptyMessage.style.display = 'block';
    return;
  }

  emptyMessage.style.display = 'none';

  // создаём элемент для каждой задачи
  visibleTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.dataset.id = task.id;

    if (task.done) {
    li.classList.add('task-item_done');
    }

    // галочка "выполнено"
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-item_checkbox';
    checkbox.checked = task.done;

    // название задачи
    const title = document.createElement('span');
    title.className = 'task-item_title';
    title.textContent = task.title;

    // дата
    const date = document.createElement('span');
    date.className = 'task-item_date';
    date.textContent = task.date;

    // кнопка удалить
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn task-item_delete';
    deleteBtn.type = 'button';
    deleteBtn.textContent = 'x';

    const editBtn = document.createElement('button');
    editBtn.className = 'btn task-item_edit';
    editBtn.type = 'button';
    editBtn.textContent = '✎';

    li.append(checkbox, title, date, editBtn, deleteBtn);
    taskList.append(li);
  });
}

// создаёт форму редактирования для задачи
function createEditForm(task, onSave) {
  const form = document.createElement('div');
  form.className = 'task-edit-form';

  const titleInput = document.createElement('input');
  titleInput.className = 'task-item_edit-input';
  titleInput.type = 'text';
  titleInput.value = task.title;
  titleInput.name = 'editTitle'; 

  const dateInput = document.createElement('input');
  dateInput.className = 'task-item_edit-input';
  dateInput.type = 'date';
  dateInput.value = task.date;
  dateInput.name = 'editDate'; 

  const saveBtn = document.createElement('button');
  saveBtn.className = 'btn task-item_save';
  saveBtn.type = 'button';
  saveBtn.textContent = 'Сохранить';

  const cancelBtn = document.createElement('button');
  cancelBtn.className = 'btn task-item_cancel';
  cancelBtn.type = 'button';
  cancelBtn.textContent = 'Отмена';

  form.append(titleInput, dateInput, saveBtn, cancelBtn);

  // при сохранении передаём значения в onSave
  saveBtn.addEventListener('click', () => {
    const newTitle = titleInput.value.trim();
    const newDate = dateInput.value;
    if (!newTitle || !newDate) return;
    onSave(newTitle, newDate);
  });

  cancelBtn.addEventListener('click', () => {
    showTasks();   // просто перерисовать
  });

  return form;
}