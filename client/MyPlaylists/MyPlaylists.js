import { SpotifyWebApi } from 'meteor/xinranxiao:spotify-web-api';

Template.MyPlaylists.events({
  'click #import_playlists'(event){
    Meteor.call('getPlaylists', function(error, result) {
      Meteor.call('insertPlaylists', result);
    })
  }
});

Template.MyPlaylists.helpers({
  'playlists'(){
    return Playlists.find({userId: Meteor.userId()});
  }
})
