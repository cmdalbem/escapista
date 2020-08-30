import React from 'react';
import YouTube from 'react-youtube';

import Database from './Database.js'
import Producao from './Producao.js'

import BottomBar from './BottomBar.js'
import MainBar from './MainBar.js'

import IconMenu from './IconMenu.js'

import './App.css';

class App extends React.Component {
  database;
  playerRef;

  constructor(props) {
    super(props);

    this.onVideoEnd = this.onVideoEnd.bind(this);
    this.onVideoError = this.onVideoError.bind(this);
    this.onSwitchCategory = this.onSwitchCategory.bind(this);
    this.onToggleUI = this.onToggleUI.bind(this);
    this.onToggleMute = this.onToggleMute.bind(this);

    this.database = new Database();

    this.playerRef = React.createRef();

    this.state = {
      videos: [],
      categories: [],
      currentCategory: null,
      currentVideo: null,
      videoStart: 0,
      isUIVisible: true,
      isMuted: false,
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

    if (prevState.isMuted !== this.state.isMuted) {
      if (this.state.isMuted) {
        this.playerRef.current.internalPlayer.mute();
      } else {
        this.playerRef.current.internalPlayer.unMute();
      }
    }
  }

  onVideoEnd() {
    console.debug('onVideoEnd');
    this.sync();
  }

  onVideoError(e) {
    console.warn('onVideoError', e);
    // this.sync();
  }

  // Source: https://developers.google.com/youtube/iframe_api_reference#onStateChange
  //   -1 (unstarted)
  //   0 (ended)
  //   1 (playing)
  //   2 (paused)
  //   3 (buffering)
  //   5 (video cued).
  // onStateChange(e) {
  //   console.warn('onStateChange', e);

  //   switch(e.data) {
  //     case 0:
  //       this.nextVideo();
  //       break;
  //   }
  // }

  onSwitchCategory(e) {
    this.setState({ currentCategory: e.currentTarget.dataset.id });
  }

  onToggleUI() {
    this.setState({ isUIVisible: !this.state.isUIVisible });
  }

  onToggleMute() {
    this.setState({ isMuted: !this.state.isMuted });
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
                      onClick={this.onToggleUI}>
                      <IconMenu/>
                  </button>
              </div>

              <div 
                className={this.state.isUIVisible ? 'opacity-100' : 'opacity-0'}
                style={{
                  // transition: 'opacity 0.8s cubic-bezier(0.57, 0, 0.58, 1)'
                  transition: 'opacity 0.8s cubic-bezier(0.65, 0, 0.35, 1)'
                }}
                >
                <MainBar
                  categories={this.state.categories}
                  currentCategory={this.state.currentCategory}
                  onSwitchCategory={this.onSwitchCategory}
                  onToggleUI={this.onToggleUI}
                />
              
                <BottomBar
                  currentVideo={this.state.currentVideo}
                  onToggleMute={this.onToggleMute}
                  isMuted={this.state.isMuted}
                />
              </div>

              <div className="video-background">
                <div className="video-foreground">
                  <YouTube
                    videoId={videoId}
                    opts={youtubeConfig}
                    onEnd={this.onVideoEnd}
                    onError={this.onVideoError}
                    ref={this.playerRef}
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
