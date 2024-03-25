import {createElement} from '../render.js';
import { AbstractComponent } from './AbstractComponent.js';


function createHeaderComponentTemplate() {
    return (
        `<header class="header">
        <h1>Список задач</h1>
        </header>`
      );
}


export class HeaderComponent extends AbstractComponent {
  getTemplate() {
    return createHeaderComponentTemplate();
  }
}