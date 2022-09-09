const taskList = document.querySelector("#taskList");
const sortAlphabeticallyButton = document.querySelector("#alphabeticalButton");
const allButton = document.querySelector("#allButton");
const addCategoryModalButton = document.querySelector("#addCategoryModalButton");
const addTasksModalButton = document.querySelector("#addTasksModalButton");
let localStorageTasks = {};

class Tasks {
  _tasks = {};

  constructor(tasks) {
    this._tasks = tasks
  }

  /**
   * USED TO GET ALL TASKS
   */
  get getTasks() {
    return this._tasks;
  }

  /**
   * CREATES TASK OBJECT AND APPENDS TO CATEGORY TASKS
   * @param {*} taskDesc - description of the task.
   * @param {*} date - date that the task is created. 
   */
  addTask(taskDesc, date) {
    let id = sessionStorage.getItem('addTaskCategoryID');
    let completed = "unchecked";
    let currentDate = this.getCurrentDate;

    let taskId = this._tasks[id].tasks.length;
    console.log("new task id: " + taskId);

    let newTask = {}
    newTask.id = taskId;
    newTask.description = taskDesc;
    newTask.dateCreated = currentDate;
    newTask.dueDate = date;
    newTask.completed = completed;

    this._tasks[id].tasks.push(newTask);
    this.saveToLocalStorage();
  };

  /**
   * GETS CURRENT DATE
   */
  get getCurrentDate() {
    return new Date().toJSON().slice(0, 10)
  }

  /**
   * CREATES A CATEGORY
   */
  createCategory(categoryName, chosenIcon) {
    this._tasks[categoryName] = {};
    this._tasks[categoryName].dateCreated = this.getCurrentDate;
    this._tasks[categoryName].icon = chosenIcon;
    this._tasks[categoryName].tasks = [];
  };

  /**
   * DELETES CATEGORY
   */
  deleteCategory(e) {
    let tasks = this._tasks;
    console.log("clicked delete button");
    let id = e.target.parentNode.parentNode.parentNode.id;
    console.log("Out of object: id: " + id);
    console.log("before delete tasks");
    console.log(tasks);
    delete tasks[id];
    console.log("after delete tasks");
    console.log(tasks);
  };

  checkTask(taskId, categoryId, isComplete) {
    if (isComplete) {
      console.log("completed");
      for (let task of this._tasks[categoryId].tasks) {
        console.log(task);
        if (task.id == taskId) {
          console.log(task.id);
          task.completed = 'checked';
          console.log(task);
        }
      }
    }
    else {
      console.log('not completed');
      for (let task of this._tasks[categoryId].tasks) {
        console.log(task);
        if (task.id == taskId) {
          console.log(task.id);
          task.completed = 'unchecked';
          console.log(task)
        }
      }
    }
  }

  /**
   * SAVES this._tasks to local storage
   */
  saveToLocalStorage() {
    let jsonData = JSON.stringify(this._tasks);
    console.log(jsonData);
    localStorage.setItem("tasks", jsonData);
  }

  /**
   * RENERS TASKS TO DOM
   * @param {*} option - option to sort tasks or filter tasks based on user input. 
   */
  render(option) {
    let allTasks = this._tasks;
    console.log('rendering');
    taskList.innerHTML = "";
    if (option == "alphabetical") {
      console.log("alphabetical");
      const sortedAlphabetically = Object.keys(allTasks).sort().reduce(
        (obj, key) => {
          obj[key] = allTasks[key];
          return obj;
        },
        {}
      );
      allTasks = sortedAlphabetically;
    }
    console.log("allTasks: ")
    console.log(allTasks);
    for (let item in allTasks) {
      let colours = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];
      let colour = Math.floor(Math.random() * colours.length);
      let randomColour = colours[colour];

      // HTML FOR CATEGORY
      let HTML =  /*HTML*/ `
      <section class="taskCategory">
        <div id="${item}" class="taskCategory__category">
          <div class="taskCategory__category-left">
          
            <img style="background: ${randomColour};" class="taskCategory__category-icon" src="src/images/${allTasks[item].icon}.png" alt="tasks">
         
          </div>  
          <div class="taskCategory__category-center">
            <div>${item}</div>
            <div style="color:grey;">Created: ${allTasks[item].dateCreated}</div>
          </div>
          <div class="taskCategory__category-right">
            <div id="plusButton" class="neomorphicButton" onclick="saveIdToSessionStorage(event)">
            <img src="src/images/plus.svg"></div>
            <div id="deleteButton" class="neomorphicButton" ondblclick="deleteCategory(event)"><img src="src/images/delete.svg"></div>
          </div>
        </div>
        <section class="taskCategory__category--content">
      `;

      // HTML FOR CARDS
      for (let task in allTasks[item].tasks) {
        HTML += /*HTML*/`
        <article class="taskCategory__category--content-card">
        <header class="taskCategory__category--content__card-header">
        <p class="taskCategory__category--content__card-dateCreated"> Date Created: ${allTasks[item].tasks[task].dateCreated}</p>
        <h4>${allTasks[item].tasks[task].description}</h4>
        <div>
          <label for="completed">completed</label>
          <input id="${allTasks[item].tasks[task].id}" class="cardCheckbox" onchange="checkCheckbox(event)" type="checkbox" name="completed" ${allTasks[item].tasks[task].completed}>
        </div>
        </header>
        </article>
        `;
      }

      HTML += /*HTML*/ `
          </section>
        </section>
      `;

      taskList.innerHTML += HTML;

    }

  }
}

