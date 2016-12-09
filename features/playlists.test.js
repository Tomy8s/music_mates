import { createAccount, login, cleanDatabase } from './testHelpers.test';
var mockPlaylists;

describe('playlists feature @watch', function(){

  beforeEach(function() {
    cleanDatabase();
    createAccount('user', 'email@email.com', 'password');
    login('user', 'password');

    var playlist1 = {
      id : "0llTa7PJYUhfWIgXDSH7JQ",
      name : "Easy Christmas",
      owner : {
        id: 'spotify_uk_'
      },
      tracks : {
        total: 10
      }
    }
    var playlist2 = {
      id : "5VFot6leVggvLwCgDBqZWJ",
      name : "roof",
      owner : {
        id: 'tadasmajeris'
      },
      tracks : {
        total: 100
      }
    }
    mockPlaylists = [playlist1, playlist2];
  });

  describe('#insertPlaylists', function(){
    it('should insert the playlists to the database', function(){

      server.execute(function(mockPlaylists) {
        Meteor.call('insertPlaylists', mockPlaylists);
      }, mockPlaylists);

      browser.url('http://localhost:3100/myPlaylists');
      browser.waitForExist('#playlists_list');
      var text = browser.getText('#playlists_list li:first-child');
      expect(text).to.equal('Easy Christmas - 10 tracks');

      text = browser.getText('#playlists_list li:last-child');
      expect(text).to.equal('roof - 100 tracks');
    })
  });
});
