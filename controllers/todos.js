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
        
        if(todosData !== null){
            this.TODOS = todosData
        } else  {
            this.TODOS = []
        }
    }

    getTodos(req, res){
        res.json({tasks: this.TODOS})
    }

    async updateTodo(req,res){
        const todoId = req.params.id 
        const updatedTask = req.body.task

        const todoIndex = this.TODOS.findIndex((todo) => todo.id === todoId)

        if(todoIndex < 0){
            res.json({
                message: 'Could not find todo with such index'
            } )
            throw new Error('Could not find todo')
        }
        
        this.TODOS[todoIndex] = new Todo (this.TODOS[todoIndex].id, updatedTask)
            res.json({
                message: 'todo is updated',
                updatedTask: this.TODOS[todoIndex] 
            } ) 
    }
    async deleteTodo(req,res){
        const todoId = req.params.id 
        const deletedTask = req.body.task

        let todoIndex = this.TODOS.findIndex((todo) => todo.id === todoId)

        if(todoIndex < 0){
            res.json({
                message: 'Could not find todo with such index'
            } )
            throw new Error('Could not find todo')
        }
     else{ 
        this.TODOS[todoIndex] = new Todo (this.TODOS[todoIndex].id, deletedTask)

            res.json({
                message: 'todo is deleted',
                deletedTask: this.TODOS[todoIndex] 
            } )
            this.TODOS.splice(todoIndex, 1) 
        }    
     }
 
}

export const TodoController = new todoController