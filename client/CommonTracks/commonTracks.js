Template.CommonTracks.helpers({

  tracks: function(){
    var userId = FlowRouter._current.params.userId;
    var user = Meteor.users.findOne(userId);
    var commonTrax = _.intersection(user.tracks, Meteor.user().tracks);
    var tracks = Tracks.find( {$and: [{spotifyId: {$all: commonTrax}}, {userId: user._id}]} ).fetch();
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
