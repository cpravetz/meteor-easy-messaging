import { Meteor } from 'meteor/meteor';
import { Conversation, Participant, Message } from 'meteor/socialize:messaging';
import { MessagesCollection, ParticipantsCollection, ConversationsCollection } from 'meteor/socialize:messaging';

Meteor.publishComposite("conversationsList", function() {
  if (!this.userId) {
    return this.ready();
  }

  return {
    find() {
      return ConversationsCollection.find({
        _participants: this.userId
      });
    },
    children: [
      {
        find(conversation) {
          return MessagesCollection.find({
            conversationId: conversation._id
          }, {
            sort: { date: -1 },
            limit: 1
          });
        }
      },
      {
        find(conversation) {
          return Meteor.users.find({
            _id: {$in: conversation._participants }
          }, {
            // fields: {
            //   username: 1,
            //   status: 1
            // }
          });
        },
        children: [
          {
            find(user, conversation) {
              return ParticipantsCollection.find({
                userId: user._id
              });
            }
          }
        ]
      }
    ]
  };
});

// publish a conversation
Meteor.publish("conversation", function(conversationId) {
  check(conversationId, String);

  if (!this.userId) {
    return this.ready();
  }

  return MessagesCollection.find({
    conversationId: conversationId
  }, {
    limit: 1
  });
});

Meteor.publishComposite("conversationParticipants", function(conversationId) {
  check(conversationId, String);

  if (!this.userId) {
    return this.ready();
  }

  return {
    find: function() {
      return ConversationsCollection.find({
        _id: conversationId
      });
    },
    children: [
      {
        find: function(conversation) {
          return Meteor.users.find({
            _id: {$in: conversation._participants }
          }, {
            // fields: { username: 1 }
          });

        },
        children: [
          {
            find: function(user, conversation) {
              return ParticipantsCollection.find({
                userId: user._id
              });
            }
          }
        ]
      }
    ]
  };
});
