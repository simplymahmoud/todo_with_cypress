 
/// <reference types="cypress" />

  export function navigate() {
    cy.visit('/')
  }
  
  export function generateRandom() {
    var uuid = require("uuid")
    return uuid.v4()
  }

  export function addTodo(todoText) {
    cy.get('.new-todo').type(todoText + '{enter}')
  }

  export function editTodo(todoIndex, todoText) {
    cy.get(`.todo-list li:nth-child(${todoIndex + 1}) label`).dblclick()
    cy.get('.edit').clear()
    cy.get('.edit').type(todoText + '{enter}')
  }
  
  export function toggleTodo(todoIndex) {
    cy.get(`.todo-list li:nth-child(${todoIndex + 1}) .toggle`).click()
  }
  
  
  export function clearCompleted() {
    cy.contains('Clear completed').click()
  }
  
  export function validateNumberOfTodosShown(expectedNumberOfTodos) {
    cy.get('.todo-list li').should('have.length', expectedNumberOfTodos)
  }
  
  export function validateTodoCompletedState(todoIndex, shouldBeCompleted) {
    const l = cy.get(`.todo-list li:nth-child(${todoIndex + 1}) label`)
  
    l.should(`${shouldBeCompleted ? '' : 'not.'}have.css`, 'text-decoration-line', 'line-through')
  }
  
  export function validateTodoText(todoIndex, expectedText) {
    cy.get(`.todo-list li:nth-child(${todoIndex + 1}) label`).should('have.text', expectedText)
  }
  
  export function validateToggleState(todoIndex, shouldBeToggled) {
    const label = cy.get(`.todo-list li:nth-child(${todoIndex + 1}) label`)
  
    label.should(`${shouldBeToggled ? '' : 'not.'}be.checked`)
  }