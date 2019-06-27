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
Cypress.Commands.add('login', (cpf, password) => {
    // cy.visit('http://' + Cypress.env('VUE_APP_HOST') + ':' + Cypress.env('VUE_APP_PORT') + '/login');
    cy.visit(Cypress.env('VUE_APP_URL') + 'login');
    cy.url().should('eq', Cypress.env('VUE_APP_URL') + 'login');
    cy.get('.form-control > .v-input__control > .v-input__slot > .v-text-field__slot > input')
        .type(cpf);
    cy.wait(1000);
    cy.get('[name="password"]')
        .type(password);
    cy.wait(1000);
    cy.get('.v-btn--block').click();
});

Cypress.Commands.add('logout', () => {
    cy.get('.v-toolbar__side-icon > .v-btn__content > .v-icon').click();
    cy.get('.pt-0 > :nth-child(7) > .v-list__tile').click();
});
