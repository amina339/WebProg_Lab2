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