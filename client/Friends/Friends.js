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
  // var ids = currentUser().friends().find({friendId: user._id}).fetch();
  return ids.includes(user._id) ? true : false;
}

function isRequestedFriend(user) {
    return currentUser().hasRequestFrom(user) || user.hasRequestFrom(currentUser()) ? true : false;
}

Template.suggestedFriends.helpers({
  AllUsers: function(){
      return Meteor.users.find();
  },

  isMeOrFriend(user){
    return isItMe(user) || isFriend(user) || isRequestedFriend(user) ? true : false;
  }
});

Template.friendRequests.helpers({
  hasRequests:function(){
      return currentUser().numRequests() === 0 ? false : true;
  }
});

Template.displayFriends.helpers({
    hasPendingRequests: function() {
        return currentUser().numPendingRequests() === 0 ? false : true;
    },
    hasFriends: function() {
        return currentUser().numFriends() === 0 ? false : true;
    }
});

Template.Friends.events({
  'click #friend-request-btn'(event) {
    event.preventDefault();
    var user = Meteor.users.findOne(this._id);
    var request = user.requestFriendship();
  },
  'click [data-action=accept]': function() {
      this.accept();
  },
  'click [data-action=cancel]': function() {
      this.cancel();
  },
  'click [data-action=unfriend]': function() {
      user = Meteor.users.findOne({_id: this.friendId});
      user.unfriend();
  }

});
