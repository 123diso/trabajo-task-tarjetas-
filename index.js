document.addEventListener("DOMContentLoaded", function() {
    
    let todoList = document.getElementById("todo-list");
    let doingList = document.getElementById("doing-list");
    let doneList = document.getElementById("done-list");
  
   
    let taskInput = document.getElementById("task-input");
    let addTaskBtn = document.getElementById("add-task-btn");
  
    
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
   
    renderTasks();
  
   
    addTaskBtn.addEventListener("click", function() {
      let taskText = taskInput.value;
      if (taskText.trim() !== "") {
        let task = { text: taskText, status: "todo" };
        tasks.push(task);
        saveTasks();
        renderTask(task);
        taskInput.value = "";
      }
    });
  
    
    function saveTasks() {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    
    function renderTasks() {
      todoList.innerHTML = "";
      doingList.innerHTML = "";
      doneList.innerHTML = "";
  
      tasks.forEach(function(task) {
        renderTask(task);
      });
    }
  
   
    function renderTask(task) {
      let taskItem = document.createElement("div");
      taskItem.classList.add("task-item");
      taskItem.textContent = task.text;
  
      let deleteBtn = document.createElement("button");
      deleteBtn.classList.add("delete-btn");
      deleteBtn.textContent = "X";
      deleteBtn.addEventListener("click", function() {
        let index = tasks.indexOf(task);
        if (index !== -1) {
          tasks.splice(index, 1);
          saveTasks();
          taskItem.remove();
        }
      });
  
      let ascendBtn = document.createElement("button");
      ascendBtn.classList.add("ascend-btn");
      ascendBtn.textContent = "Azul";
      ascendBtn.style.backgroundColor = "#2196F3";
      ascendBtn.addEventListener("click", function() {
        if (task.status === "todo") {
          task.status = "doing";
        } else if (task.status === "doing") {
          task.status = "done";
        }
        saveTasks();
        renderTasks();
      });
  
      let descendBtn = document.createElement("button");
      descendBtn.classList.add("descend-btn");
      descendBtn.textContent = "Rojo";
      descendBtn.style.backgroundColor = "#f44336";
      descendBtn.addEventListener("click", function() {
        if (task.status === "done") {
          task.status = "doing";
        } else if (task.status === "doing") {
          task.status = "todo";
        }
        saveTasks();
        renderTasks();
      });
  
      if (task.status === "todo") {
        todoList.appendChild(taskItem);
        taskItem.appendChild(descendBtn);
        taskItem.appendChild(ascendBtn);
      } else if (task.status === "doing") {
        doingList.appendChild(taskItem);
        taskItem.appendChild(descendBtn);
        taskItem.appendChild(ascendBtn);
      } else if (task.status === "done") {
        doneList.appendChild(taskItem);
        taskItem.appendChild(descendBtn);
        taskItem.appendChild(ascendBtn);
      }
  
      taskItem.appendChild(deleteBtn);
    }
  });
  
  

