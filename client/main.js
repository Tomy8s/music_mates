import '../imports/accounts-config.js';
import { Template } from 'meteor/templating';

Template.registerHelper( 'userName', ( user ) => {
  if(user.username) {
      return user.username
  } else {
      return user.profile.id
  }
});
