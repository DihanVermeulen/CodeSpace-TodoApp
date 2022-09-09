const openAddTasksModal = () => {
    const modal = document.querySelector("#addTasksModal");
    modal.style.display = 'block';
}

const closeTasksModal = () => {
    let taskInput = document.querySelector("#taskInput");
    let dateInput = document.querySelector("#dateInput");
    const modal = document.querySelector("#addTasksModal");
    modal.style.display = 'none';
};