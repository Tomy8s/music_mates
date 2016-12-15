import { Template } from 'meteor/templating';

Template.Friends.onRendered(function(){
  Meteor.subscribe('requests');
  Meteor.subscribe('outgoingRequests');
  Meteor.subscribe('users');
  Meteor.subscribe('friends');
})

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
    // console.log(Meteor.user().friends());
    return Meteor.user().friends().count() === 0 ? false : true;
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
  }

});
