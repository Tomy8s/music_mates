Template.Tracks.onRendered(function(){
  Meteor.subscribe('tracks');
})


Template.Tracks.helpers({
  tracks: function(){
    var playlistId = FlowRouter._current.params.id
    var tracks = Tracks.find({playlistId: playlistId})
    return tracks
  },
  artists: function(){
    var track = Tracks.findOne(this._id)
    var artistNames = []
    track.artists.forEach( function(artist){
      artistNames.push(artist.name);
    })
    var artists = artistNames.join(", ")
    return artists
  }
});

Template.player.helpers({
  playerId: function(){
    var playlist = FlowRouter._current.params.id
    var spotifyPlayer = Playlists.findOne({ _id: playlist});
    return spotifyPlayer;
  }
});
