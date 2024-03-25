import { createElement } from "../render.js";
import { AbstractComponent } from "./AbstractComponent.js";

function createTasksComponentCon() {
    return(
        `<section class="taskCon">
        </section>`
    );
}

export class TasksConComponent extends AbstractComponent {
    getTemplate() {
        return createTasksComponentCon();
    }
}