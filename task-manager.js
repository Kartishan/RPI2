import EventEmitter from 'events';

import { readFile, writeFile } from 'node:fs';
import { Task } from './task.js';

export class TaskManager extends EventEmitter{
    constructor() {
        super();
        // this.tasks=[];
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
                resolve(tasks);
                this.tasks = obj.map(task => {
                    const newTask = new TaskModel(task);
                    newTask.save();
                    return newTask;
                })
            });
        });
    }
    printTasks(tasks) {
        if (!tasks || tasks.length === 0) {
            console.log("Нет задач, который можно было бы напечатать.");
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
            });
        });
    }

    async addTask(task) {
        try {
            const tasks = await this.loadTasks();
            tasks.push(task);
            this.emit('taskAdded', task);
            await this.saveTasks(tasks);
            console.log("Задача успешно добавлена.");
        } catch (error) {
            console.error("Ошибка добавления задачи: ", error);
        }
    }

    async deleteTask(taskId) {
        try {
            const tasks = await this.loadTasks();
            const index = tasks.findIndex(task => task.id === taskId);
            if (index !== -1) {
                const deletedTask = tasks.splice(index, 1)[0];
                this.emit('TaskDeleted', deletedTask)
                await this.saveTasks(tasks);
                console.log("Задача успешно удалена.");
            } else {
                console.log("Задача не найдена.");
            }
        } catch (error) {
            console.error("Ошибка при удалении задачи: ", error);
        }
    }
}
