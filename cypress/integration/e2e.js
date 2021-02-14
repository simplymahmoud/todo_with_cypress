/// <reference types="cypress" />
import {
    navigate,
    generateRandom,
    addTodo,
    editTodo,
    validateTodoText,
    toggleTodo,
    clearCompleted,
    validateTodoCompletedState,
    validateToggleState,
    validateNumberOfTodosShown,
  } from '../actions/e2e-actions'
  

  describe('todo actions', () => {
    beforeEach(() => {
      navigate('https://todomvc.com/examples/angular2/')
    })
  
    describe('positive tests', () => {
        it('should add a new todo to the list', () => {
            const todo_task = generateRandom()
            addTodo(todo_task)
            validateTodoText(0, todo_task)
            validateToggleState(0, false)
        })
        
        it('should edit todo on the list', () => {
            const todo_task = generateRandom()
            addTodo(todo_task)
            editTodo(0, todo_task+todo_task)
            validateTodoText(0, todo_task+todo_task)
            validateToggleState(0, false)
        })

        it('should toggle test correctly', () => {
            const todo_task = generateRandom()
            addTodo(todo_task)
            toggleTodo(0)
            validateTodoCompletedState(0, true)
            clearCompleted()
        })
  
        it('should clear completed', () => {
            const todo_task = generateRandom()
            addTodo(todo_task)
            addTodo(todo_task)
            toggleTodo(0)
            toggleTodo(1)
            clearCompleted()
            validateNumberOfTodosShown(0)
        })
    })

    describe('negative tests', () => {
        it('should add a new todo to the list; long text', () => {
            const special_task = generateRandom()+generateRandom()+generateRandom()+generateRandom()+generateRandom()+generateRandom()
            addTodo(special_task)
            validateTodoText(0, special_task)
            validateToggleState(0, false)
        })
    
        it('should add a new todo to the list; special chars text', () => {
            const special_task = '+_=-)(*&^#!~`[];\',.<>\/'
            addTodo(special_task)
            validateTodoText(0, special_task)
            validateToggleState(0, false)
        })
            
        it('should not add a new todo to the list; empty text', () => {
            const special_task = ''
            addTodo(special_task)
            validateNumberOfTodosShown(0)
        })
         
        it('should not add a new todo to the list; spaces text', () => {
            const special_task = '                  '
            addTodo(special_task)
            validateNumberOfTodosShown(0)
        })
      })

  })