const getTodos = (req, res) => {
    res.status(200).json({msg:"All Todos!"})
}

const getTodo = (req, res) => {
    const {_id}= req.params
    res.status(200).json({msg: _id})
}

const createTodo = (req, res) => {
    const {_id, details, completed} = req.body
    console.log(details)
    res.status(200).json({_id, details, completed})
}

const deleteTodo = (req, res) => {
    const {id}= req.params
    res.status(200).json({msg: id})
}

const updateTodo = (req, res) => {
    const id = req.body.id
    res.status(200).json({msg: "Update Todo!"})
}

module.exports = { getTodos, getTodo, createTodo, updateTodo, deleteTodo }