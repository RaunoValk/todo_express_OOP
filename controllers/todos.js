import {Todo} from '../models/todo.js'

class todoController {
    constructor () {
    this.TODOS = []
}
 async createTodo(req, res) {
        const task = req.body.task
        const newTodo = new Todo(Math.random(). toString(), task)
        console.log(newTodo)
        this.TODOS.push(newTodo)
        res.json( {
            message: "created new Todo object",
            newTask: newTodo
        })
    }
    async initTodos(){
        const todosData = await fileManager.readFile('./data/todos.json')
        // if data is ok - add file content to array
        if(todosData !== null){
            this.TODOS = todosData
        } else  {
            this.TODOS = [] // if we do not get data from file create an empty array
        }
    }

    getTodos(req, res){
        res.json({tasks: this.TODOS})
    }
}

export const TodoController = new todoController