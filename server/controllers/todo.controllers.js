const Todo = require("../models/todoModel")
const mongoose = require('mongoose')
const {cl} = require('goosefuncs')

//* GET ALL TODOS API
//TODO GET ALL FRONTEND
const getTodos = async (req, res) => {
    const user_id = req.user._id

    const todos = await Todo.find({user_id}).sort({createdAt: -1})
    res.status(200).json(todos)
}

//TODO GET A TODO API
//TODO GET A TODO FRONTEND
const getTodo = (req, res) => {
    const {_id}= req.params
    res.status(200).json({msg: _id})
}

//* CREATE A TODO API
//TODO CREATE A TODO FRONTEND

const createTodo = async (req, res) => {
    const details = req.body.details
    const id = req.user._id //^ Gets the current authenticated user's id from the jwt from authorization

    cl( "---------------------------- " + req.user._id)
    cl("<><><><><><><><>", details)
    
    const todo = await Todo.create({details: details, user_id: id})

    res.status(200).json(todo)
}

//* DELETE TODO
const deleteTodo = async (req, res) => {
    const {id}= req.params
    console.log("--- DELETE ---", id)

    const todo = await Todo.findByIdAndDelete({_id: id})

    res.status(200).json({ todo })
}

//TODO UPDATE TODO
const updateTodo = (req, res) => {
    const id = req.body.id
    res.status(200).json({msg: "Update Todo!"})
}

module.exports = { getTodos, getTodo, createTodo, updateTodo, deleteTodo }