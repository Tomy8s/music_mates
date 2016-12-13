import { Template } from 'meteor/templating';

var conversation = Meteor.conversations.findOne(Meteor.user());

Template.displayMessagesFriends.helpers({
    hasFriends: function() {
        return Meteor.user().friends().count() === 0 ? false : true;
    }
});

Template.displayMessagesFriends.events({
  'click .start-chat-link'(event){
    var conversationFriend = Meteor.users.findOne(this.friendId);
    var newConversation = new Conversation().save();
    newConversation.addParticipant(conversationFriend);
    // newConversation.sendMessage("Hello World!");
    Session.set('conversation', newConversation)
    console.log(Session.get('conversation', this))
  }
});

Template.currentConversations.helpers({
   chatActive: function() {
    return true;
   },
   displayMessages: function(conversationId){
      return Meteor.messages.find({
        conversationId:conversationId});
    },
    conversation: function(){
      return Session.get('conversation', this)
    }
});

 Template.currentConversations.events({
   'click #submit-message': function(event) {
    var conversation = Session.get('conversation', this)
		var body = $("#message-input").val();
    console.log(body)
		conversation.sendMessage(body);
	}
});
