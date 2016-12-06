import { Template } from 'meteor/templating';

Template.Friends.helpers({
  userList() {
    return Meteor.users.find();
  }
});

Template.Friends.events({
  'click #friend-request-btn'(event) {
    // Prevent default browser form submit
    event.preventDefault();
    var user = Meteor.users.findOne('gZvLG2GeXcmausJqT')

    var request = user.requestFriendship();

    // var requester = request.requester();
    // console.log(requester)
    // Meteor.call('tasks.insert', text);

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
