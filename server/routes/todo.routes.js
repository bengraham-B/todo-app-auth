const express = require("express")

const {getTodos, getTodo, createTodo, updateTodo, deleteTodo } = require('../controllers/todo.controllers.js')

const router = express.Router() //^ Using the express Router to handle routes

router.get('/', getTodos)

router.get("/:id", getTodo)

router.post("/", createTodo)

router.patch("/:id", updateTodo)

router.delete("/:id", deleteTodo)

module.exports = router
