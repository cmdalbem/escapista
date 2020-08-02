import React from 'react';
import YouTube from 'react-youtube';

import logo from './logo.svg';
import './App.css';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      videoIndex: 0,
      videoStart: 0
    };
  }

  componentDidMount() {
    fetch(
      "https://api.airtable.com/v0/app5PlDbzK24kIJtP/Table%201?api_key=keyitXI1MaCb75MYj"
    )
      .then(res => res.json())
      .then(res => {
        if (res.records && res.records.length > 0) {
          res.records = res.records.filter(i => i.fields['running time']);
          this.setState({
            data: res.records
          });

          console.debug('airtable entries:',res.records);

          this.computeCurrentVideoAndOffset(Math.floor((new Date().getTime())/1000));
        }
      })
      .catch(error => console.log(error));
  }

  nextVideo() {
    this.setState({
      videoIndex: this.state.videoIndex,
      videoStart: 0
    })
  }

  _onStateChange(data) {
    if (data === 0) {
      this.nextVideo();
    }
  }
 
  computeCurrentVideoAndOffset(seed) {
    const data = this.state.data;

    let accs = [];
    const lengths = data.map(i => i.fields['running time']*60);
    const totalLength = lengths.reduce((a, b) => a + b, 0);
    seed = seed % totalLength;
    
    let accumulatedLengths = [lengths[0]];
    for(let i=1; i<lengths.length; i++) {
      accumulatedLengths[i] = lengths[i] + accumulatedLengths[i-1];
    }

    let videoIndex = 0;
    for(let i=0; seed>accumulatedLengths[i]; i++) {
      videoIndex = i+1;
      console.debug('videoIndex',videoIndex);
    }

    const videoStart = Math.floor(seed % lengths[videoIndex]);
    
    console.debug('seed',seed);
    console.debug('accumulatedLengths',accumulatedLengths);
    console.debug('videoIndex=',videoIndex);
    console.debug('videoStart=',videoStart);

    this.setState({
      videoIndex: videoIndex,
      videoStart: videoStart
    })
  }

  render() {
    const data = this.state.data;
    let youtubeConfig;
    let videoId;

    if (this.state.videoIndex) {
      videoId = data[this.state.videoIndex].fields['video-id'];

      youtubeConfig = {
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          enablejsapi: 1,
          modestbranding: 1,
          origin: 'www.cristianodalbem.com',
          start: this.state.videoStart 
        },
      };
    } 
    
    return (
      <div>
        {
          this.state.videoIndex ?
            <div className="video-background">
              <div className="video-foreground">
                <YouTube videoId={videoId} opts={youtubeConfig} onStateChange={this._onStateChange}/>
              </div>
            </div>
            :
            <h1>Loading...</h1>
        }
      </div>
    );
  }
}


export default App;
