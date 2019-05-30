// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (email, password) => {
    // cy.visit('http://' + Cypress.env('VUE_APP_HOST') + ':' + Cypress.env('VUE_APP_PORT') + '/login');
    cy.visit('http://localhost:8080/login');
    cy.url().should('eq', 'http://localhost:8080/login');
    cy.get('[name="email"]')
        .type(email);
    cy.wait(1000);
    cy.get('[name="password"]')
        .type(password);
    cy.wait(1000);
    cy.get('.v-btn').click();
    // cy.url().should('eq', 'http://localhost:8080/');
    // cy.get('.v-snack__content').contains('Login realizado com sucesso!');
    // cy.get('.v-snack__content > .v-btn > .v-btn__content').click();
});

Cypress.Commands.add('logout', () => {
    cy.get('.v-toolbar__side-icon > .v-btn__content > .v-icon').click();
    cy.get('.pt-0 > :nth-child(7) > .v-list__tile').click();
    // cy.get('.v-snack__content').contains('Logout realizado com sucesso.');
    // cy.get('.v-snack__content > .v-btn > .v-btn__content').click();
});
