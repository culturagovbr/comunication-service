describe('Modulo Sistema', function () {
    beforeEach(() => {
        cy.login('01234567891', '123456');
        cy.wait(1000);
        cy.url().should('eq', Cypress.env('VUE_APP_URL'));
        menuSistema();
        cy.wait(1000);
    });

    afterEach(() => {
        cy.logout();
    });

    it('Criar Sistema', function () {
        cy.url().should('eq', Cypress.env('VUE_APP_URL') + 'administracao/sistema');
        cy.get('.v-dialog__activator > .v-btn').click();

        cy.get('[aria-label="Descrição"]').type('E-pracas');

        cy.get('[aria-label="URL"]').type('epracas.com');

        cy.get('.v-input__slot > .v-label').contains('Ativo');

        cy.get('.text-xs-center > .blue').click();

    });

    it('Editar Sistema', function () {
        cy.url().should('eq', Cypress.env('VUE_APP_URL') + 'administracao/sistema');
        cy.get('[aria-label="Buscar"]').type('E-pracas');

        cy.get(':nth-child(1) > .justify-center > :nth-child(1) > .v-btn__content > .v-icon').click();

        cy.get('[aria-label="Descrição"]').clear().type('Sistema Nacional de Cultura');

        cy.get('[aria-label="URL"]').clear().type('snc.cultura.gov.br');

        cy.get('.v-input--selection-controls__ripple').click();

        cy.get('.v-input__slot > .v-label').contains('Inativo');

        cy.get('.text-xs-center > .blue').click()
    });

    it('Excluir Sistema', function () {
        cy.url().should('eq', Cypress.env('VUE_APP_URL') + 'administracao/sistema');
        cy.get('[aria-label="Buscar"]').type('Sistema Nacional de Cultura');

        cy.get(':nth-child(1) > .justify-center > :nth-child(2) > .v-btn__content > .v-icon').click();
    });
});

const menuSistema = () => {
    cy.get('.v-toolbar__side-icon > .v-btn__content > .v-icon').click();
    cy.get(':nth-child(6) > .v-list__tile').click();
    cy.get(':nth-child(3) > .v-tabs__item').click();
};
