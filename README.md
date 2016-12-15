#Music Mates

[Visit our deployed app!](http://music-mates.herokuapp.com/)

##Setup

```
$ git clone https://github.com/Tomy8s/music_mates.git
$ cd music_mates
$ meteor npm install
<- see below before continuing ->
```
Before you are able to fully utilise the app you'll need to set up some [Spotify developer keys](https://developer.spotify.com/web-api/). Set the Redirect URIs to -- http://localhost:3000/_oauth/spotify and create a `settings.json` file in the root of the project. In there, copy in the following code and replace with your Spotify Developer keys:
```
{
  "spotifyClientId": "<- Your client key here ->",
  "spotifySecret": "<- Your secret key here ->"
}
```
Then you are able to get started.
```
$ npm run meteor

Visit localhost:3000/ in any browser
```
##Concept

We created this as a form of social media for music lovers looking to find new friends based on similar music tastes by looking through their playlists. We decided to start with Spotify since it's one of the most used cloud based music platforms as well as having a helpful API we could harness.

##Using the app
After visiting localhost:3000/ sign up using either your email or hit the Spotify button to sign up with Spotify (The recommended option to get full functionality from the start).

![alt tag](http://i68.tinypic.com/15qoif5.png)

From there (If you signed in with Spotify, otherwise this page will show just potential friends) you can view the most popular playlists on Spotify today, listen to them by clicking on the image. To make a new friend click the `follow` link and a friend request will be sent.

![alt tag](http://i63.tinypic.com/jsdhsi.png)

If you have your Spotify account linked (either on sign-up or post sign-up via the profile page) you can upload your playlists to the site on the Playlists page. Just hit the `Import/Update Your Spotify Playlist` link and they will be pulled in and visible to you and your friends. If you click on the playlist name you can listen to the playlist on the site, as well as having a track list displayed to you.

![alt tag](http://i65.tinypic.com/158822c.png)

##Stack used
Meteor/Javascript, tested using Mocha and Chimp

##Built by
+ [Irene Oppo](https://github.com/souljuse)
+ [James Steel](https://github.com/James-SteelX)
+ [Tadas Majeris](https://github.com/tadasmajeris)
+ [Tom Yates](https://github.com/Tomy8s/)

##Future Additions
+ Add in the Apple Music API
+ Show what I'm listening to right now
+ Suggest playlists to friends
+ Ability to follow/remove/add tracks to playlists on the site
+ Ability to add more information/photos to the profile page
