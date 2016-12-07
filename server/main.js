import { Meteor } from 'meteor/meteor';
import { SpotifyWebApi } from 'meteor/xinranxiao:spotify-web-api';

Meteor.startup(() => {
  ServiceConfiguration.configurations.update(
    { "service": "spotify" },
    {
      $set: {
        "clientId": Meteor.settings.spotifyClientId,
        "secret": Meteor.settings.spotifySecret
      }
    },
    { upsert: true }
  );
});

Meteor.methods({
  getPlaylists: function() {
    var spotifyApi = new SpotifyWebApi()
    var response = spotifyApi.getUserPlaylists(Meteor.user().services.spotify.id, {})

    if (checkTokenRefreshed(response, spotifyApi)) {
      var response = spotifyApi.getUserPlaylists(Meteor.user().services.spotify.id, {})
    }
    return response.data.body.items
  }
});

var checkTokenRefreshed = function(response, api) {
  if (response.error && response.error.statusCode === 401) {
    api.refreshAndUpdateAccessToken();
    return true;
  } else {
    return false;
  }
};
