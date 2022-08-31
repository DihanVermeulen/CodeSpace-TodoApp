class Tasks {
    _tasks = {};

    constructor() {
        this._tasks = tasks
    }

    get getTasks() {
        return this._tasks;
    }

    setTask(category, task, description, dueDate) {
        // Enter category
        // Add new task item as object
    };

    render() {
        let taskList = document.querySelector("#taskList")
    }
}

// Checks if it is the first time that the application is opened
let checkIfFirstTimeOpened = () => {
    check = localStorage.getItem("isFirstTimeOpened");
    if(check) {
      localStorage.setItem("isFirstTimeOpened", false);
      console.log("Not the first time opened")
      return false;
    }
    else {
        localStorage.setItem("isFirstTimeOpened", true);
        console.log("First time opened")
      return true;
    }
  }
checkIfFirstTimeOpened();

let tasks = {
    category1 : [
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
  }










// To make the .cursor div follow the user's cursor
const cursor = document.querySelector(".cursor");

document.addEventListener('mousemove', e => {
    cursor.setAttribute("style", "top: " + (e.pageY-20) + "px; left: " + (e.pageX - 20) + "px;");
})