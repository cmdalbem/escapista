import React from 'react';

import Database from './Database.js'
import Producao from './Producao.js'

import BottomBar from './BottomBar.js'
import MainBar from './MainBar.js'
import Player from './Player.js'

import { Fade as Hamburger } from 'hamburger-react'


import './App.css';

class App extends React.Component {
  database;

  constructor(props) {
    super(props);

    this.onSwitchCategory = this.onSwitchCategory.bind(this);
    this.onToggleUI = this.onToggleUI.bind(this);
    this.onToggleMute = this.onToggleMute.bind(this);
    this.sync = this.sync.bind(this);
    this.skipVideo = this.skipVideo.bind(this);

    this.database = new Database();

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

    const currentPlaylist = this.state.categories[this.state.currentCategory].videos;
    const producao = Producao.computeCurrentVideoAndOffset(currentPlaylist);

    if (producao) {
      this.setState(producao);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentCategory !== this.state.currentCategory) {
      this.sync();
    }
  }

  onSwitchCategory(e) {
    this.setState({ currentCategory: e.currentTarget.dataset.id });
  }

  onToggleUI() {
    this.setState({ isUIVisible: !this.state.isUIVisible });
  }

  onToggleMute() {
    this.setState({ isMuted: !this.state.isMuted });
  }

  skipVideo() {
    console.warn('Something went wrong, skipping this video', this.state.currentVideo);
    
    const currentPlaylist = this.state.categories[this.state.currentCategory].videos;
    currentPlaylist.splice(this.state.currentVideo, 1);
    this.sync();
  }

  render() {
    const isReady = this.state.currentVideo;

    return (
      <div className="antialised">
        {
          isReady &&
            <div>
              <div 
                className={`
                  mt-8 pt-1 ml-12 absolute z-10 flex items-center
                  ${this.state.isUIVisible ? 'text-black' : 'text-white'}`
                }>
                  <Hamburger
                    size={16}
                    duration={1}
                    easing="cubic-bezier(0.65, 0, 0.35, 1)"
                    toggled={this.state.isUIVisible} 
                    toggle={this.onToggleUI}
                  />

                  <h1
                      className={`inline-block text-2xl leading-6 ml-8`}
                      style={{
                        fontFamily: 'Unna, sans-serif',
                        transition: this.state.isUIVisible 
                          ? 'color 1s cubic-bezier(0.65, 0, 0.35, 1) 1s'
                          : 'color 1s cubic-bezier(0.65, 0, 0.35, 1) 1s'
                      }}>
                      Escapista
                  </h1>
              </div>

              <div 
                className={
                  this.state.isUIVisible
                    ? 'opacity-100'
                    : 'opacity-0 pointer-events-none'}
                style={{
                  transition: this.state.isUIVisible 
                    ? 'opacity 1.2s ease-out 0.8s'
                    : 'opacity 0.8s ease-out'
                }}>
                <MainBar
                  categories={this.state.categories}
                  currentCategory={this.state.currentCategory}
                  onSwitchCategory={this.onSwitchCategory}
                />
              
                <BottomBar
                  currentVideo={this.state.currentVideo}
                  nextVideo={this.state.nextVideo}
                  time1={this.state.time1}
                  time2={this.state.time2}
                  onToggleMute={this.onToggleMute}
                  isMuted={this.state.isMuted}
                />
              </div>

              <Player
                videoId={this.state.currentVideo.fields['id']}
                videoStart={this.state.videoStart}
                isMuted={this.state.isMuted}
                isUIVisible={this.state.isUIVisible}
                onToggleUI={this.onToggleUI}
                sync={this.sync}
                skipVideo={this.skipVideo}
              />
            </div>
        }
      </div>
    );
  }
}


export default App;
