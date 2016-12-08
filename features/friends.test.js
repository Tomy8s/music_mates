import { signUp, signIn, signOut } from './testHelpers.test'

describe('friends', function() {
    it('displays "You have no friends", when no friends', function() {
        signUp('friendTester', 'friend@test.com', 'testpassword');
        browser.url('http://localhost:3000/friends');
        expect(browser.getText('#friends-list')).to.equal("You don't have any friends yet.");
    });
    it('displays message, when no friends requests received', function() {
        expect(browser.getText('#requests-received-list')).to.equal("You have responded to all your friends' requests.");
    });
    it('displays message, when no friend requests made', function() {
        expect(browser.getText('#requests-made-list')).to.equal("Your friends have already responded to all your requests.");
        signOut();
    });
});