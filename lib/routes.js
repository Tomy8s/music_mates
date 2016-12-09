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
