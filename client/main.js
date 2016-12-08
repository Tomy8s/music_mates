import '../imports/accounts-config.js';
import { Template } from 'meteor/templating';

Template.registerHelper( 'userName', ( user ) => {
  if(user.username) {
      return user.username
  } else if(user.profile.display_name != null){
      return user.profile.display_name
  } else {
    return user.profile.id
  }
});
