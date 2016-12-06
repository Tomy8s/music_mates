Template.Navigation.rendered = function() {
  var selectedNavButton = FlowRouter._current.path.substring(1);
  document.getElementById(selectedNavButton).className = 'selected_route';
}
