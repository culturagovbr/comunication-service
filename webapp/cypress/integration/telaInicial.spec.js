describe('Testando Tela Inicial', function () {
    beforeEach(() => {
        telaInicial();
    });

    it('Cadastrar', function () {
        cy.get('span > .v-btn > .v-btn__content').click();
        cy.wait(1000);

        cy.get('[aria-label="Nome"]').type('Nome Teste');

        cy.get('[aria-label="CPF"]').type('01234567899');
        
        cy.get('[aria-label="E-mail"]').type('email.comunicacao@gmail.com');

        cy.get('[aria-label="Senha"]').type('123456');

        cy.get(':nth-child(1) > .v-list__tile > .v-list__tile__content > .v-input > .v-input__control > .v-input__slot > .v-input--selection-controls__input > .v-input--selection-controls__ripple').click();

        cy.get('.v-card__actions > .v-btn').click();
    });

    it('Recuperar Senha', function () {
        cy.get('.caption > .v-btn__content').click();
        cy.wait(1000);
        
        cy.url().should('eq', Cypress.env('VUE_APP_URL') + 'recuperar');

        cy.get('[aria-label="E-mail"]').type('abcd@gmail.com');

        cy.get('[aria-label="Nova Senha"]').type('123456');

        cy.get('[aria-label="Confirmar Senha"]').type('123456');

        cy.get('.v-card__actions > .v-btn').click();
        
        cy.url().should('eq', Cypress.env('VUE_APP_URL') + 'login');
    });
});

const telaInicial = () => {
    cy.wait(1000);
    cy.visit(Cypress.env('VUE_APP_URL') + 'login');
    cy.url().should('eq', Cypress.env('VUE_APP_URL') + 'login');
};
