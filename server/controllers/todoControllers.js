const Todo = require("../models/todoModel") //^ Importing Todo model.
const mongoose = require('mongoose')

//* GET ALL TODOS API
const getTodos = async (req, res) => {
    const user_id = req.user._id

    const todos = await Todo.find({user_id}).sort({createdAt: -1})
    res.status(200).json(todos)
}

//* GET A TODO API
const getTodo = (req, res) => {
    const {_id}= req.params
    res.status(200).json({msg: _id})
}

//* CREATE A TODO API
const createTodo = async (req, res) => {
    const details = req.body.details
    const id = req.user._id //^ Gets the current authenticated user's id from the jwt from authorization

    //^ Rejects requests if they exceed 140 characters/
    if(details.length < 140){
        const todo = await Todo.create({details: details, user_id: id})
        res.status(200).json(todo)
    }
    else{
        res.status(400).json("Todo excceeds 140 characters")
    }

}

//* DELETE TODO
const deleteTodo = async (req, res) => {
    const {id}= req.params

    const todo = await Todo.findByIdAndDelete({_id: id})

    res.status(200).json({ todo })
}

//* UPDATE TODO
const updateTodo = async (req, res) => {
    const { id } = req.params

    try {
        const todo_UPDATE = await Todo.findOneAndUpdate({ _id: id }, { ...req.body });
        res.status(200).json({ todo_UPDATE });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error on the server.' });
    }
}

module.exports = { getTodos, getTodo, createTodo, updateTodo, deleteTodo }