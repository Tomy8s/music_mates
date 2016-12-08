import { signUp, signIn, signUpAndSignIn, getBrowser, cleanDatabase } from './testHelpers.test'

describe('User Login', function() {
    beforeEach(function() {
        server.call('logout');
        // cleanDatabase();
    });

    describe('Sign up and sign in', function() {
        it('signs up a new user', function() {
            browser.url('http://localhost:3000/discover');
            browser.waitForExist('#login-sign-in-link', 5000);
            browser.click('#login-sign-in-link');
            browser.click('#signup-link');
            browser.setValue('input#login-username', 'Tester');
            browser.setValue('input#login-email',  'test@test.com');
            browser.setValue('input#login-password', 'testpassword');
            browser.keys("\uE006"); //press ENTER
            browser.waitForExist('#login-name-link', 5000);
            expect(browser.getText('#login-name-link')).to.equal('Tester ▾');
        });

        it('Signs in existing user', function(){
          server.call('logout');
          browser.url('http://localhost:3000/discover');
          browser.waitForExist('#login-name-link', 10000);
          browser.click('#login-name-link');
          browser.click('#login-buttons-logout');
          browser.waitForExist('#login-sign-in-link', 10000);
          browser.click('#login-sign-in-link');
          browser.setValue('#login-username-or-email', 'Tester');
          browser.setValue('#login-password', 'testpassword');
          browser.keys("\uE006");
          browser.waitForExist('#login-name-link', 10000);
          expect(browser.getText('#login-name-link')).to.equal('Tester ▾');
        });
    });
});
