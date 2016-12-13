import { signUp, signIn, signOut,login, cleanDatabase, createAccount } from './testHelpers.test'

describe('Messages', function(){

  beforeEach(function() {
    cleanDatabase();
    signUp('user', 'email@email.com', 'password');
  });

  describe('No messages', function(){
   it('displays a message if you have no converstations', function(){
     browser.url('http://localhost:3100/messages');
     browser.pause(200)
     expect(browser.getText('#messages-list')).to.equal('You currently have no conversations.');
   });

   it('displays a list of your friends on the page @watch', function(){
     signOut();
     signUp('user2', 'email2@email.com', 'password');
     browser.waitForExist('#friend-request-btn', 5000);
     browser.click('#friend-request-btn');
     signOut();
     signIn('user', 'password');
     browser.pause(200);
     browser.url('http://localhost:3100/friends');
     browser.waitForExist('#requests-received-list', 5000);
     browser.click('#requests-received-list .accept-friend-request');
     browser.url('http://localhost:3100/messages')
     browser.pause(200)
     expect(browser.getText('#messages-friends-list')).to.equal('user2: Send message');
   });
  });

});
