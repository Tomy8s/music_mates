import { signUp, signIn, signOut, cleanDatabase } from './testHelpers.test'

describe('friends', function() {

  context('no friends', function(){
    it('displays "You have no friends", when no friends', function() {
        // console.log('meteor running on:', server._original.host + ':' + server._original.port);
        cleanDatabase();
        signUp('friendTester1', 'freind1@test.com', 'testpassword');
        signOut();
        signUp('friendTester2', 'friend2@test.com', 'testpassword');
        browser.url('http://localhost:3100/friends');
        browser.waitForExist('#friends-list', 5000);
        expect(browser.getText('#friends-list')).to.equal("You don't have any friends yet.");
    });
    it('displays message, when no friends requests received', function() {
        expect(browser.getText('#requests-received-list')).to.equal("You have responded to all your friends' requests.");
    });
    it('displays message, when no friend requests made', function() {
        expect(browser.getText('#requests-made-list')).to.equal("Your friends have already responded to all your requests.");
    });
  });

  context('adding friends', function(){
    it('shows list of suggested friends', function(){
        expect(browser.getText('#friend-request-btn')).to.equal('Follow friendTester1')
    });
    it('removes from suggested friends on click', function(){
        browser.click('#friend-request-btn')
        var doesNotExist = browser.waitForExist('#friend-request-button', undefined, true)
        expect(doesNotExist).to.equal(true);
    });
    it('adds friend request to pending list', function(){
        expect(browser.getText('#requests-made-list')).to.equal('friendTester1 - Cancel pending request')
        signOut();
    });
    it('adds friend request to friend request list', function(){
        signIn('friendTester1', 'testpassword');
        browser.waitForExist('#login-name-link', 5000);
        browser.url('http://localhost:3100/friends');
        browser.waitForExist('#requests-received-list', 10000);
        // expect(browser.getText('#requests-received-list')).to.equal('friendTester2 would like to be friends');
        // signOut();
    });
  });
});
