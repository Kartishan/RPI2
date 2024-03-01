import { readFile, writeFile } from 'node:fs';
import { Task } from './task.js';
import { EventEmitter } from 'events';

export class TaskManager extends EventEmitter{
    constructor() {
        super();
        this.path = "./tasks.json";
    }
    loadTasks() {
        return new Promise((resolve, reject) => {
            const path = "./tasks.json";
            readFile(path, 'utf8', (err, data) => {
                if (err) {
                    console.error("Ошибка чтения файла с задачами", err);
                    reject(err);
                    return;
                }
                const obj = JSON.parse(data);
                const tasks = obj.map(task => new Task(task.id, task.description, task.status));
                resolve(tasks);
                this.emit('tasksLoaded', tasks);
            });
        });
    }
    printTasks(tasks) {
        if (!tasks || tasks.length === 0) {
            console.log("Нет задач, которые можно было бы напечатать.");
            return;
        }
        tasks.forEach(task => {
            task.ToString();
        });
    }
    async saveTasks(tasks) {
        return new Promise((resolve, reject) => {
            const tasksJson = JSON.stringify(tasks, null, 2);
            writeFile(this.path, tasksJson, 'utf8', (err) => {
                if (err) {
                    console.error("Ошибка записи задачи в файл: ", err);
                    reject(err);
                    return;
                }
                resolve();
                this.emit('tasksSaved', tasks);
            });
        });
    }

    async addTask(task) {
        try {
            const tasks = await this.loadTasks();
            tasks.push(task);
            await this.saveTasks(tasks);
            console.log("Задача успешно добавлена.");
            this.emit('taskCreated', task);
        } catch (error) {
            console.error("Ошибка добавления задачи: ", error);
        }
    }

    async deleteTask(taskId) {
        try {
            const tasks = await this.loadTasks();
            const index = tasks.findIndex(task => task.id === taskId);
            if (index !== -1) {
                tasks.splice(index, 1);
                await this.saveTasks(tasks);
                console.log("Задача успешно удалена.");
                this.emit('taskDeleted', taskId);
            } else {
                console.log("Задача не найдена.");
            }
        } catch (error) {
            console.error("Ошибка при удалении задачи: ", error);
        }
    }
}
