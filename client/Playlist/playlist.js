Template.Tracks.rendered = function(){
};

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
})
