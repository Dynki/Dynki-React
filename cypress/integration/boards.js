import Chance from 'chance';
const chance = new Chance();

/// <reference types="Cypress" />

context('Login', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
    })

    it('Create Board', () => {
        const email = chance.email();
        cy.signup(email);
        cy.newTeam();
        
        
    })

    it('Check if valid email', () => {
      cy.get('#email').type('fake').should('have.value', 'fake')
      cy.get('#password').click();
      cy.contains('Not a valid email address!');
    })

    it('Check for required values', () => {
      cy.get('#loginbtn').click();
      cy.contains('Please input an email!')
      cy.contains('Please input your Password!')
    })

    it('Should login', () => {
      const email = chance.email();
      cy.signup(email)
      cy.newTeam()
      cy.logout()
      cy.login(email, 'F@kelonger1');
      cy.contains('Inbox');
      //cy.logout();
      cy.deleteAccount();
    })

  })
  