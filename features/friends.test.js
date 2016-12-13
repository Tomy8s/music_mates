import { signUp, signIn, signOut, createAccount, cleanDatabase } from './testHelpers.test'

describe('friends', function() {

  context('no friends', function(){
    it('displays "You have no friends", when no friends @watch', function() {
        // console.log('meteor running on:', server._original.host + ':' + server._original.port);
        server.call('logout');
        cleanDatabase();
        signUp('friendTester1', 'friend1@test.com', 'testpassword');
        browser.url('http://localhost:3100/friends');
        browser.waitForExist('#friends-list', 5000);
        expect(browser.getText('#friends-list')).to.equal("You don't have any friends yet.");
    });
    it('displays message, when no friends requests received', function() {
        browser.waitForExist('#requests-received-list', 5000);
        expect(browser.getText('#requests-received-list')).to.equal("You have responded to all your friends' requests.");
    });
    it('displays message, when no friend requests made', function() {
        browser.waitForExist('#requests-made-list', 5000);
        expect(browser.getText('#requests-made-list')).to.equal("Your friends have already responded to all your requests.");
    });
  });

  context('adding friends', function(){
    it('adds friend request to pending list', function(){
        signOut();
        signUp('friendTester2', 'friend2@test.com', 'testpassword');
        browser.url('http://localhost:3100/discover');
        browser.waitForExist('#friend-request-btn', 5000);
        browser.click('#friend-request-btn');
        browser.url('http://localhost:3100/friends');
        browser.waitForExist('#requests-made-list', 10000);
        expect(browser.getText('#requests-made-list')).to.equal('friendTester1 - Cancel pending request')
        signOut();
    });
    it('adds friend request to friend request list', function(){
        signIn('friend1@test.com', 'testpassword');
        browser.waitForExist('#login-name-link', 5000);
        browser.url('http://localhost:3100/friends');
        browser.waitForExist('#requests-received-list', 10000);
        expect(browser.getText('#requests-received-list')).to.equal('You have 1 pending requests\nfriendTester2 would like to be friends\nAccept No thanks');
        cleanDatabase();
    });
  });
});