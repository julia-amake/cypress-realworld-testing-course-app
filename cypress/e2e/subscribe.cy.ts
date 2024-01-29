describe('Newsletter subscribe form', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });

    it('Allows users to subscribe to the email list', () => {
        const validEmail = 'cutie_jul@ya.ru';

        cy.getByData('email-input').type(validEmail);
        cy.getByData('submit-button').click();

        cy.getByData('success-message').should('exist').contains(validEmail);
    });

    it('does NOT allow an invalid email address', () => {
        cy.getByData('email-input').type('cutie_jul');
        cy.getByData('submit-button').click();

        cy.getByData('success-message').should("not.exist");
    });

    it('does NOT allow a email, which is an already subscribed', () => {
        const subscribedEmail = 'john@example.com';
        cy.getByData('email-input').type(subscribedEmail);
        cy.getByData('submit-button').click();
        cy.getByData('server-error-message')
            .should('exist')
            .contains(`Error: ${subscribedEmail} already exists. Please use a different email address.`)
    });
});
