Package.describe({
  name: 'seakaytee:easy-messaging',
  version: '0.3.2',
  summary: 'Built on socialize:messaging, provide full messaging kit',
  git: 'https://github.com/cpravetz/easy-messaging.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.3');
  api.use(['ecmascript', 'check', 'underscore', 'templating', 'reactive-dict']);
  api.use([
    'socialize:messaging',
    'socialize:user-model',
    'socialize:user-presence',
    'reywood:publish-composite',
    'tmeasday:publish-counts',
  ]);

  api.mainModule('server.js', 'server');
  api.mainModule('client.js', 'client');

  api.export([
    'Conversation',
    'Participant',
    'Message',
    'User'
  ]);
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('seakaytee:easy-messaging');
  api.mainModule('tests/easy-messaging-tests.js');
});
