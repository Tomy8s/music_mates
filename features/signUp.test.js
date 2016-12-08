import { signUp, signIn, signOut, cleanDatabase } from './testHelpers.test'

describe('User Login', function() {
    // beforeEach(function() {
    //     server.call('logout');
    //     cleanDatabase();
    // });

    describe('Sign up and sign in', function() {
        it('signs up a new user', function() {
            signUp('Tester', 'test@test.com', 'testpassword')
            expect(browser.getText('#login-name-link')).to.equal('Tester ▾');
        });

        it('signs in existing user', function(){
            signOut();
            signIn('Tester', 'testpassword');
            browser.waitForExist('#login-name-link', 10000);
            expect(browser.getText('#login-name-link')).to.equal('Tester ▾');
        });

        it('signs out existing user', function() {
            signOut();
            browser.waitForExist('#login-sign-in-link', 10000);
            expect(browser.getText('#login-sign-in-link')).to.equal('Sign in ▾');
        });

        it('wont sign in non registered user', function(){
            signIn('NoUser', 'testpassword');
            expect(browser.getText('.message.error-message')).to.equal('User not found');
            cleanDatabase();
        });
    });
});
