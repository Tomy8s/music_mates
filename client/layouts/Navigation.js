Template.Navigation.rendered = function() {
  var selectedNavButton = FlowRouter._current.path.substring(1);
  
}

Template.Navigation.events({
  'click nav button'(){
    var buttonId = event.target.id;
    FlowRouter.go(buttonId);
    document.getElementsByClassName('selected_route').className = 'navButton';
    console.log(document.getElementsByClassName('selected_route'));
    document.getElementById(buttonId).className = 'selected_route';
  }
});
