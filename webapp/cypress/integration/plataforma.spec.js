describe('Modulo Plataforma', function () {
    beforeEach(() => {
        cy.login('01234567891', '123456');
        cy.wait(1000);
        cy.url().should('eq', Cypress.env('VUE_APP_URL'));
        menuPlataforma();
        cy.wait(1000);
    });

    afterEach(() => {
        cy.logout();
    });

    it('Criar Plataforma', function () {
        cy.url().should('eq', Cypress.env('VUE_APP_URL') + 'administracao/plataforma');
        cy.get('.v-btn--bottom').click();

        cy.get('[aria-label="Descrição"]').type('WhatsApp');

        cy.get('.v-input__slot > .v-label').contains('Ativo');

        cy.get('.text-xs-center > .blue').click();
    });

    it('Editar Plataforma', function () {
        cy.url().should('eq', Cypress.env('VUE_APP_URL') + 'administracao/plataforma');
        cy.get(':nth-child(1) > .justify-center > :nth-child(1) > .v-btn__content > .v-icon').click();

        cy.get('[aria-label="Descrição"]').clear().type('Telegram');

        cy.get('.v-input__slot > .v-label').contains('Ativo');

        cy.get('.text-xs-center > .blue').click();
    });

    it('Excluir Plataforma', function () {
        cy.url().should('eq', Cypress.env('VUE_APP_URL') + 'administracao/plataforma');
        cy.get(':nth-child(2) > .justify-center > :nth-child(2) > .v-btn__content > .v-icon').click();
    });
});

const menuPlataforma = () => {
    cy.get('.v-toolbar__side-icon > .v-btn__content > .v-icon').click();
    cy.get(':nth-child(6) > .v-list__tile').click();
};
