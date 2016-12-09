import { Template } from 'meteor/templating';

var currentUser = Meteor.user();

// function currentUser{
//   return Meteor.user();
// }

function isItMe(user){
  return Meteor.user()._id === user._id ? true : false;
}

function isFriend(user){
  var arr = Meteor.user().friendsAsUsers().fetch();
  var ids = arr.map(function(usr) {
    return usr._id;
  });
  return ids.includes(user._id) ? true : false;
}

function isRequestedFriend(user) {
    return Meteor.user().hasRequestFrom(user) || user.hasRequestFrom(Meteor.user()) ? true : false;
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
      return Meteor.user().numRequests() === 0 ? false : true;
  }
});

Template.displayFriends.helpers({
    hasPendingRequests: function() {
        return Meteor.user().numPendingRequests() === 0 ? false : true;
    },
    hasFriends: function() {
        console.log(Meteor.user().friends());
        return Meteor.user().friends().count() === 0 ? false : true;
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
