// import { createAccount, login, cleanDatabase, signUp } from './testHelpers.test';
// var mockPlaylists;
// var mockTracks = [];
//
// describe('playlists feature', function(){
//
//   beforeEach(function() {
//     cleanDatabase();
//     signUp('user', 'email@email.com', 'password');
//
//     var playlist1 = {
//       id : "0llTa7PJYUhfWIgXDSH7JQ",
//       name : "Easy Christmas",
//       owner : {
//         id: 'spotify_uk_'
//       },
//       tracks : {
//         total: 10
//       }
//     }
//     var playlist2 = {
//       id : "5VFot6leVggvLwCgDBqZWJ",
//       name : "roof",
//       owner : {
//         id: 'tadasmajeris'
//       },
//       tracks : {
//         total: 100
//       }
//     }
//     var trackObj = {};
//     trackObj.track = {
//       name : "Barbie Girl",
//       artists : [
//         {name : "Aqua",
//         id : "asdkfjhakfdjvbakdfjvn"}
//       ],
//       id : "ds7dsh84t4aef"
//     }
//
//     mockTracks = [trackObj];
//     mockPlaylists = [playlist1, playlist2];
//
//     server.execute(function(mockPlaylists) {
//       Meteor.call('insertPlaylists', mockPlaylists);
//     }, mockPlaylists);
//   });
//
//   describe('#insertPlaylists', function(){
//     it('should insert the playlists to the database', function(){
//
//       browser.url('http://localhost:3100/myPlaylists');
//       browser.waitForExist('#playlists_list');
//       var text = browser.getText('#playlists_list li:first-child');
//       expect(text).to.equal('Easy Christmas - 10 tracks');
//
//       // text = browser.getText('#playlists_list li:last-child');
//       // expect(text).to.equal('roof - 100 tracks');
//     })
//   });
//
//   context('inserting tracks', function(){
//     beforeEach( function() {
//       var playlist = server.execute(function() {
//         return Playlists.findOne({name: "Easy Christmas"});
//       });
//       server.execute(function(tracks, id){
//         Meteor.call('insertTracks', tracks, id);
//       }, mockTracks, playlist._id);
//       browser.url('http://localhost:3100/myPlaylists');
//       browser.waitForExist('#playlists_list a:first-child', 10000);
//       browser.click('#playlists_list a:first-child');
//     });
//
//     it('should insert a track into a playlist', function(){
//       var text = browser.getText('#container li:first-child');
//       expect(text).to.equal('Aqua - Barbie Girl');
//     });
//
//     it('should have a link back to \'myPlaylists\'', function() {
//       browser.click('#back-to-playlist-link');
//       expect(browser.getUrl()).to.equal('http://localhost:3100/myPlaylists');
//     });
//   });
// });
