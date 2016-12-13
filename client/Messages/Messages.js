import { Template } from 'meteor/templating';

Template.displayMessagesFriends.helpers({
    hasFriends: function() {
        return Meteor.user().friends().count() === 0 ? false : true;
    }
});
