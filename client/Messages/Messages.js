import { Template } from 'meteor/templating';

Template.messages.helpers({
    hasFriends: function() {
        // console.log(Meteor.user().friends());
        return Meteor.user().friends().count() === 0 ? false : true;
    }
});
