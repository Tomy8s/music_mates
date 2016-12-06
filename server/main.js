import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  ServiceConfiguration.configurations.update(
    { "service": "spotify" },
    {
      $set: {
        "clientId": Meteor.settings.spotifyClientId,
        "secret": Meteor.settings.spotifySecret
      }
    },
    { upsert: true }
  );
});
