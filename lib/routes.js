FlowRouter.route('/discover', {
  name: 'discover',
  action() {
    BlazeLayout.render('MainLayout', {main: 'Discover'});
  }
});

FlowRouter.route('/myPlaylists', {
  name: 'myPlaylists',
  action() {
    BlazeLayout.render('MainLayout', {main: 'MyPLaylists'});
  }
});

FlowRouter.route('/messages', {
  name: 'messages',
  action() {
    BlazeLayout.render('MainLayout', {main: 'Messages'});
  }
});

FlowRouter.route('/friends', {
  name:'freinds',
  action(){
    BlazeLayout.render('MainLayout', {main: 'Friends'});
  }
});