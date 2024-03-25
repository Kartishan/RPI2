import { createElement } from "../render.js";
import { AbstractComponent } from "./AbstractComponent.js";

function createStubComponent() {
    return(
        `<p class="taskCard cardStub">Перетащите карточку</p>
        `
    );
}

export class StubComponent extends AbstractComponent{   

    getTemplate() {
        return createStubComponent();
    }
}