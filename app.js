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

  renderAll() {
    let taskList = document.querySelector("#taskList");
    for (let item in this._tasks) {
      let HTML =  /*HTML*/ `
      <section class="taskCategory">
        <div class="taskCategory__category">
          <div class="taskCategory__category-icon">Icon</div>
          <div>${item}</div>
        </div>
        <section class="taskCategory__category--content">
      `;

      // let content = document.querySelector(".taskCategory__category--content");

      for (let task in this._tasks[item].tasks) {
        console.log(`task: ${this._tasks[item].tasks[task].title}`);
        HTML += /*HTML*/`
        <article class="taskCategory__category--content-card">
        <header class="taskCategory__category--content__card-header">
        <p class="taskCategory__category--content__card-dateCreated">${this._tasks[item].tasks[task].dateCreated}</p>
        <h3>${this._tasks[item].tasks[task].title}</h3>
        </header>
        </article>
        `;
      }


      HTML += /*HTML*/ `
          </section>
        </section>
      `;

      taskList.innerHTML += HTML;

      console.log(HTML);

    }

  }
}

// Checks if it is the first time that the application is opened
let checkIfFirstTimeOpened = () => {
  check = localStorage.getItem("isFirstTimeOpened");
  if (check) {
    localStorage.setItem("isFirstTimeOpened", false);
    // console.log("Not the first time opened")
    return false;
  }
  else {
    localStorage.setItem("isFirstTimeOpened", true);
    // console.log("First time opened")
    return true;
  }
}

if (checkIfFirstTimeOpened()) {
  console.log("First time opened")
}
else {
  console.log("Not first time opened")
};


let allTasks = {
  category1: {
    icon: "URL",
    tasks: [
      {
        id: 0,
        title: "title1",
        description: "description1",
        dateCreated: "date created1",
        dueDate: "Due date1"
      },
      {
        id: 1,
        title: "title2",
        description: "description2",
        dateCreated: "date created2",
        dueDate: "Due date2"
      }
    ]
  },
  category2: {
    icon: "URL",
    tasks: [
      {
        id: 2,
        title: "title3",
        description: "description3",
        dateCreated: "date created3",
        dueDate: "Due date1"
      },
      {
        id: 3,
        title: "title4",
        description: "description4",
        dateCreated: "date created4",
        dueDate: "Due date2"
      }
    ]
  }
}

taskObject = new Tasks(allTasks);

taskObject.renderAll();
// console.log(taskObject.getTasks);
taskObject.getIcons();


// Created acordion element
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
});







// To make the .cursor div follow the user's cursor
const cursor = document.querySelector(".cursor");

document.addEventListener('mousemove', e => {
  cursor.setAttribute("style", "top: " + (e.pageY - 20) + "px; left: " + (e.pageX - 20) + "px;");
})