document.addEventListener("DOMContentLoaded", () => {
  const tasks = document.getElementById("tasks");
  const form = document.getElementById("create-task-form");
  let taskList = [];

  
  form.addEventListener("submit", formSubmit);

  function formSubmit(e) {
      e.preventDefault();
      let newTask = document.createElement("li");
      newTask.innerHTML = e.target.newTaskDescription.value + " ";
      switch (parseInt(e.target.priority.value)) {
          case 1:
              newTask.style.color = "red";
              break;
          case 2:
              newTask.style.color = "orange";
              break;
          case 3:
              newTask.style.color = "green";
              break;
          case 4:
              newTask.style.color = "yellow";
              break;
      }

      newTask.append(e.target.newDate.value + " ");

      let xButton = document.createElement("button");
      xButton.innerHTML = "x";

      xButton.addEventListener("click", removeSubmit);

      newTask.append(xButton);

      taskList.push(newTask);

      e.target.newTaskDescription.value = "";
      sortList();
  }

  function removeSubmit(e) {
      e.target.parentElement.remove();
      taskList.splice(taskList.indexOf(e.target.parentElement), 1);
  }

  function sortList() {
      let yellowTasks = taskList.filter((task) => {
          return task.style.color == "yellow";
      });
      let greenTasks = taskList.filter((task) => {
          return task.style.color == "green";
      });
      let orangeTasks = taskList.filter((task) => {
          return task.style.color == "orange";
      });
      let redTasks = taskList.filter((task) => {
          return task.style.color == "red";
      });

      taskList = [];
      taskList = taskList.concat(yellowTasks).concat(greenTasks).concat(orangeTasks).concat(redTasks);

      deployTasks();
  }

  function deployTasks() {
      taskList.forEach((task) => {
          tasks.append(task);
      });
  }
});
