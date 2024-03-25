import { Status } from "../const.js";
import { getData, postData, deleteData } from '../api.js'


export class TasksService {
    #boardTasks = [];
    

    async getTasksByStatus(status){
        this.#boardTasks = await this.getallTasks()
        // console.log(this.#boardTasks)
        const tasksStatus = this.#boardTasks.filter(function(task) {
            // console.log(task);
            return task.status == status;
        });
        return(tasksStatus)
    }

    async create({id='', title, status = Status.BACKLOG}) {
        id = this.generateId();
        const taskData = {id, title, status};
        console.log(taskData)
        const task = await postData(taskData);
        // this.#boardTasks.push(task);
        window.dispatchEvent(new CustomEvent("create-task"));
    }    
    
    // getTasksByStatus(status){
    //     const tasksStatus = this.#boardTasks.filter(function(task) {
    //         return task.status == status;
    //     });
    //     return(tasksStatus)
    // }
    // create({id='', title, status = Status.BACKLOG}) {
    //     id = this.generateId();
    //     this.#boardTasks.push({id, title, status});
    //     window.dispatchEvent(new CustomEvent("create-task"))
    // }


    async getallTasks(){
        const render = await getData();
        // var result = Object.keys(render).map((key) => [key, render[key]]);
        // console.log(result)
        return render;
    }

    async deleteAll() {
        try {
            const tasksToDelete = this.#boardTasks.filter(task => task.status === 'bin');
            const deletePromises = tasksToDelete.map(task => deleteData(task.id));
            await Promise.all(deletePromises);
            this.#boardTasks = this.#boardTasks.filter(task => task.status !== 'bin');
        } catch (error) {
            console.error("Error deleting tasks:", error);
            throw new Error("Failed to delete tasks");
        }
    }
    

    async getTasks(){
        return this.#boardTasks;
    }

    generateId(){
        return crypto.randomUUID();
    }
}
