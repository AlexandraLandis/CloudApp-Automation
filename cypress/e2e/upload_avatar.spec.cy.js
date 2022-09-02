const email = 'aml4bc@gmail.com';
const password = 'Password123!';

beforeEach(() => {
    cy.visit('https://share.getcloudapp.com/login')
    cy.get('[data-testid="regular-login-email"]').focus().type(email);
    cy.get('[data-testid="regular-login-password"]').focus().type(password);
    cy.get('[data-testid="regular-login-submit"]').click();
});

describe ('upload_avatar spec', () => {
    it('navigates to profile and uploads PNG file successfully', () => {
        cy.get('[id="avatar"]').click();
        cy.get('[class="dropdown-item"]').contains('Settings').click();
        cy.get('[id="user_avatar"]').attachFile("eye_of_sauron_success.png");
        cy.get('[data-testid="onboarding-submit-about-you-form"]').click();
    });

    it('navigates to profile and attempts uploading PNG file above max dims', () => {
        cy.get('[id="avatar"]').click();
        cy.get('[class="dropdown-item"]').contains('Settings').click();
        cy.get('[id="user_avatar"]').attachFile("over_max.png");
        cy.get('[data-testid="onboarding-submit-about-you-form"]').click();
        cy.get('[class="flash alert alert-danger"]').contains('Avatar Max size is 500x500px');
    });

    afterEach(() => {
        cy.visit('https://share.getcloudapp.com/logout');
    });

});