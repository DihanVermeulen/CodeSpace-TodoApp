import { BaseComponent } from '../../utils/BaseComponent/BaseComponent.js';

class TaskList extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadow.innerHTML = /*HTML*/ `
        
        <h1>Task Component</h1>

        <select>
            <option>Alphabetical</option>
            <option>Completed</option>
            <option>Due</option>
        </select>

        <ul class="taskList">${this.innerHTML}</ul>
        `;
    }
}

customElements.define("task-list", TaskList);