
class Task {
    constructor(title, status) {
      this.title = title;
      this.status = status;
    }
  }
  
  
  const createButton = document.getElementById('create-button');
  const newTaskInput = document.getElementById('new-task');
  const toDoList = document.getElementById('to-do');
  
  function createTask() {
  const title = newTaskInput.value;
  if (title) {
  const task = new Task(title, 'to-do');
  saveTask(task);
  addTaskToDOM(task);
  newTaskInput.value = '';
  }
  }
  
  createButton.addEventListener('click', createTask);
  
  function addTaskToDOM(task) {
  const taskElement = document.createElement('div');
  taskElement.classList.add('task');
  taskElement.dataset.status = task.status;
  
  const titleElement = document.createElement('div');
  titleElement.classList.add('title');
  titleElement.innerText = task.title;
  
  const actionsElement = document.createElement('div');
  actionsElement.classList.add('actions');
  
  const moveButton = document.createElement('button');
  moveButton.classList.add('move-button');
  moveButton.innerText = 'Move';
  moveButton.addEventListener('click', moveTask);
  
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('delete-button');
  deleteButton.innerText = 'X';
  deleteButton.addEventListener('click', deleteTask);
  
  actionsElement.appendChild(moveButton);
  actionsElement.appendChild(deleteButton);
  
  taskElement.appendChild(titleElement);
  taskElement.appendChild(actionsElement);
  
  if (task.status === 'to-do') {
  toDoList.appendChild(taskElement);
  } else if (task.status === 'doing') {
  const doingList = document.getElementById('doing');
  doingList.appendChild(taskElement);
  } else if (task.status === 'done') {
  const doneList = document.getElementById('done');
  doneList.appendChild(taskElement);
  }
  }

  function moveTask() {
    const taskElement = this.parentElement.parentElement;
    const currentStatus = taskElement.dataset.status;
    let newStatus;
    
    if (currentStatus === 'to-do') {
    newStatus = 'doing';
    } else if (currentStatus === 'doing') {
    newStatus = 'done';
    } else if (currentStatus === 'done') {
    newStatus = 'to-do';
    }
    
    taskElement.dataset.status = newStatus;
    
    const taskTitle = taskElement.querySelector('.title').innerText;
    const task = new Task(taskTitle, newStatus);
    saveTask(task);
    
    taskElement.remove();
    addTaskToDOM(task);
    }
    
    function deleteTask() {
    const taskElement = this.parentElement.parentElement;
    const taskTitle = taskElement.querySelector('.title').innerText;
    const task = new Task(taskTitle, taskElement.dataset.status);
    removeTaskFromStorage(task);
    taskElement.remove();
    }
    
    const removeTaskFromStorage = (task) => {
        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks = tasks.filter(t => !(t.title === task.title && t.status === task.status));
        localStorage.setItem("tasks", JSON.stringify(tasks));
      };

    const saveTask = (task) => {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
};





