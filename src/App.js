import React from 'react';
import YouTube from 'react-youtube';

import Database from './Database.js'
import Producao from './Producao.js'

import BottomBar from './BottomBar.js'
import MainBar from './MainBar.js'

import './App.css';

class App extends React.Component {
  database;

  constructor(props) {
    super(props);

    this._onVideoEnd = this._onVideoEnd.bind(this);
    this._onVideoError = this._onVideoError.bind(this);
    this._onSwitchCategory = this._onSwitchCategory.bind(this);
    this._onToggleUI = this._onToggleUI.bind(this);

    this.database = new Database();

    this.state = {
      videos: [],
      categories: [],
      currentCategory: null,
      currentVideo: null,
      videoStart: 0,
      isUIVisible: true,
    };
  }

  async componentDidMount() {
    this.setState(await this.database.get());
  }

  sync() {
    if (!this.state.currentCategory) {
      console.error('No current category.');
      return;
    }

    const videos = this.state.categories[this.state.currentCategory].videos;
    const producao = Producao.computeCurrentVideoAndOffset(videos);

    if (producao) {
      this.setState({
        currentVideo: videos[producao.videoIndex],
        videoStart: producao.videoStart
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentCategory !== this.state.currentCategory) {
      this.sync();
    }
  }

  _onVideoEnd() {
    console.debug('_onVideoEnd');
    this.sync();
  }

  _onVideoError(e) {
    console.warn('_onVideoError', e);
    // this.sync();
  }

  // Source: https://developers.google.com/youtube/iframe_api_reference#onStateChange
  //   -1 (unstarted)
  //   0 (ended)
  //   1 (playing)
  //   2 (paused)
  //   3 (buffering)
  //   5 (video cued).
  // _onStateChange(e) {
  //   console.warn('_onStateChange', e);

  //   switch(e.data) {
  //     case 0:
  //       this.nextVideo();
  //       break;
  //   }
  // }

  _onSwitchCategory(e) {
    this.setState({ currentCategory: e.currentTarget.dataset.id });
  }

  _onToggleUI() {
    this.setState({ isUIVisible: !this.state.isUIVisible });
  }

  render() {
    const isReady = this.state.currentVideo;
    let youtubeConfig, videoId, categoriesSwitcher;

    if (isReady) {
      videoId = this.state.currentVideo.fields['id'];
      console.debug('videoId =',videoId);

      youtubeConfig = {
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          enablejsapi: 1,
          modestbranding: 1,
          origin: 'https://slowproject.app/',
          start: this.state.videoStart 
        },
      };
    } 
    
    return (
      <div>
        {
          isReady ?
            <div>
              <div className="mt-8 ml-12 absolute">
                  <button
                      className="p-4 hover:opacity-50 text-white"
                      onClick={this._onToggleUI}>
                      ☰
                  </button>
              </div>

              {
                this.state.isUIVisible && <MainBar
                  categories={this.state.categories}
                  currentCategory={this.state.currentCategory}
                  onSwitchCategory={this._onSwitchCategory}
                  onToggleUI={this._onToggleUI}
                />
              }
              
              {   
                this.state.isUIVisible && <BottomBar currentVideo={this.state.currentVideo}/>   
              }

              <div className="video-background">
                <div className="video-foreground">
                  <YouTube
                    videoId={videoId}
                    opts={youtubeConfig}
                    onEnd={this._onVideoEnd}
                    onError={this._onVideoError}
                  />
                </div>
              </div>
            </div>
            :
            <h1>Carregando...</h1>
        }
      </div>
    );
  }
}


export default App;
