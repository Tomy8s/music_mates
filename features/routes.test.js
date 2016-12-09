describe('Menu links', function() {

  describe('Flow router', function() {
   it('changes url to myPlaylists on click', function(){
     browser.url('http://localhost:3100/discover');
     browser.click('#myPlaylists');
     expect(browser.getUrl()).to.equal('http://localhost:3100/myPlaylists')
   });

   it('changes url to discover on click', function(){
     browser.click('#discover');
     expect(browser.getUrl()).to.equal('http://localhost:3100/discover')
   });

   it('changes url to messages on click', function(){
     browser.click('#messages');
     expect(browser.getUrl()).to.equal('http://localhost:3100/messages')
   });

   it('changes url to friends on click', function(){
     browser.click('#friends');
     expect(browser.getUrl()).to.equal('http://localhost:3100/friends')
   });
  });
});
