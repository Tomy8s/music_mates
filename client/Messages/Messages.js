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
    Session.set('conversationId', newConversation._id);
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
    conversationId: function(){
      return Session.get('conversationId', this._id);
    }
});

 Template.currentConversations.events({
   'click #submit-message': function(event) {
    var conversationId = $('#submit-message').val();
		var body = $("#message-input").val();
    var conversation = Meteor.conversations.findOne(conversationId); 
    console.log(body)
		conversation.sendMessage(body);
	}
});
