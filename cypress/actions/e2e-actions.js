 
/// <reference types="cypress" />
export class TodoPage {
   navigate() {
    cy.visit('/')
  }
  
   generateRandom() {
    var uuid = require("uuid")
    return uuid.v4()
  }

   addTodo(todoText) {
    cy.get('.new-todo').type(todoText + '{enter}')
  }

   editTodo(todoIndex, todoText) {
    cy.get(`.todo-list li:nth-child(${todoIndex + 1}) label`).dblclick()
    cy.get('.edit').clear()
    cy.get('.edit').type(todoText + '{enter}')
  }
  
   toggleTodo(todoIndex) {
    cy.get(`.todo-list li:nth-child(${todoIndex + 1}) .toggle`).click()
  }
  
  
   clearCompleted() {
    cy.contains('Clear completed').click()
  }
  
   validateNumberOfTodosShown(expectedNumberOfTodos) {
    cy.get('.todo-list li').should('have.length', expectedNumberOfTodos)
  }
  
   validateTodoCompletedState(todoIndex, shouldBeCompleted) {
    const l = cy.get(`.todo-list li:nth-child(${todoIndex + 1}) label`)
  
    l.should(`${shouldBeCompleted ? '' : 'not.'}have.css`, 'text-decoration-line', 'line-through')
  }
  
   validateTodoText(todoIndex, expectedText) {
    cy.get(`.todo-list li:nth-child(${todoIndex + 1}) label`).should('have.text', expectedText)
  }
  
   validateToggleState(todoIndex, shouldBeToggled) {
    const label = cy.get(`.todo-list li:nth-child(${todoIndex + 1}) label`)
  
    label.should(`${shouldBeToggled ? '' : 'not.'}be.checked`)
  }
}
