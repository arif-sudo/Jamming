import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import Playlist from '../Playlist/Playlist';
import SearchResults from '../SearchResults/SearchResults';
// import { render } from '@testing-library/react';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      SearchResults: [
        // {name: 'name1', artist: 'artist1', album: 'album1', id:1},
        // {name: 'name2', artist: 'artist2', album: 'album2', id: 2},
        // {name: 'name3', artist: 'artist3', album: 'album3', id: 3}
      ],
      playlistName: 'Arifplaylist',
      playlistTracks: [
      // {name: 'name4', artist: 'artist4', album: 'album4', id: 4},
      //   {name: 'name5', artist: 'artist5', album: 'album5', id: 5 },
      //   {name: 'name6', artist: 'artist6', album: 'album6', id: 6}
    ]
  };
    this.addTrack = this.addTrack.bind(this)
    this.removeTrack = this.removeTrack.bind(this)
    this.updatePlaylistName = this.updatePlaylistName.bind(this) 
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
  };

  addTrack(track){
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }else {
      this.state.playlistTracks.push(track);
      this.setState({
        playlistTracks: this.state.playlistTracks
      })
    }
  }
  removeTrack(track){
    let tracks = this.state.playlistTracks;
    tracks = tracks.filter(savedTrack => savedTrack.id !== track.id)
    this.setState({
      playlistTracks: tracks
    })
  }
  updatePlaylistName(name){
    this.setState({
      playlistName: name
    })
  }

  savePlaylist(){
    // alert('This method works asf yo')
    const trackUris = this.state.playlistTracks.map(track => track.uri)
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: 'New Playlist',
        playlistTracks: []
      })
    })
  }

  search(term){
    Spotify.search(term).then(searchResults => {
      this.setState({ SearchResults: searchResults})
    })
  }
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.SearchResults} onAdd={this.addTrack}  />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}
             onRemove={this.removeTrack} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    )
  }
}
export default App;
