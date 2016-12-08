import { signUp, signIn, signOut } from './testHelpers.test'

describe('friends', function() {

  context('no friends', function(){
    it('displays "You have no friends", when no friends', function() {
        signUp('friendTester1', 'freind1@test.com', 'testpassword');
        signOut();
        signUp('friendTester2', 'friend2@test.com', 'testpassword');
        browser.url('http://localhost:3000/friends');
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
    it('adds friend request to freind request list', function(){
        signIn('friendTester1', 'testpassword');
        browser.url('http://localhost:3000/friends');
        browser.waitForExist('#requests-received-list', 10000);
        expect(browser.getText('#requests-received-list')).to.equal('friendTester2 would like to be friends');
        signOut();
    });
  });
});
