Accounts.onLogin(function() {

  // add spotify username
  var user = Meteor.user();
  if(!user.username && user.services){
    Meteor.users.update(user._id, {$set: {username: user.services.spotify.id }})
  }

  // redirect to discover on login
  if(FlowRouter._current && FlowRouter._current.path === '/') {
    FlowRouter.go('discover');
  }
});

Accounts.onLogout(function(){
  FlowRouter.go('home')
});

FlowRouter.triggers.enter([function(context, redirect){
  if(!Meteor.userId()){
    FlowRouter.go('home');
  }
}]);

FlowRouter.route('/', {
  name: 'home',
  action() {
    BlazeLayout.render('HomeLayout');
  }
});

FlowRouter.route('/discover', {
  name: 'discover',
  action() {
    BlazeLayout.render('MainLayout', {main: 'Discover'});
  }
});

FlowRouter.route('/myPlaylists', {
  name: 'myPlaylists',
  action() {
    BlazeLayout.render('MainLayout', {main: 'MyPlaylists'});
  }
});

FlowRouter.route('/messages', {
  name: 'messages',
  action() {
    BlazeLayout.render('MainLayout', {main: 'Messages'});
  }
});

FlowRouter.route('/friends', {
  name:'friends',
  action(){
    BlazeLayout.render('MainLayout', {main: 'Friends'});
  }
});

FlowRouter.route('/playlist/:id', {
  name:'playlist',
  action(params){
    BlazeLayout.render('MainLayout', {main: 'Tracks'});
  }
});

FlowRouter.route('/playlist/:id/:owner', {
  name:'playlist',
  action(params){
    BlazeLayout.render('MainLayout', {main: 'trendingPlaylist'});
  }
});

FlowRouter.route('/commonTracks/:userId', {
  name:'commonTracks',
  action(params){
    BlazeLayout.render('MainLayout', {main: 'CommonTracks'});
  }
});

FlowRouter.route('/myProfile', {
  name:'myProfile',
  action(params){
    BlazeLayout.render('MainLayout', {main: 'Profile'});
  }
});

FlowRouter.route('/profile/:id', {
  name:'profile',
  action(params){
    BlazeLayout.render('MainLayout', {main: 'OtherProfile'});
  }
});

FlowRouter.route('/login', {
  triggersEnter: [function (context, redirect) {
    var options = {
      showDialog: true,
      requestPermissions: [
        'playlist-read-private',
        'playlist-read-collaborative'
      ] // Spotify access scopes
    }
    Meteor.loginWithSpotify(options, function (err) {
      console.log( err || "Successful login" )
    })
    redirect('/spotify')
  }]
});
