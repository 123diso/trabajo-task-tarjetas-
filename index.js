// Clase Task
class Task {
    constructor(text, state) {
      this.text = text;
      this.state = state;
    }
  }
  
 
  let todoList = [];
  let doingList = [];
  let doneList = [];
  
 
  function updateLists() {
    const todoListElement = document.getElementById('todoList');
    const doingListElement = document.getElementById('doingList');
    const doneListElement = document.getElementById('doneList');
  
    todoListElement.innerHTML = '';
    doingListElement.innerHTML = '';
    doneListElement.innerHTML = '';
  
    todoList.forEach((task, index) => {
      const taskElement = createTaskElement(task, index, 'todoList');
      todoListElement.appendChild(taskElement);
    });
  
    doingList.forEach((task, index) => {
      const taskElement = createTaskElement(task, index, 'doingList');
      doingListElement.appendChild(taskElement);
    });
  
    doneList.forEach((task, index) => {
      const taskElement = createTaskElement(task, index, 'doneList');
      doneListElement.appendChild(taskElement);
    });
  }
  
 
  function createTaskElement(task, index, listName) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
  
    const taskText = document.createElement('span');
    taskText.textContent = task.text;
    taskElement.appendChild(taskText);
  
    const buttons = document.createElement('div');
    buttons.classList.add('buttons');
  
    const redButton = document.createElement('button');
    redButton.classList.add('red-button');
    redButton.textContent = 'Descender';
    redButton.addEventListener('click', () => {
      moveTask(index, listName, -1);
    });
    buttons.appendChild(redButton);
  
    const blueButton = document.createElement('button');
    blueButton.classList.add('blue-button');
    blueButton.textContent = 'Ascender';
    blueButton.addEventListener('click', () => {
      moveTask(index, listName, 1);
    });
    buttons.appendChild(blueButton);
  
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.addEventListener('click', () => {
      deleteTask(index, listName);
    });
    buttons.appendChild(deleteButton);
  
    taskElement.appendChild(buttons);
  
    return taskElement;
  }
  




function moveTask(index, listName, direction) {
    let sourceList, targetList;
    if (listName === 'todoList') {
      sourceList = todoList;
      targetList = direction === -1 ? doingList : [];
    } else if (listName === 'doingList') {
      sourceList = doingList;
      targetList = direction === -1 ? doneList : todoList;
    } else if (listName === 'doneList') {
      sourceList = doneList;
      targetList = direction === -1 ? [] : doingList;
    }
  
    const task = sourceList[index];
    sourceList.splice(index, 1);
  
    let targetIndex;
    if (direction === -1) {
      targetIndex = Math.max(index - 1, 0);
      if (targetList === doingList) {
        targetIndex = Math.min(targetIndex, targetList.length);
      }
    } else if (direction === 1) {
      targetIndex = Math.min(index + 1, targetList.length);
      if (targetList === todoList) {
        targetIndex = Math.max(targetIndex, 0);
      }
    } else {
      targetIndex = targetList.length;
    }
  
    targetList.splice(targetIndex, 0, task);
  
    updateLists();
    saveListsToLocalStorage();
  }
  
  

  function deleteTask(index, listName) {
    let list;
    if (listName === 'todoList') {
      list = todoList;
    } else if (listName === 'doingList') {
      list = doingList;
    } else if (listName === 'doneList') {
      list = doneList;
    }
  
    list.splice(index, 1);
  
    updateLists();
    saveListsToLocalStorage();
  }
  
 
  function saveListsToLocalStorage() {
    localStorage.setItem('todoList', JSON.stringify(todoList));
    localStorage.setItem('doingList', JSON.stringify(doingList));
    localStorage.setItem('doneList', JSON.stringify(doneList));
  }
  

  function loadListsFromLocalStorage() {
    const storedTodoList = localStorage.getItem('todoList');
    if (storedTodoList) {
      todoList = JSON.parse(storedTodoList);
    }
  
    const storedDoingList = localStorage.getItem('doingList');
    if (storedDoingList) {
      doingList = JSON.parse(storedDoingList);
    }
  
    const storedDoneList = localStorage.getItem('doneList');
    if (storedDoneList) {
      doneList = JSON.parse(storedDoneList);
    }
  }
  

  const addButton = document.getElementById('addButton');
  addButton.addEventListener('click', () => {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
  
    if (taskText !== '') {
      const task = new Task(taskText, 'To Do');
      todoList.push(task);
  
      updateLists();
      saveListsToLocalStorage();
  
      taskInput.value = '';
    }
  });
  
  
  window.addEventListener('load', () => {
    loadListsFromLocalStorage();
    updateLists();
  });
  

