const express = require("express")

const {getTodos, getTodo, createTodo, updateTodo, deleteTodo } = require('../controllers/todoControllers')
const requireAuth = require("../middleware/requireAuth.js")
const rejectJson = require("../middleware/rejectJson.js");

const router = express.Router() //^ Using the express Router to handle routes

router.use(requireAuth) //^ runs middileware on every request 
router.use(rejectJson) //^ Checks to make sure that only JSON data is being passed as the content Type

router.get('/', getTodos) //~ GET all todos

router.get("/:id", getTodo) //~ GET a specific todo

router.post("/", createTodo) //~ CREATE a todo

router.put("/:id", updateTodo) //~ UPDATE a todo

router.delete("/:id", deleteTodo) //~ DELETE a todo

module.exports = router
