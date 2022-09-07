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
      console.log(item);
      let HTML =  /*HTML*/ `
      <section class="taskCategory">
        <div id="${item}" class="taskCategory__category" onclick="console.log(event)">
          <div class="taskCategory__category-icon">Icon</div>
          <div>${item}</div>
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

// checks if there are tasks and assigns tasks to localStorageTasks if there are
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

taskObject = new Tasks(localStorageTasks);

taskObject.render("all");
taskObject.createCategory("bleh", "chosenIcon");
console.log("ALL TASKS:")
console.log(taskObject.getTasks);
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

// creates accordion out of each category
const createAccordion = () => {
  const accordions = document.querySelectorAll(".taskCategory__category");
  accordions.forEach(accordion => {
    accordion.addEventListener("click", () => {
      const content = accordion.nextElementSibling;

      accordion.classList.toggle('taskCategory__category--active');

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
// SORTS CATEGORIES ALPHABETICALLY
let sortAlphabetically = () => {
  taskObject.render("alphabetical");
  createAccordion();
};
// RENDERS ALL CATEGORIES INSIDE OF TASKLIST 
let renderAll = () => {
  taskObject.render("all")
  createAccordion();
}

// MODAL BUTTON FUNCTIONS
// CREATES CATEGORY
let createCategory = (event) => {
  event.preventDefault;
  let categoryInput = document.querySelector("#categoryInput");

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
      taskObject.createCategory(categoryInput.value, "icon");
      taskObject.render("all");
      createAccordion();
      categoryInput.value = "";
    }
  }
  else {
    return void 0;
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