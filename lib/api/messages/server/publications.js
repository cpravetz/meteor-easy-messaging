import { Meteor } from 'meteor/meteor';
import { Message } from 'meteor/socialize:messaging';
import { Counts } from 'meteor/tmeasday:publish-counts';
import { MessagesCollection, ParticipantsCollection, ConversationsCollection } from 'meteor/socialize:messaging';

//publish unread messages count
Meteor.publish('unreadMessagesCount', function() {
  Counts.publish(this, 'unread-messages-count', ParticipantsCollection.find({userId:this.userId, read:false}));
});

Meteor.publish("conversationMessages", function(conversationId){
  if (!this.userId) {
    return this.ready();
  }

  return MessagesCollection.find({
    conversationId: conversationId
  });
});
