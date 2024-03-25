import { createElement } from "../render.js";
import { AbstractComponent } from "./AbstractComponent.js";

function createClearBtnComponent(disabled) {
    return (
        `<button class="clearBtnStyle" type="button" ${disabled ? 'disabled' : ''}>✕ Очистить</button>`
    );
}

export class ClearBtn extends AbstractComponent {
    #taskService = null;
    #disabled = null;

    constructor(taskService, disabled = false) {
        super();
        this.#taskService = taskService;
        this.#disabled = disabled; 
        this.getElement().addEventListener("click", this.buttonClickHandler.bind(this));
    }

    getTemplate() {
        return createClearBtnComponent(this.#disabled);
    }

    buttonClickHandler(evt) {
        evt.preventDefault();
        this.#taskService.deleteAll();
        window.dispatchEvent(new CustomEvent("removeBasket"));
    }
}
