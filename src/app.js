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

  setTask(category, task = {}, description, dueDate) {
    // Enter category
    // Add new task item as object
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

  render(option) {
    let allTasks = this._tasks;
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
      console.log(item);
      console.log(allTasks[item].icon)
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
            <div id="plusButton" class="neomorphicButton"><img src="src/images/plus.svg"></div>
            <div id="deleteButton" class="neomorphicButton" ondblclick="deleteCategory(event)"><img src="src/images/delete.svg"></div>
          </div>
        </div>
        <section class="taskCategory__category--content">
      `;

      for (let task in allTasks[item].tasks) {
        HTML += /*HTML*/`
        <article class="taskCategory__category--content-card">
        <header class="taskCategory__category--content__card-header">
        <p class="taskCategory__category--content__card-dateCreated">${allTasks[item].tasks[task].dateCreated}</p>
        <h3>${allTasks[item].tasks[task].title}</h3>
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

let allTasks = {
  list: {
    icon: "URL",
    tasks: [
      {
        id: 0,
        title: "title1",
        description: "description1",
        dateCreated: "date created1",
        dueDate: "Due date1",
        completed: false,
      },
      {
        id: 1,
        title: "title2",
        description: "description2",
        dateCreated: "date created2",
        dueDate: "Due date2",
        completed: false,
      }
    ]
  },
  category: {
    icon: "URL",
    tasks: [
      {
        id: 2,
        title: "title3",
        description: "description3",
        dateCreated: "date created3",
        dueDate: "Due date1",
        completed: false,
      },
      {
        id: 3,
        title: "title4",
        description: "description4",
        dateCreated: "date created4",
        dueDate: "Due date2",
        completed: true,
      }
    ]
  }
}

/**
 * CREATES ACCORDION OUT OF EACH CATEGORY
 */
const createAccordion = () => {
  const accordions = document.querySelectorAll(".taskCategory__category-center");
  accordions.forEach(accordion => {
    accordion.addEventListener("click", () => {
      // const content = accordion.nextElementSibling;
      const content = accordion.parentElement.nextElementSibling;
      console.log(content);
      let parentAccordion = accordion.parentElement;

      parentAccordion.classList.toggle('taskCategory__category--active');

      if (accordion.classList.contains('taskCategory__category--active')) {
        content.style.maxHeight = content.scrollHeight + 'px';
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
};

// Onclick events
sortAlphabeticallyButton.onclick = sortAlphabetically;
allButton.onclick = renderAll;
addCategoryModalButton.onclick = createCategory;

// To make the .cursor div follow the user's cursor
const cursor = document.querySelector(".cursor");

document.addEventListener('mousemove', e => {
  cursor.setAttribute("style", "top: " + (e.pageY - 20) + "px; left: " + (e.pageX - 20) + "px;");
})