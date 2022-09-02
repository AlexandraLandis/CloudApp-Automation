const email = 'aml4bc@gmail.com';
const password = 'Password123!';

beforeEach(() => {
    cy.visit('https://share.getcloudapp.com/login');
    cy.get('[data-testid="regular-login-email"]').focus().type(email);
    cy.get('[data-testid="regular-login-password"]').focus().type(password);
    cy.get('[data-testid="regular-login-submit"]').click();
});

describe ('log_out spec', () => {
    it('logs out user when visting logout url', () => {
        cy.visit('https://share.getcloudapp.com/logout');
        cy.get('[class="alert alert-success"]').should('contain', 'Successfully Logged Out');
        cy.visit('https://share.getcloudapp.com/dashboard');
        cy.url().should('eql', 'https://share.getcloudapp.com/login');
    });

    it('logs out user when using sign out feature', () => {
        cy.get('[id="avatar"]').click();
        cy.get('a[data-testid="dropdown-link-sign_out"]').click();
        cy.get('[class="alert alert-success"]').should('contain', 'Successfully Logged Out');
        cy.visit('https://share.getcloudapp.com/dashboard');
        cy.url().should('eql', 'https://share.getcloudapp.com/login');
    });
    
    afterEach(() => {
        cy.visit('https://share.getcloudapp.com/logout');
    });

})