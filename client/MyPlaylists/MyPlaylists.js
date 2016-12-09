import { SpotifyWebApi } from 'meteor/xinranxiao:spotify-web-api';

Template.MyPlaylists.events({
  'click #import_playlists'(event){
    Meteor.call('getPlaylists', function(error, returnedPlaylists) {
      Meteor.call('insertPlaylists', returnedPlaylists, function(error, playlists){
        playlists.forEach(function(playlist){
          Meteor.call('findTracks', playlist._id)
        });
      });
    })
  },
  'click .playlist'(event){
    FlowRouter.go(`/playlist/${this._id}`)
  }
});

Template.MyPlaylists.helpers({
  'playlists'(){
    return Playlists.find({userId: Meteor.userId()});
  }
})
