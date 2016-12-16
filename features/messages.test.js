import { signUp, signIn, signOut, login, cleanDatabase, createAccount, makeAndAcceptFriendRequest } from './testHelpers.test'

describe('Messages', function(){

    context('No messages', function(){

    beforeEach(function() {
      cleanDatabase();
    });

    it('displays a message if you have no converstations', function(){
      signUp('user', 'email@email.com', 'password');
      browser.url('http://localhost:3100/messages');
      browser.pause(200);
      expect(browser.getText('#messages-list')).to.equal('You currently have no conversations.');
    });

    it('displays a list of your friends on the page', function(){
      makeAndAcceptFriendRequest();
      browser.url('http://localhost:3100/messages');
      browser.pause(200);
      expect(browser.getText('#messages-friends-list')).to.equal('user2');
    });
  });

  context('Message sent', function(){
    beforeEach(function(){
      makeAndAcceptFriendRequest();
      browser.url('http://localhost:3100/messages');
      browser.waitForExist('ul#messages-friends-list .start-chat-link', 3000);
      browser.click('ul#messages-friends-list .start-chat-link');
      browser.waitForExist('#message-input');
      browser.setValue('#message-input', 'Hello User2');
      browser.click("#submit-message");
    });

    it('shows the message on senders messages page @watch', function(){
      expect(browser.getText('#chat p:first-child')).to.equal('user: Hello User2');
    });

    it('shows the message a receivers messages page', function(){
      signOut();
      signIn('user2', 'password');
      browser.pause(500);
      browser.url('http://localhost:3100/messages');
      browser.waitForExist('ul#messages-friends-list .start-chat-link', 3000);
      browser.click('ul#messages-friends-list .start-chat-link');
      browser.waitForExist('#chat p:first-child', 3000);
      expect(browser.getText('#chat p:first-child')).to.equal('user: Hello User2');
    });
  });
});
