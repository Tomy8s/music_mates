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
