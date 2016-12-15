

Template.trendingPlaylist.helpers({
  playlistFinder: function(){
    var trendyPlaylist = FlowRouter._current.params;
    console.log(trendyPlaylist)
    return trendyPlaylist;
  },
  playlistName: function(){
    var name = FlowRouter._current.params.name;
    return name
  }
});
