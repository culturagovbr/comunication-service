describe('Modulo Conta', function () {
    beforeEach(() => {
        cy.login('01234567891', '123456');
        cy.wait(1000);
        cy.url().should('eq', 'http://localhost:8088/');
        menuConta();
        cy.wait(1000);
    });

    afterEach(() => {
        cy.logout();
    });

    it('Criar Conta', function () {
        cy.url().should('eq', 'http://localhost:8088/administracao/conta');
        cy.get('.v-btn--bottom').click();
        cy.wait(1000);

        cy.get('[aria-label="Nome"]').type('Jean Doe');
        cy.get('[aria-label="E-mail"]').type('jean.doe@gmail.com');
        cy.get('[aria-label="Senha"]').type('123456');
        cy.wait(1000);

        cy.get(':nth-child(2) > .v-input > .v-input__control > .v-input__slot').click();
        cy.wait(1000);

        cy.get(':nth-child(2) > .v-input > .v-input__control > .v-input__slot > .v-label').contains('É Administrador');
        cy.wait(1000);

        cy.get(':nth-child(3) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple').click();
        cy.wait(1000);

        cy.get(':nth-child(3) > .v-input > .v-input__control > .v-input__slot > .v-label').contains('Inativo');
        cy.wait(1000);

        cy.get(':nth-child(1) > .v-list__tile > .v-list__tile__content > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple').click();
        cy.wait(1000);

        cy.get('.text-xs-center > .blue').click();
        // cy.wait(1000);

        // cy.get('.v-snack__content').contains('Cadastro realizado com sucesso!');
    });

    it('Editar Conta', function () {
        cy.get('[aria-label="Buscar"]').type('Jean Doe');
        cy.wait(1000);

        cy.get('.justify-center > :nth-child(1) > .v-btn__content > .v-icon').click();
        cy.wait(1000);

        cy.get('[aria-label="Nome"]').clear().type('John Doe');
        cy.wait(1000);

        cy.get('[aria-label="E-mail"]').clear().type('john.doe@gmail.com');
        cy.wait(1000);

        cy.get(':nth-child(2) > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple').click();
        cy.wait(1000);

        cy.get('.text-xs-center > .blue').click();
        
    });

    it('Excluir Conta', function () {
        cy.get('[aria-label="Buscar"]').type('John Doe');
        cy.wait(1000);

        cy.get('.justify-center > :nth-child(2) > .v-btn__content > .v-icon').click();
    });
});

const menuConta = () => {
    cy.get('.v-badge > .v-icon');
    cy.get('.v-toolbar__side-icon > .v-btn__content > .v-icon').click();
    cy.wait(1000);
    
    cy.get(':nth-child(6) > .v-list__tile').click();
    cy.wait(1000);
    
    cy.get(':nth-child(5) > .v-tabs__item').click();
};
