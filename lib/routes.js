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
