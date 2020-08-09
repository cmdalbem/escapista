import React from 'react';
import YouTube from 'react-youtube';

import Database from './Database.js'
import Producao from './Producao.js'

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this._onVideoEnd = this._onVideoEnd.bind(this);
    this._onVideoError = this._onVideoError.bind(this);

    this.state = {
      data: [],
      videoIndex: 0,
      videoStart: 0
    };
  }

  componentDidMount() {
    Database.get()
      .then(records => {
        this.setState({
          data: records,
        });
        this.sync();
    })
  }

  sync() {
    const records = this.state.data;
    const producao = Producao.computeCurrentVideoAndOffset(records);

    console.debug('producao =',producao);

    this.setState({
      videoIndex: producao.videoIndex,
      videoStart: producao.videoStart
    });
  }

  nextVideo() {
    console.debug('nextVideo');

    this.sync();
    // this.setState({
    //   videoIndex: this.state.videoIndex + 1,
    //   videoStart: 0
    // })
  }

  _onVideoEnd() {
    console.debug('_onVideoEnd');
    this.nextVideo();
  }

  _onVideoError(e) {
    console.warn('_onVideoError', e);
    this.nextVideo();
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

  render() {
    const data = this.state.data;
    const isReady = data && data.length > 0 && this.state.videoIndex >= 0;
    let currentVideo, youtubeConfig, videoId;

    if (isReady) {
      currentVideo = data[this.state.videoIndex];
      videoId = currentVideo.fields['id'];
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
    } 
    
    return (
      <div>
        {
          isReady ?
            <div>
              <div style={{color: 'white'}}>
                {currentVideo.fields['title']}
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
