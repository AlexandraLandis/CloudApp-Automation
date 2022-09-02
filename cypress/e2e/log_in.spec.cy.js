const email = 'aml4bc@gmail.com';
const password = 'Password123!';
describe ('log_in spec', () => {
    it('navigates to home page and verifies log in button exists', () => {
        cy.visit('/');
        cy.get('a[id="login-dblue"]').should('have.text', 'Log in').should('be.visible');

    });

    it('clicks the log in button', () => {
        cy.visit('/');
        cy.get('a[id="login-dblue"]').click();
        cy.url().should('eql', 'https://share.getcloudapp.com/login');
    });

    it('fills in required fields and logs in existing user', () => {
        cy.visit('/');
        cy.get('a[id="login-dblue"]').click();
        cy.url().should('eql', 'https://share.getcloudapp.com/login');

        cy.get('[data-testid="regular-login-email"]').focus().type(email);
        cy.get('[data-testid="regular-login-password"]').focus().type(password);
        cy.get('[data-testid="regular-login-submit"]').click();
    

        cy.url().should('eql', 'https://share.getcloudapp.com/dashboard');
        cy.get('[id="avatar"]').click();
        cy.get('[class="dropdown-item"]').should('contain', email);
    });

    it('fills in existing email and fails to log in user', () => {
        cy.visit('/');
        cy.get('a[id="login-dblue"]').click();

        cy.get('[data-testid="regular-login-email"]').focus().type(email);
        cy.get('[data-testid="regular-login-submit"]').click();
        cy.url().should('eql', 'https://share.getcloudapp.com/login');
        cy.get('[id="avatar"]').should('not.exist');
    });

    it('fills in valid password and fails to log in user', () => {
        cy.visit('/');
        cy.get('a[id="login-dblue"]').click();

        cy.get('[data-testid="regular-login-password"]').focus().type(password);
        cy.get('[data-testid="regular-login-submit"]').click();
        cy.url().should('eql', 'https://share.getcloudapp.com/login');
        cy.get('[id="avatar"]').should('not.exist');
    });

    it('fills in invalid password and email and fails to log in user', () => {
        cy.visit('/');
        cy.get('a[id="login-dblue"]').click();

        cy.get('[data-testid="regular-login-email"]').focus().type(email);
        cy.get('[data-testid="regular-login-password"]').focus().type('12345678');
        cy.get('[data-testid="regular-login-submit"]').click();
        cy.url().should('eql', 'https://share.getcloudapp.com/login');
        cy.get('[class="alert alert-danger"]').should('contain', 'Invalid email / password combination');
        cy.get('[id="avatar"]').should('not.exist');
    });

    afterEach(() => {
        cy.visit('https://share.getcloudapp.com/logout');
    });
});