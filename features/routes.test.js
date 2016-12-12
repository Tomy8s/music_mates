import { signUp, signIn, signOut,login, cleanDatabase, createAccount } from './testHelpers.test'

describe('Menu links', function() {
  context('not logged in', function() {
    it('redirects a user to the homepage', function(){
      server.call('logout');
      cleanDatabase();
      browser.url('http://localhost:3100/myPlaylists');
      browser.waitForExist('#home_header', 5000);
      expect(browser.getUrl()).to.equal('http://localhost:3100/');
    });
  });

  context('logged in', function() {

    describe('Flow router', function() {
      beforeEach(function() {
        cleanDatabase();
        signUp('user', 'email@email.com', 'password');
      });

      it('changes url to myPlaylists on click', function(){
        browser.url('http://localhost:3100/discover');
        browser.waitForExist('#myPlaylists', 5000);
        browser.click('#myPlaylists');
        expect(browser.getUrl()).to.equal('http://localhost:3100/myPlaylists')
      });

      it('changes url to discover on click', function(){
        browser.url('http://localhost:3100/myPlaylists');
        browser.waitForExist('#myPlaylists', 5000);
        browser.click('#discover');
        expect(browser.getUrl()).to.equal('http://localhost:3100/discover')
      });

      it('changes url to messages on click', function(){
        browser.url('http://localhost:3100/discover');
        browser.waitForExist('#myPlaylists', 5000);
        browser.click('#messages');
        expect(browser.getUrl()).to.equal('http://localhost:3100/messages')
      });

      it('changes url to friends on click', function(){
        browser.url('http://localhost:3100/discover');
        browser.waitForExist('#myPlaylists', 5000);
        browser.click('#friends');
        expect(browser.getUrl()).to.equal('http://localhost:3100/friends')
      });
    });
  });
});
