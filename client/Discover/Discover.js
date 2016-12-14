import { Template } from 'meteor/templating';

function currentUser(){
  return Meteor.user();
}

function isFriend(user){
  var arr = currentUser().friendsAsUsers().fetch();
  var ids = arr.map(function(usr) {
    return usr._id;
  });
  return ids.includes(user._id) ? true : false;
}

function isRequestedFriend(user) {
  return currentUser().hasRequestFrom(user) || user.hasRequestFrom(currentUser()) ? true : false;
}


function getCompatibility(user){
  var myTracks = Meteor.user().tracks;
  var commonTrax = commonTracks(user);
  var result = (commonTrax.length * 100) / myTracks.length;
  result = result ? Math.ceil(result) : 0
  return result;
}

function commonTracks(user) {
  var commonTrax = _.intersection(user.tracks, Meteor.user().tracks);
  return commonTrax
}

Template.suggestedFriends.helpers({
  compatibleUsers: function(){
    var allExceptMe = Meteor.users.find( { _id: {$ne: Meteor.userId()} } ).fetch();
    if (!Meteor.user().tracks) {
      return allExceptMe;
    } else {
      var compatibleMates = _.sortBy(allExceptMe, function(user) { return getCompatibility(user) * -1 });
      return compatibleMates;
    }
  },

  compatibility: function(user){
    var percentage = getCompatibility(user)
    return percentage
  },

  commonTracksCount: function(user){
    return commonTracks(user).length
 },

  isFriend: function(user){
    return isFriend(user) || isRequestedFriend(user) ? true : false;
  },

  userHasTracks: function(){
    return Meteor.user().tracks.length > 0
  }
});


Template.Discover.events({
  'click #friend-request-btn'(event) {
    event.preventDefault();
    var user = Meteor.users.findOne(this._id);
    var request = user.requestFriendship();
  },
})

if (Meteor.isClient) {
  Template.discoverPlaylists.onCreated(function() {
    var self = this;
    self.resources = new ReactiveVar(null);
    Meteor.call("getLatestPlaylists", function(error, r) {
      if (!error) {
        self.resources.set(r);
      } else {
         console.log(error);
      }
    });
  });

  Template.discoverPlaylists.helpers({
    getTrendingPlaylists: function () {
      var self = Template.instance();
      var thing = self.resources.get()
      var returnArray = []
      thing.forEach(function(element){
        returnArray.push({name: element.name, url: element.images[0].url, ownerId: element.owner.id, id: element.id});
      });
      console.log(returnArray)
      return returnArray
    }
  });
}
Template.discoverPlaylists.events({
  'click .playlist'(event){
    FlowRouter.go(`/playlist/${this.id}`);
  }
});
