import { Template } from 'meteor/templating';

function currentUser(){
  return Meteor.user();
}

function isItMe(user){
  return currentUser()._id === user._id ? true : false;
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

function sortByCompatibility(users){
  return users
}


Template.suggestedFriends.helpers({
  AllUsers: function(){
    var allUsers = Meteor.users.find();
    return sortByCompatibility(allUsers);
  },

  compatibility: function(user){
    var percentage = getCompatibility(user)
    return percentage
  },

  commonTracksCount: function(user){
    return commonTracks(user).length
 },

  isMeOrFriend: function(user){
    return isItMe(user) || isFriend(user) || isRequestedFriend(user) ? true : false;
  }
});


Template.Discover.events({
  'click #friend-request-btn'(event) {
    event.preventDefault();
    var user = Meteor.users.findOne(this._id);
    var request = user.requestFriendship();
  },
})
