import { Template } from 'meteor/templating';

Template.Friends.onRendered(function(){
  Meteor.subscribe('requests');
  Meteor.subscribe('outgoingRequests');
  Meteor.subscribe('users');
  Meteor.subscribe('friends');
  Meteor.subscribe('tracks');
})

Template.friendRequests.helpers({
  hasRequests:function(){
    return Meteor.user().numRequests() === 0 ? false : true;
  },
  hasPendingRequests: function() {
    return Meteor.user().numPendingRequests() === 0 ? false : true;
  },
});

Template.displayFriends.helpers({
  hasFriends: function() {
    return Meteor.user().friends().count() === 0 ? false : true;
  },
  userHasTracks: function(){
    console.log('hi');
    if (Meteor.user().tracks) {
      return Meteor.user().tracks.length > 0
    }
  }
});

Template.Friends.events({
  'click .friend-request-btn'(event) {
    event.preventDefault();
    var user = Meteor.users.findOne(this._id);
    var request = user.requestFriendship();
  },
  'click [data-action=accept]': function() {
      this.accept();
  },
  'click [data-action=cancel]': function() {
      Meteor.call('cancelRequest', this._id);
  },
  'click [data-action=unfriend]': function() {
      user = Meteor.users.findOne({_id: this.friendId});
      user.unfriend();
  },
});

Template.showFriendCompatibility.helpers({
  compatibility: function(user){
    var percentage = getCompatibility(user)
    return percentage
  },
  commonTracksCount: function(userId){
    return commonTracks(userId).length
 },
});

function getCompatibility(user){
  var myTracks = Meteor.user().tracks;
  var commonTrax = commonTracks(user);
  var result = (commonTrax.length * 100) / myTracks.length;
  result = result ? Math.ceil(result) : 0
  return result;
}

function commonTracks(userId) {
  var user = Meteor.users.findOne(userId);
  var commonTrax = _.intersection(user.tracks, Meteor.user().tracks);
  return commonTrax
}
