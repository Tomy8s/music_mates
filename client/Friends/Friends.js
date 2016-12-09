import { Template } from 'meteor/templating';

function currentUser(){
  return Meteor.user();
}

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
