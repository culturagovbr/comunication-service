describe('Modulo Mensagem', function () {
    beforeEach(() => {
        cy.login('01234567891', '123456');
        cy.wait(1000);
        cy.url().should('eq', Cypress.env('VUE_APP_URL'));
        menuMensagens();
        cy.wait(1000);
    });

    afterEach(() => {
        cy.logout();
    });

    it('Criar Mensagem', function () {
        cy.url().should('eq', Cypress.env('VUE_APP_URL') + 'administracao/mensagem');
        cy.get('.v-btn--bottom').click();

        cy.get('[aria-label="Título"]').type('Titulo Mensagem');

        cy.get('[aria-label="Descrição"]').type('Um corpo para testar essa mensagem.');

        cy.get(':nth-child(1) > .v-list__tile > .v-list__tile__content > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple').click();

        cy.get('.wrap > :nth-child(1) > .v-select > .v-input__control > .v-input__slot > .v-select__slot > .v-select__selections').click();

        cy.get('.v-menu__content--fixed > .v-select-list > .v-list > :nth-child(1) > .v-list__tile > .v-list__tile__content').click();

        cy.get(':nth-child(2) > .v-input > .v-input__control > .v-input__slot > .v-label').contains('Ativo');

        cy.get('.flex > .theme--dark').click();
    });

    it('Editar Mensagem', function () {
        cy.url().should('eq', Cypress.env('VUE_APP_URL') + 'administracao/mensagem');
        cy.get('[aria-label="Buscar"]').type('Titulo Mensagem');

        cy.get(':nth-child(1) > .justify-center > :nth-child(1) > .v-btn__content > .v-icon').click();

        cy.get('[aria-label="Título"]').clear().type('Outro Titulo');

        cy.get('[aria-label="Descrição"]').clear().type('Corpo novo editado para essa mensagem');

        cy.get('.v-input--selection-controls__ripple').click();

        cy.get('.v-input__slot > .v-label').contains('Inativo');

        cy.get('.v-input--selection-controls__ripple').click();

        cy.get('.v-input__slot > .v-label').contains('Ativo');

        cy.get('.flex > .theme--dark').click();
    });

    it('Excluir Mensagem', function () {
        cy.url().should('eq', Cypress.env('VUE_APP_URL') + 'administracao/mensagem');
        cy.get('[aria-label="Buscar"]').type('Outro Titulo');

        cy.get(':nth-child(1) > .justify-center > :nth-child(2) > .v-btn__content > .v-icon').click();
    });
});

const menuMensagens = () => {
    cy.get('.v-toolbar__side-icon > .v-btn__content > .v-icon').click();

    cy.get(':nth-child(6) > .v-list__tile').click();

    cy.get(':nth-child(4) > .v-tabs__item').click();
};
