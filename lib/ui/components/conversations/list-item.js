import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import SimpleSchema from 'simpl-schema';

import './list-item.html';
import './list-item.css';

Template.ConversationListItem.onCreated(function() {

/* TODO Figure out what this was supposed to be - CMP
  this.autorun(() => {
    new SimpleSchema({
      conversation: { type: Conversation },
    }).validate(Template.currentData());
  });
*/
});

Template.ConversationListItem.helpers({
  participant() {
    const instance = Template.instance();
    const participant = instance.data.conversation.participants().fetch()[0];
    return participant;
  },
  lastMessage() {
    const instance = Template.instance();
    return instance.data.conversation.lastMessage() && instance.data.conversation.lastMessage().body || "No Message";
  }
});

Template.ConversationListItem.events({
  'click .js-archive'(event, instance) {
    event.stopPropagation();
    instance.data.conversation.toggleArchived();
  },
  'click .js-star'(event, instance) {
    event.stopPropagation();
    instance.data.conversation.toggleStarred();
  }
});
