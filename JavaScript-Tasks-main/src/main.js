import {render, RenderPosition} from './render.js';
import {HeaderComponent} from './components/header-component.js';
import {FormAddTaskComponent} from './components/form-add-task-component.js';
import { TasksConComponent } from './components/tasks-con-component.js';
import { ListComponent } from './components/task-list-component.js';
import { CardComponent } from './components/task-card-component.js';
import { TasksService } from './service/TaskService.js';
import { Status } from './const.js';
import { ClearBtn } from './components/clear-btn-component.js';
import { StubComponent } from './components/stub-card-component.js';


const bodyContainer = document.getElementById('bodyApp');
const addTaskContainer = document.querySelector('.addTaskCon');
const tasksContainer = document.querySelector('.addTaskCon');
const taskService = new TasksService();

const statuses = Object.values(Status);

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(taskService), addTaskContainer);
render(new TasksConComponent(), tasksContainer, RenderPosition.AFTEREND);

function renderCard(task, container) {
    const cardComponent = new CardComponent({id: task.id, title: task.title, status: task.status});
    render(cardComponent, container);
}

function renderList(listContainer, status) {
    const listComponent = new ListComponent(status, taskService);
    render(listComponent, listContainer);
    return listComponent;
}


const listContainer = document.querySelector('.taskCon');

let disabledBtn=false;
if (await taskService.getTasks().length < 1){
    console.log("tut");
    disabledBtn = true;
}
    

for(const status of statuses){
     const listComponent = renderList(listContainer, status);
     const tasks = await taskService.getTasksByStatus(status);

     if(tasks.length < 1){
        render(new StubComponent(), listComponent.getElement());
    }
     tasks.forEach(task => {
        renderCard(task, listComponent.getElement());
     });
     if (status === Status.BASKET) {
        render(new ClearBtn(taskService,disabledBtn), listComponent.getElement());
     }
}