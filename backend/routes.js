const express = require('express');

const routes = express.Router();
const tasks = [];

routes.get('/tasks', (req, res) => {
    return res.json(tasks);
})

routes.post('/tasks', (req, res) => {
    const task = req.body;

    if (task.task != '' && task.task != null && task.task != undefined) {
        tasks.push(task);

        return res.status(200).json({ message: "Tarefa adicionada com sucesso!" });
    } else {
        return res.status(500).json({ message: "Ocorreu um erro: Por favor preencha a tarefa com um assunto..." });
    }
})

routes.delete('/tasks/:id', (req, res) => {
    const idRequest = req.params.id;

    const taskToDeleteIndex = tasks.findIndex(task => task.id == idRequest);

    if (taskToDeleteIndex !== -1) {

        const deletedTask = tasks[taskToDeleteIndex];

        tasks.splice(taskToDeleteIndex, 1);

        return res.status(200).json({ message: "Tarefa removida com sucesso!", task: deletedTask, tasks: tasks });

    } else {
        return res.status(404).json({ message: "Ocorreu um erro: Tarefa não encontrada...", tasks: tasks });
    }
})

routes.put('/tasks/:id', (req, res) => {
    const idRequest = String(req.params.id);
    const updatedTaskData = req.body;

    const taskToUpdate = tasks.find(task => task.id === idRequest);

    if (
        taskToUpdate &&
        taskToUpdate.task != '' &&
        taskToUpdate.task != null &&
        taskToUpdate.task != undefined
    ) {
        Object.assign(taskToUpdate, updatedTaskData);
        return res.status(200).json({ message: "Tarefa atualizada com sucesso!", task: updatedTaskData });
    } else {
        return res.status(404).send({ message: "Tarefa atualizada com sucesso!" });
    }
})

module.exports = routes;