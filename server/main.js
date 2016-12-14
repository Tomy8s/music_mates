import { Meteor } from 'meteor/meteor';
import { SpotifyWebApi } from 'meteor/xinranxiao:spotify-web-api';

Meteor.publish(null, function() {
  return Meteor.users.find({}, {fields : {tracks : 1, activeConversation: 1}});
}, {is_auto:true});

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
    var response = spotifyApi.getUserPlaylists(Meteor.user().services.spotify.id, {limit: 50})

    if (checkTokenRefreshed(response, spotifyApi)) {
      var response = spotifyApi.getUserPlaylists(Meteor.user().services.spotify.id, {limit: 50})
    }
    return response.data.body.items
  },

  insertPlaylists: function(newPlaylists){
    // console.log(newPlaylists);
    newPlaylists.forEach(function(playlist){
      var existingPlaylist = Playlists.findOne({userId: Meteor.userId(), spotifyId: playlist.id});
      if (existingPlaylist){
        Meteor.call('updatePlaylist', existingPlaylist._id, playlist);
      } else {
        var playlistId = Playlists.insert({
          userId: Meteor.userId(),
          spotifyId: playlist.id,
          name: playlist.name,
          trackCount: playlist.tracks.total,
          ownerId: playlist.owner.id,
        });
        // Meteor.call('findTracks', playlistId)
      }
    });
    var usersPlaylists = Playlists.find({userId: Meteor.userId()}).fetch();
    // console.log(userPlaylists);
    return usersPlaylists
  },

  findTracks: function (playlistId) {
    var playlist = Playlists.findOne(playlistId)
    var spotifyApi = new SpotifyWebApi()
    var response = spotifyApi.getPlaylistTracks(playlist.ownerId, playlist.spotifyId, {})
    if (checkTokenRefreshed(response, spotifyApi)) {
      var response = spotifyApi.getPlaylistTracks(playlist.ownerId, playlist.spotifyId, {})
    }
    var trackObjects = response.data.body.items
    Meteor.call('insertTracks', trackObjects, playlistId)
  },

  insertTracks: function (trackObjects, playlistId) {
    trackObjects.forEach(function(trackObject){
      // console.log(trackObject);
      var track = trackObject.track;
      var artistObjects = []
      track.artists.forEach(function(artist){
        artistObjects.push({name: artist.name, spotifyId: artist.id})
      });

      // if track already exists in the database
      if(Tracks.findOne({userId: Meteor.userId(), playlistId: playlistId, spotifyId: track.id})){
        return;
      } else {
        var trackId = Tracks.insert({
          userId: Meteor.userId(),
          name: track.name,
          artists: artistObjects,
          spotifyId: track.id,
          playlistId: playlistId,
        });

        // add track to user.tracks array
        Meteor.users.update(Meteor.userId(), {$push: {tracks: track.id} });
        // console.log(Meteor.user());
      }
    });

    Meteor.call('removeDeletedTracks', trackObjects, playlistId);
  },

  updatePlaylist: function(playlistId, spotifyPlaylist){
    Playlists.update(playlistId, {$set:{
      trackCount: spotifyPlaylist.tracks.total
    }});

    Meteor.call('findTracks', playlistId)
  },

  // deletes tracks from database if they were removed in Spotify
  removeDeletedTracks: function(trackObjects, playlistId) {
    var spotifyTracksIds = [];
    trackObjects.forEach(function(trackObj){
      spotifyTracksIds.push(trackObj.track.id);
    });

    var tracks = Tracks.find({playlistId: playlistId}).fetch();
    var trackIdsInDatabase = [];
    tracks.forEach(function(track){
      trackIdsInDatabase.push(track.spotifyId);
    });

    var deletedTracksIds = _.difference(trackIdsInDatabase, spotifyTracksIds);

    deletedTracksIds.forEach(function(id){
      Tracks.remove({playlistId: playlistId, spotifyId: id});

      // remove track trom user.tracks array
      Meteor.users.update(Meteor.userId(), {$pull: {tracks: id} });
    })
  },

  getUsersTracks: function(userId) {
    return Meteor.users.findOne(userId).tracks
  },

  setActiveConversation: function(id) {
    Meteor.users.update(Meteor.userId(), {$set: {activeConversation: id}});
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
