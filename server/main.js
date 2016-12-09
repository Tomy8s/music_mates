import { Meteor } from 'meteor/meteor';
import { SpotifyWebApi } from 'meteor/xinranxiao:spotify-web-api';

// Playlists = new Mongo.Collection('playlists');

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
    newPlaylists.forEach(function(playlist){
      if (Playlists.findOne({userId: Meteor.userId(), spotifyId: playlist.id})){
        var existingPlaylist = Playlists.findOne({userId: Meteor.userId(), spotifyId: playlist.id});
        Meteor.call('updatePlaylist', playlist);
      } else {
        var playlistId = Playlists.insert({
          userId: Meteor.userId(),
          spotifyId: playlist.id,
          name: playlist.name,
          trackCount: playlist.tracks.total,
          ownerId: playlist.owner.id,
        });
        Meteor.call('findTracks', playlistId)
      }
    });
    var usersPlaylists = Playlists.find({userId: Meteor.userId()}).fetch();
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
      var track = trackObject.track;
      var artistObjects = []
      track.artists.forEach(function(artist){
        artistObjects.push({name: artist.name, spotifyId: artist.id})
      });
      Tracks.insert({
        userId: Meteor.userId(),
        name: track.name,
        artists: artistObjects,
        spotifyId: track.id,
        playlistId: playlistId,
      });
    });
  },

  updatePlaylist: function(existingPlaylist){
    console.log(existingPlaylist.name)
      Playlists.update({ spotifyId: existingPlaylist.id },{$set:{
      userId: Meteor.userId(),
      spotifyId: existingPlaylist.id,
      name: existingPlaylist.name,
      trackCount: existingPlaylist.tracks.total,
      ownerId: existingPlaylist.owner.id,
    }});
     var playlistId = Playlists.findOne({userId: Meteor.userId(), spotifyId: existingPlaylist.id})
     Meteor.call('getUpdatedTracks', playlistId)
  },

  getUpdatedTracks: function(playlistId){
    var playlist = Playlists.findOne(playlistId)
    var spotifyApi = new SpotifyWebApi()
    var response = spotifyApi.getPlaylistTracks(playlist.ownerId, playlist.spotifyId, {})
    if (checkTokenRefreshed(response, spotifyApi)) {
      var response = spotifyApi.getPlaylistTracks(playlist.ownerId, playlist.spotifyId, {})
    }
    var trackObjects = response.data.body.items
    Meteor.call('updateTracks', trackObjects, playlistId)
  },

  updateTracks: function(trackObjects, playlistId){
    trackObjects.forEach(function(trackObject){
      var track = trackObject.track;
      var artistObjects = []
      track.artists.forEach(function(artist){
        artistObjects.push({name: artist.name, spotifyId: artist.id})
      });
      if(Tracks.findOne({userId: Meteor.userId(), 'playlistId.id': playlistId.id, spotifyId: track.id})){
        return;
      } else {
      Tracks.insert({
        userId: Meteor.userId(),
        name: track.name,
        artists: artistObjects,
        spotifyId: track.id,
        playlistId: playlistId,
      });
     }
    });
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
