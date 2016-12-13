import { signUp, signIn, signOut,login, cleanDatabase, createAccount } from './testHelpers.test'

describe('Messages @watch', function(){

  beforeEach(function() {
    cleanDatabase();
    signUp('user', 'email@email.com', 'password');
  });

  describe('No messages', function(){
   it('displays a message if you have no converstations', function(){
   browser.url('http://localhost:3100/messages');
   browser.pause(200)
   expect(browser.getText('#message-list')).to.equal('You currently have no conversations.');
   });
  });

});
