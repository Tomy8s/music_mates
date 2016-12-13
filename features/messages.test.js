import { signUp, signIn, signOut, login, cleanDatabase, createAccount, makeAndAcceptFriendRequest } from './testHelpers.test'

describe('Messages', function(){

  beforeEach(function() {
    cleanDatabase();
    signUp('user', 'email@email.com', 'password');
  });

  describe('No messages', function(){
   it('displays a message if you have no converstations', function(){
     browser.url('http://localhost:3100/messages');
     browser.pause(200);
     expect(browser.getText('#messages-list')).to.equal('You currently have no conversations.');
   });

   it('displays a list of your friends on the page', function(){
     makeAndAcceptFriendRequest();
     browser.url('http://localhost:3100/messages');
     browser.pause(200);
     expect(browser.getText('#messages-friends-list')).to.equal('user2: Send message');
   });
  });

  it('shows messages a user has sent on their messages page @watch', function(){
    makeAndAcceptFriendRequest();
    browser.url('http://localhost:3100/messages');
    browser.waitForExist('#messages-friends-list');
    browser.click('#messages-friends-list .send-message-link');
    browser.waitForExist('#message-input');
    var msg = 'Hello User2';
    browser.setValue('#message-input', msg);
    browser.keys("\uE006"); //press ENTER
    expect(browser.getText('#chat .message:first-child')).to.equal(msg);
  });
});
