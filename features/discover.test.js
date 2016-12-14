import { signUp, signIn, signOut, cleanDatabase } from './testHelpers.test'

describe('Discover', function(){

 describe('suggested friends', function(){
  it('shows list of suggested friends @watch', function(){
      server.call('logout');
      cleanDatabase();
      signUp('discoverTester1', 'discover1@test.com', 'testpassword');
      signOut();
      signUp('discoverTester2', 'discover2@test.com', 'testpassword');
      browser.url('http://localhost:3100/discover')
      browser.waitForExist('#friend-request-btn', 5000);
      expect(browser.getText('#friend-request-btn')).to.equal('Follow')
  });
  it('removes from suggested friends on click', function(){
      browser.click('#friend-request-btn')
      var doesNotExist = browser.waitForExist('#friend-request-btn', undefined, true)
      expect(doesNotExist).to.equal(true);
      cleanDatabase()
  });
 });

});