/**
 * CHECKS IF THERE ARE TASKS, THEN ASSIGNS TASKS TO localStorageTasks VARIABLE
 */
let isTasksCreated = () => {
  let tasks = localStorage.getItem("tasks");
  if (tasks) {
    console.log("there are tasks");
    localStorageTasks = JSON.parse(tasks);
  }
  else {
    console.log("there are no tasks");
    localStorage.setItem("tasks", "");
  }
};
isTasksCreated();

/**
 * CREATES NEW TASK OBJECT THEN RENDERS TASKS TO DOM
 */
let taskObject = new Tasks(localStorageTasks);
taskObject.render("all");

const showTasks = () => {
  console.log(taskObject.getTasks);
}

/**
 * CREATES ACCORDION OUT OF EACH CATEGORY
 */
const createAccordion = () => {
  const accordions = document.querySelectorAll(".taskCategory__category-center");
  accordions.forEach(accordion => {
    accordion.addEventListener("click", () => {
      console.log('clicking accordion');
      const content = accordion.parentElement.nextElementSibling;
      let parentAccordion = accordion.parentElement;

      parentAccordion.classList.toggle('taskCategory__category--active');

      if (parentAccordion.classList.contains('taskCategory__category--active')) {
        content.style.maxHeight = content.scrollHeight + 'px';
      }
      else {
        content.style.maxHeight = 0;
      }
    });
  })
};
// IMMEDIATELY GETS CALLED UPON LOADING
createAccordion();

// TOOLBAR BUTTON FUNCTIONS
/** 
 * SORTS CATEGORIES ALPHABETICALLY
*/
let sortAlphabetically = () => {
  taskObject.render("alphabetical");
  createAccordion();
};
/**
 * RENDERS ALL CATEGORIES INSIDE OF TASKLIST 
 */
let renderAll = () => {
  taskObject.render("all")
  createAccordion();
}

// CATEGORY FUNCTIONS
/**
 * CREATES A CATEGORY 
 */
const createCategory = (event) => {
  event.preventDefault;
  let categoryInput = document.querySelector("#categoryInput");
  let icons = ["work", "study", "home", "tasks"];
  let icon = Math.floor(Math.random() * icons.length);
  let randomIcon = icons[icon];

  if (!categoryInput.value == "") {
    console.log(categoryInput.value);
    let findDuplicateCategory = () => {
      for (let item in taskObject.getTasks) {
        if (item == categoryInput.value) return true
      }
    }
    let duplicateCategoryError = document.querySelector("#duplicateCategoryError");
    if (findDuplicateCategory()) {
      console.log("found duplicate category");
      duplicateCategoryError.style.display = 'block';
    }
    else {
      duplicateCategoryError.style.display = 'none';
      taskObject.createCategory(categoryInput.value, randomIcon);
      taskObject.render("all");
      createAccordion();
      taskObject.saveToLocalStorage();
      categoryInput.value = "";
    }
  }
  else {
    return void 0;
  }
}

/**
 * DELETES A CATEGORY
 */
const deleteCategory = (event) => {
  console.log(event);
  taskObject.deleteCategory(event);
  taskObject.render("all");
  taskObject.saveToLocalStorage();
};

/**
 * SAVES ID OF SELECTED CATEGORY IN SESSION STORAGE 
 */
const saveIdToSessionStorage = (e) => {
  let id = e.target.parentNode.parentNode.parentNode.id;
  console.log(id);
  sessionStorage.setItem("addTaskCategoryID", id);
  openAddTasksModal();
};

// ONCLICK EVENTS
sortAlphabeticallyButton.onclick = sortAlphabetically;
allButton.onclick = renderAll;
addCategoryModalButton.onclick = createCategory;

/**
 *  CREATES TASKS INSIDE OF CATEGORY 
 */
addTasksModalButton.addEventListener("click", (event) => {
  event.preventDefault();
  let taskInput = document.querySelector("#taskInput");
  let dateInput = document.querySelector("#dateInput");
  console.log(event);
  if (taskInput.value.length != 0 && dateInput.value.length != 0) {
    taskObject.addTask(taskInput.value, dateInput.value);
    renderAll()
    taskInput.value = "";
    dateInput.value = "";
  }
  else {
    console.log("input is empty");
  }
});

/**
 *  CHECKS VALUE OF CHECKBOX THEN SAVES VALUE INTO TASK'S {COMPLETED} KEY 
 */
const checkCheckbox = (e) => {
  console.log('checkbox');
  let id = e.target.id;
  let categoryId = e.target.parentElement.parentElement.parentElement.parentElement.previousElementSibling.id;
  let checkbox = e.target;
  console.log(checkbox);
  if (checkbox.checked) {
    taskObject.checkTask(id, categoryId, true);
    taskObject.saveToLocalStorage();
  }
  else {
    taskObject.checkTask(id, categoryId, false);
    taskObject.saveToLocalStorage();
  }
};

// MAKES THE .cursor DIV FOLLOW USER'S CURSOR
const cursor = document.querySelector(".cursor");
document.addEventListener('mousemove', e => {
  cursor.setAttribute("style", "top: " + (e.pageY - 20) + "px; left: " + (e.pageX - 20) + "px;");
})