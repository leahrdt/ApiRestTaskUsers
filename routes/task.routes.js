//npm install faker
//npm install uui

const express = require('express');
const router = express.Router();

//Schema
const Task = require('../model/task')

//Traer todas las tareas
router.get('/', async (req,res) => {
    console.log(req.body.email)
    let maill = req.body.email;
    const query = {email:maill};

    const tasks = await Task.find(query);
    console.log(tasks)
    res.json(tasks);
});

//Traer solo Una tarea por ID
router.get('/:id', async (req,res) => {
    const task = await Task.findById(req.params.id)
    res.json(task)
});

//Crear una nueva tarea
router.post('/', async (req,res) => {
    const {email, title, description} = req.body; 
    const task = new Task({email,title,description}); 
        console.log(task)
    await task.save() 
    res.json({status: 'Tarea Guardada'});
});

//Modificar una Tarea
router.put('/:id', async (req,res) => {
    const {email,title, description} = req.body;
    const newTask =  {email,title, description}
    await Task.findByIdAndUpdate(req.params.id, newTask) 
    res.json({status: 'Tarea Realizada'});
});

//Eliminar una Tarea
router.delete('/:id', async (req,res) => {
    await Task.findByIdAndDelete(req.params.id) 
    res.json({status: 'Dato Eliminado'});
});

module.exports = router;