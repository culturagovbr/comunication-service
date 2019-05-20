describe('Modulo Sistema', function () {
    beforeEach(() => {
        cy.login('abcd@gmail.com', '123456');
        menuSistema();
        cy.wait(1000);
    });

    afterEach(() => {
        cy.logout();
    });

    it('Criar Sistema', function () {
        cy.get('.v-dialog__activator > .v-btn').click();

        cy.get('[aria-label="Descrição"]').type('E-pracas');

        cy.get('[aria-label="URL"]').type('epracas.com');

        cy.get('.v-input__slot > .v-label').contains('Ativo');

        cy.get('.text-xs-center > .blue').click();

        cy.get('.v-snack__content').contains('Cadastro realizado com sucesso!');
    });

    it('Editar Sistema', function () {
        cy.get('[aria-label="Buscar"]').type('E-pracas');

        cy.get(':nth-child(1) > .justify-center > :nth-child(1) > .v-btn__content > .v-icon').click();

        cy.get('[aria-label="Descrição"]').clear().type('Sistema Nacional de Cultura');

        cy.get('[aria-label="URL"]').clear().type('snc.cultura.gov.br');

        cy.get('.v-input--selection-controls__ripple').click();

        cy.get('.v-input__slot > .v-label').contains('Inativo');

        cy.get('.text-xs-center > .blue').click()
    });

    it('Excluir Sistema', function () {
        cy.get('[aria-label="Buscar"]').type('Sistema Nacional de Cultura');

        cy.get(':nth-child(1) > .justify-center > :nth-child(2) > .v-btn__content > .v-icon').click();
    });
});

const menuSistema = () => {
    cy.get('.v-toolbar__side-icon > .v-btn__content > .v-icon').click();
    cy.get(':nth-child(6) > .v-list__tile').click();
    cy.get(':nth-child(3) > .v-tabs__item').click();
};
