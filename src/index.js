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

        let editButton = document.createElement("button");
        editButton.innerHTML = "edit";

        editButton.addEventListener("click", editButtonFun);
        newTask.append(editButton);

        taskList.push(newTask);

        e.target.newTaskDescription.value = "";
        sortList();
    }

    function editButtonFun(e) {
        let parent = e.target.parentElement;
        taskList.splice(taskList.indexOf(e.target.parentElement), 1);
        parent.innerHTML = "";
        let newForm = document.createElement("form");
        let textInput = document.createElement("input");
        let dateInput = document.createElement("input");
        let selector = document.createElement("select");
        let saveButton = document.createElement("input");
        newForm.action = "#";
        newForm.method = "post";
        textInput.type = "text";
        textInput.name = "newTaskDescription";
        textInput.placeholder = "Edit Description";
        dateInput.type = "date";
        dateInput.name = "newDate";
        selector.name = "priority";
        let prioList = ["Very High", "High", "Mid", "Low"];
        for (let i = 4; i >= 1; i--) {
            let option = document.createElement("option");
            option.value = i.toString();
            option.innerHTML = prioList[i - 1];
            selector.append(option);
        }
        saveButton.type = "submit";
        saveButton.value = "Save";
        newForm.append(textInput);
        newForm.append(dateInput);
        newForm.append(selector);
        newForm.append(saveButton);
        parent.append(newForm);
        newForm.addEventListener("submit", editSubmit);
    }

    function editSubmit(e) {
        formSubmit(e);
        e.target.parentElement.remove();
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