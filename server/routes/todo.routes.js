const express = require("express")

const {getTodos, getTodo, createTodo, updateTodo, deleteTodo } = require('../controllers/todo.controllers.js')
const requireAuth = require("../middleware/requireAuth.js")

const router = express.Router() //^ Using the express Router to handle routes

router.use(requireAuth) //^ runs middileware on every request 

router.get('/', getTodos) //~ GET all todos

router.get("/:id", getTodo) //~ GET a specific todo

router.post("/", createTodo) //~ CREATE a todo

router.patch("/:id", updateTodo) //~ UPDATE a todo

router.delete("/:id", deleteTodo) //~ DELETE a todo

module.exports = router
