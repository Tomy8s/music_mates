import { Template } from 'meteor/templating';

Template.displayMessagesFriends.helpers({
    hasFriends: function() {
      if (Meteor.user()) {
        return Meteor.user().friends().count() === 0 ? false : true;
      }
    }
});

Template.displayMessagesFriends.events({
  'click .start-chat-link'(event){
    var conversationFriend = Meteor.users.findOne(this.friendId);
    var query = { _participants: {$all: [Meteor.userId(), this.friendId]} };
    var conversation = Meteor.conversations.findOne(query);
    if (!conversation) {
      conversation = new Conversation().save();
      conversation.addParticipant(conversationFriend);
    }
    Meteor.call('setActiveConversation', conversation._id);
    // Session.set('conversationId', conversation._id);
    $("#chat").scrollTop(400);
  }
});

Template.currentConversations.helpers({
  chatActive: function() {
    return true;
  },
  displayMessages: function(conversationId){
    return Meteor.messages.find({conversationId:conversationId});
  },
  conversationId: function(){
    var id = this.activeConversation;
    if (id) {
      return id
    }
  },
  scrollToTop: function(){
    $("#chat").scrollTop(400);
  }
});

 Template.currentConversations.events({
   'submit #chat-form': function(event) {
    event.preventDefault();
    var conversationId = $('#submit-message').val();
    var input = $("#message-input");
		var body = input.val();
    var conversation = Meteor.conversations.findOne(conversationId);
		conversation.sendMessage(body);
    $("#chat").scrollTop(400);
    input.val('');
	}
});
