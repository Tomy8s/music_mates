

Template.trendingPlaylist.helpers({
  playlistFinder: function(){
    var trendyPlaylist = FlowRouter._current.params;
    console.log(trendyPlaylist)
    return trendyPlaylist;
  }
});
