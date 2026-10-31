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
  sortButton.textContent = 'Сортировать по дате';

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