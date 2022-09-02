const date = Date.now().toString();
const email_address = date+'@test.com';
describe ('sign_up spec', () => {
    it('navigates to sign up page and verifies required fields are present', () => {
        cy.visit('/');
        cy.get('a[id="login-dblue"]').click();
        cy.get('a[href="/signup"]').should('be.visible');
        cy.get('a[href="/signup"]').click();
        cy.once('uncaught:exception', () => false);
        cy.url().should('eql', 'https://share.getcloudapp.com/signup');
        cy.get('[id="email"]').should('be.visible');
        cy.get('[id="password"]').should('be.visible');
    });

    it('fills in required fields and creates new user', () => {
        cy.visit('/');
        cy.get('a[id="login-dblue"]').click();
        cy.get('a[href="/signup"]').click();
        cy.once('uncaught:exception', () => false);
        cy.get('[id="email"]').focus().type(email_address);
        cy.get('[id="password"]').focus().type('Password123!');
        cy.get('[data-testid="regular-signup-submit"]').click();
        cy.get('.toast-body').should('contain', 'Account created successfully');
    });

    it('fills in existing email tied to a user and fails', () => {
        cy.visit('/');
        cy.get('a[id="login-dblue"]').click();
        cy.get('a[href="/signup"]').click();
        cy.once('uncaught:exception', () => false);
        cy.get('[id="email"]').focus().type('aml4bc@gmail.com');
        cy.get('[id="password"]').focus().type('Password123!');
        cy.get('[data-testid="regular-signup-submit"]').click();
        cy.get('[class="flash alert alert-danger"]').should('contain', 'Validation failed: Email has already been taken');
    });

    afterEach(() => {
        cy.visit('https://share.getcloudapp.com/logout');
    });
});