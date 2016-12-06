import { Template } from 'meteor/templating';

Template.Friends.helpers({
  userList() {
    return Meteor.users.find();
  }
});

Template.Friends.events({
  'click #friend-request-btn'(event) {
    event.preventDefault();
    var currentUser = Meteor.user();
    var user = Meteor.users.findOne(currentUser);
    var request = user.requestFriendship();
  },
  'click [data-action=accept]': function() {
      //assumes context is a instance of a user
      this.accept();
  },

  'click [data-action=ignore]': function() {
      //assumes context is a instance of a user
      this.ignore();
  },

  'click [data-action=deny]': function() {
      //assumes context is a instance of a user
      this.deny();
  },

});
