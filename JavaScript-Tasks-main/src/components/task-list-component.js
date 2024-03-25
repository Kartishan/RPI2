import { Status, StatusLabel } from "../const.js";
import { createElement, render } from "../render.js";
import { AbstractComponent } from "./AbstractComponent.js";
import { ClearBtn } from "./clear-btn-component.js";
import { StubComponent } from "./stub-card-component.js";
import { CardComponent } from "./task-card-component.js";

function createListComponent(status) {
    return(
        `<div id="listCon">
            <h2 class="taskHeader header${status}">${StatusLabel[status]}</h2>
        </div>`
    );
}

export class ListComponent extends AbstractComponent{
    #status = null;
    #taskService = null;
    #tasks = null;
    
    constructor(status, taskService){
        super();
        this.#status = status;
        this.#taskService = taskService;
        this.#tasks = taskService.getTasksByStatus(status);
        window.addEventListener("create-task", ()=> this.#reRenderTasks(this.#status, this.#taskService));
        window.addEventListener("removeBasket", ()=> this.#reRenderTasks(this.#status,  this.#taskService));
    }

    #reRenderTasks(status, taskService) {
        // console.log(status);
        taskService.getTasksByStatus(status)
            .then(tasks => {
                this.#tasks = tasks;
                this.#removeTasks();
                let disabledBtn = false;
                if (this.#tasks.length < 1) {
                    render(new StubComponent(), this.getElement());
                }
                this.#tasks.forEach(task => {
                    const taskComponent = new CardComponent({ id: task.id, title: task.title, status: task.status });
                    render(taskComponent, this.getElement());
                });
                if (this.#status == Status.BASKET && this.#tasks.length < 1) {
                    disabledBtn = true;
                }
                if (status === Status.BASKET) {
                    render(new ClearBtn(taskService, disabledBtn), this.getElement());
                }
            })
            .catch(error => {
                console.error("Error fetching tasks:", error);
            }
        );
    }
    

    #removeTasks() {
        const childElements = Array.from(this.getElement().children);
        childElements.forEach(childElement => {
            if (!childElement.matches('.taskHeader')) {
                childElement.remove();
            }
        })
    }
    
    getTemplate() {
        return createListComponent(this.#status);
    }
}