/// <reference types="cypress" />

  import {TodoPage} from '../actions/e2e-actions'

  describe('todo actions', () => {
    const todoPage = new TodoPage()
    beforeEach(() => {
        todoPage.navigate()
    })
  
    describe('positive tests', () => {
        it('should add a new todo to the list', () => {
            const todo_task = todoPage.generateRandom()
            todoPage.addTodo(todo_task)
            todoPage.validateTodoText(0, todo_task)
            todoPage.validateToggleState(0, false)
        })
        
        it('should edit todo on the list', () => {
            const todo_task = todoPage.generateRandom()
            todoPage.addTodo(todo_task)
            todoPage.editTodo(0, todo_task+todo_task)
            todoPage.validateTodoText(0, todo_task+todo_task)
            todoPage.validateToggleState(0, false)
        })

        it('should toggle test correctly', () => {
            const todo_task = todoPage.generateRandom()
            todoPage.addTodo(todo_task)
            todoPage.toggleTodo(0)
            todoPage.validateTodoCompletedState(0, true)
            todoPage.clearCompleted()
        })
  
        it('should clear completed', () => {
            const todo_task = todoPage.generateRandom()
            todoPage.addTodo(todo_task)
            todoPage.addTodo(todo_task)
            todoPage.toggleTodo(0)
            todoPage.toggleTodo(1)
            todoPage.clearCompleted()
            todoPage.validateNumberOfTodosShown(0)
        })
    })

    describe('negative tests', () => {
        it('should add a new todo to the list; long text', () => {
            const special_task = todoPage.generateRandom()+todoPage.generateRandom()+todoPage.generateRandom()+todoPage.generateRandom()+todoPage.generateRandom()+todoPage.generateRandom()
            todoPage.addTodo(special_task)
            todoPage.validateTodoText(0, special_task)
            todoPage.validateToggleState(0, false)
        })
    
        it('should add a new todo to the list; special chars text', () => {
            const special_task = '+_=-)(*&^#!~`[];\',.<>\/'
            todoPage.addTodo(special_task)
            todoPage.validateTodoText(0, special_task)
            todoPage.validateToggleState(0, false)
        })
            
        it('should not add a new todo to the list; empty text', () => {
            const special_task = ''
            todoPage.addTodo(special_task)
            todoPage.validateNumberOfTodosShown(0)
        })
         
        it('should not add a new todo to the list; spaces text', () => {
            const special_task = '                  '
            todoPage.addTodo(special_task)
            todoPage.validateNumberOfTodosShown(0)
        })
      })

  })
