const Todo = require("../models/todoModel")
const mongoose = require('mongoose')
const {cl} = require('goosefuncs')

//TODO GET ALL TODOS
const getTodos = (req, res) => {
    res.status(200).json({msg:"All Todos!"})
}

//TODO GET A TODO
const getTodo = (req, res) => {
    const {_id}= req.params
    res.status(200).json({msg: _id})
}

//TODO CREATE A TODO
const createTodo = (req, res) => {
    const {_id, details, completed} = req.body
    console.log(details)
    res.status(200).json({_id, details, completed})
}

//TODO DELETE TODO
const deleteTodo = (req, res) => {
    const {id}= req.params
    res.status(200).json({msg: id})
}

//TODO UPDATE TODO
const updateTodo = (req, res) => {
    const id = req.body.id
    res.status(200).json({msg: "Update Todo!"})
}

module.exports = { getTodos, getTodo, createTodo, updateTodo, deleteTodo }