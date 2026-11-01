// добавляет новую задачу в массив и сохраняет
function addTask(title, date) {
  const newTask = {
    id: 'TDL' + Date.now(),  // id на основе 'TDL (сокращение ToDOList) и текущего времени
    title: title,
    date: date,
    done: false
  };
  tasks.push(newTask);
  saveTasks();
}

function deleteTask(id) { //удаление задачи
  tasks = tasks.filter(task => task.id !== id);
  saveTasks();
}

// переключает статус задачи: выполнена / не выполнена
function toggleDone(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.done = !task.done;
    saveTasks();
  }
}

// Редактирование задачи
function editTask(id, newTitle, newDate) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.title = newTitle;
    task.date = newDate;
    saveTasks();
  }
}

// сортировка по датам
function sortTasksByDate() {
  tasks.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    
    let result = 0;
    if (dateA < dateB) {
      result = -1;
    } else if (dateA > dateB) {
      result = 1;
    }

    if (isAscending) {
      return result;
    } else {
      return result * -1;
    }

    });

    saveTasks(); 
}