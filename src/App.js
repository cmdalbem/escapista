import React from 'react';
import YouTube from 'react-youtube';

import Database from './Database.js'
import Producao from './Producao.js'

import './App.css';

class App extends React.Component {
  database;

  constructor(props) {
    super(props);

    this._onVideoEnd = this._onVideoEnd.bind(this);
    this._onVideoError = this._onVideoError.bind(this);
    this._onSwitchCategory = this._onSwitchCategory.bind(this);

    this.database = new Database();

    this.state = {
      videos: [],
      categories: [],
      currentCategory: null,
      currentVideo: null,
      videoStart: 0
    };
  }

  async componentDidMount() {
    // this.database.get()
    //   .then(obj => {
    //     this.setState(obj);
    //     this.sync();
    // })
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
    if (prevState.currentCategory != this.state.currentCategory) {
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
          origin: 'https://slowproject.vercel.app/',
          start: this.state.videoStart 
        },
      };

      categoriesSwitcher = Object.keys(this.state.categories).map( id =>
        <button 
          onClick={this._onSwitchCategory}
          data-id={id}
          key={id}
          style={{backgroundColor: this.state.currentCategory === id ? 'white' : 'gray'}}
          >
            {this.state.categories[id].fields.title} ({this.state.categories[id].videos.length})
        </button>
      );
    } 
    
    return (
      <div>
        {
          isReady ?
            <div>
              <div style={{ color: 'white' }}>
                {this.state.currentVideo.fields['title']}
              </div>

              <div style={{ color: 'white' }}>
                {categoriesSwitcher}
              </div>

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
