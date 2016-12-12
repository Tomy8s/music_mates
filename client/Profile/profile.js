Template.Profile.rendered = function(){
};


Template.profileDetails.helpers({
  userInfo: function(){
    var userId = FlowRouter._current.params.id
    var user = Meteor.users.findOne({_id: userId})
    return user
  },
  userPlaylists: function(){
    var userId = FlowRouter._current.params.id
    var playlists = Playlists.find({userId: userId}).fetch();
    return playlists
  },
  userImage: function(){
    var userId = FlowRouter._current.params.id
    var user = Meteor.users.findOne({_id: userId})
    var image = user.profile.images[0].url
    return image
  }
});
