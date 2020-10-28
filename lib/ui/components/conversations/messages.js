import { Template } from 'meteor/templating';
import { MessagesCollection } from 'meteor/socialize:messaging';
import SimpleSchema from 'simpl-schema';

import './messages.css';
import './messages.html';

Template.ConversationMessages.onCreated(function() {

  this.getConversationId = () => Template.currentData().conversationId;
  // TODO:
  // this.getConversationId = () => this.data.conversationId;

  this.autorun(() => {
/*
    new SimpleSchema({
      conversationId: { type: String },
      ascending: { type: Boolean, optional: true },
      decending: { type: Boolean, optional: true },
    }).validate(Template.currentData());
*/
    this.subscribe('conversationMessages', this.getConversationId());
    this.subscribe('viewingConversation', this.getConversationId());
  });

  this.getConversationMessages = () => {
    if(this.data.ascending) {
      return MessagesCollection.find({
        conversationId: this.getConversationId()
      }, {
        sort: {
          date: 1
        }
      });
    }
    else {
      return MessagesCollection.find({
        conversationId: this.getConversationId()
      }, {
        sort: {
          date: -1
        }
      });
    }
  }
});


Template.ConversationMessages.helpers({
  messages() {
    const instance = Template.instance();
    return instance.getConversationMessages();
  }
});

Template.ConversationMessages.events({

});
