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
```
