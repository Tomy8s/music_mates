import { SpotifyWebApi } from 'meteor/xinranxiao:spotify-web-api';

Template.MyPlaylists.events({
  'click #import'(event){
    Meteor.call('getPlaylists', function (error, result) {
      console.log(error);
      console.log(result);
    })
  }
});
