import { TaskManager } from "./task-manager.js";
import { Task } from "./task.js";

const taskManager = new TaskManager();

taskManager.on('tasksLoaded', (tasks) => {
    console.log('Задачи успешно загружены:', tasks);
});

taskManager.on('tasksSaved', () => {
    console.log('Задачи успешно сохранены');
});

taskManager.on('taskCreated', (addedTask) => {
    console.log('Задача успешно добавлена:', addedTask);
});

taskManager.on('taskDeleted', (deletedTaskId) => {
    console.log('Задача успешно удалена. ID задачи:', deletedTaskId);
});

const testTask = new Task("4", 'Тестовая задача', 'В процессе');

try {
    const tasks = await taskManager.loadTasks();
    await taskManager.addTask(testTask);
    await taskManager.deleteTask("4");
} catch (error) {
    console.error('Ошибка:', error);
}finally {
    taskManager.removeListener('tasksLoaded', onTasksLoaded);
    taskManager.removeListener('tasksSaved', onTasksSaved);
    taskManager.removeListener('taskCreated', onTaskCreated);
    taskManager.removeListener('taskDeleted', onTaskDeleted);
}
