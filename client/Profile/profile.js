Template.profileDetails.helpers({
  userInfo: function(){
    var userId = getUserId();
    var user = Meteor.users.findOne({_id: userId})
    return user
  },

  userPlaylists: function(){
    var userId = getUserId();
    var playlists = Playlists.find({userId: userId}).fetch();
    return playlists
  },

  userImage: function(){
    var userId = getUserId();
    var user = Meteor.users.findOne(userId);
    if (user.profile.images.length > 0) {
      var image = user.profile.images[0].url
      return image
    }
  }
});

Template.addSpotifyId.events({
  'click #add-spotify-link'(event){
   event.preventDefault();
   document.getElementById('spotify-id').style='display: unset';
 },
  'click #add-spotify-account'(event){
   event.preventDefault();
   var spotifyId = document.getElementById("addSpotifyId").value;
   Meteor.call('setSpotifyId', spotifyId)
   FlowRouter.go("/login");
   console.log(Meteor.user().services.spotify.id);
  }
});

function getUserId(){
  if (FlowRouter._current.params.id) {
    return FlowRouter._current.params.id
  } else {
    return Meteor.userId();
  }
}
