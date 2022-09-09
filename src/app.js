const taskList = document.querySelector("#taskList");
const sortAlphabeticallyButton = document.querySelector("#alphabeticalButton");
const allButton = document.querySelector("#allButton");
const addCategoryModalButton = document.querySelector("#addCategoryModalButton");
let localStorageTasks = {};

class Tasks {
  _tasks = {};

  constructor(tasks) {
    this._tasks = tasks
  }

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
    let completed = false;
    let currentDate = new Date().toJSON().slice(0, 10);

    let newTask = {}
    newTask.description = taskDesc;
    newTask.dateCreated = currentDate;
    newTask.dueDate = date;
    newTask.completed = completed;

    this._tasks[id].tasks.push(newTask);
    this.saveToLocalStorage();
  };

  getIcons() {
    for (let item in this._tasks) {
      console.log(item);
      console.log(this._tasks[item].tasks)
    }
  };

  createCategory(categoryName, chosenIcon) {
    this._tasks[categoryName] = {};
    this._tasks[categoryName].icon = chosenIcon;
    this._tasks[categoryName].tasks = [];
  };

  deleteCategory(e) {
    let tasks = this._tasks;
    console.log("clicked delete button");
    let id = e.target.parentNode.parentNode.parentNode.id;
    // let id = e.target;
    console.log("Out of object: id: " + id);
    console.log("before delete tasks");
    console.log(tasks);
    delete tasks[id];
    console.log("after delete tasks");
    console.log(tasks);
  };

  saveToLocalStorage() {
    let jsonData = JSON.stringify(this._tasks);
    console.log(jsonData);
    localStorage.setItem("tasks", jsonData);
  }

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
      console.log("item: " + item);
      console.log("icon: " + allTasks[item].icon)
      let HTML =  /*HTML*/ `
      <section class="taskCategory">
        <div id="${item}" class="taskCategory__category">
          <div class="taskCategory__category-left">
          
            <img style="background: ${randomColour};" class="taskCategory__category-icon" src="src/images/${allTasks[item].icon}.png" alt="tasks">
         
          </div>  
          <div class="taskCategory__category-center">
            <div>${item}</div>
            <div style="color:grey;">Created: 08-08-2022</div>
          </div>
          <div class="taskCategory__category-right">
            <div id="plusButton" class="neomorphicButton" onclick="saveIdToSessionStorage(event)">
            <img src="src/images/plus.svg"></div>
            <div id="deleteButton" class="neomorphicButton" ondblclick="deleteCategory(event)"><img src="src/images/delete.svg"></div>
          </div>
        </div>
        <section class="taskCategory__category--content">
      `;

      for (let task in allTasks[item].tasks) {
        console.log('render tasks: ')
        console.log(allTasks[item].tasks[task].description)
        HTML += /*HTML*/`
        <article class="taskCategory__category--content-card">
        <header class="taskCategory__category--content__card-header">
        <p class="taskCategory__category--content__card-dateCreated">${allTasks[item].tasks[task].dateCreated}</p>
        <h4>${allTasks[item].tasks[task].description}</h4>
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
taskObject = new Tasks(localStorageTasks);
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
        console.log('contains taskCategory__category--active ')
      }
      else {
        content.style.maxHeight = 0;
      }
    });
  })
};
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
 * @param {string} event - event of form that creates a category. 
 */
let createCategory = (event) => {
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

/**
 *  CREATES TASKS INSIDE OF CATEGORY 
 */
 const addTask = (e) => {
  e.preventDefault();
  let taskInput = document.querySelector("#taskInput");
  let dateInput = document.querySelector("#dateInput");
  console.log(e);
  if (taskInput.value.length != 0 && dateInput.value.length != 0) {
      taskObject.addTask(taskInput.value, dateInput.value);
      renderAll()
      taskInput.value = "";
      dateInput.value = "";
  }
  else {
      console.log("input is empty");
  }
}

// Onclick events
sortAlphabeticallyButton.onclick = sortAlphabetically;
allButton.onclick = renderAll;
addCategoryModalButton.onclick = createCategory;

// To make the .cursor div follow the user's cursor
const cursor = document.querySelector(".cursor");

document.addEventListener('mousemove', e => {
  cursor.setAttribute("style", "top: " + (e.pageY - 20) + "px; left: " + (e.pageX - 20) + "px;");
})