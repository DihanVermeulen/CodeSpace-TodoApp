/**
 * OPENS THE MODAL TO WHERE TASKS ARE CREATED
 */
const openAddTasksModal = () => {
    const modal = document.querySelector("#addTasksModal");
    modal.style.display = 'block';
}

/**
 * CLOSES THE MODAL WHERE TASKS ARE ADDED
 */
const closeTasksModal = () => {
    const modal = document.querySelector("#addTasksModal");
    modal.style.display = 'none';
};