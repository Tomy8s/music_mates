import { Template } from 'meteor/templating';

function currentUser(){
  return Meteor.user();
}

function isItMe(user){
  return currentUser()._id === user._id ? true : false;
}

function isFriend(user){
  var arr = currentUser().friendsAsUsers().fetch();
  var ids = arr.map(function(usr) {
    return usr._id;
  });
  // var ids = currentUser().friends().find({friendId: user._id}).fetch();
  return ids.includes(user._id) ? true : false;
}

function isRequestedFriend(user) {
    return currentUser().hasRequestFrom(user) || user.hasRequestFrom(currentUser()) ? true : false;
}

  function array_intersect(a, b){
    var ret = [];
    for(var i in a) {
        if(b.indexOf( a[i] ) > -1){
            ret.push( a[i] );
        }
    }
    return ret;
  }

  function getTracks(user){
    var userTracks = Tracks.find({userId: user._id});
    var userTracksIds = []
    userTracks.forEach( function(track){
      userTracksIds.push(track.spotifyId);
    })
    return userTracksIds
  }

  function get_compatibility(a, b){
    var result = (b * 100) / a;
    return result;
  }

  Template.suggestedFriends.helpers({
    AllUsers: function(){
        return Meteor.users.find();
    },

    compatibility: function(user){
      var myTracksIds = getTracks(currentUser())
      var userTracksIds = getTracks(user);
      var intersection = array_intersect(myTracksIds, userTracksIds);
      var percentage = get_compatibility(myTracksIds.length, intersection.length)
      return Math.ceil(percentage)
    },

    isMeOrFriend: function(user){
      return isItMe(user) || isFriend(user) || isRequestedFriend(user) ? true : false;
    }
  });


  Template.Discover.events({
    'click #friend-request-btn'(event) {
      event.preventDefault();
      var user = Meteor.users.findOne(this._id);
      var request = user.requestFriendship();
    },
  })
