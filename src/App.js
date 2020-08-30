import React from 'react';

import Database from './Database.js'
import Producao from './Producao.js'

import BottomBar from './BottomBar.js'
import MainBar from './MainBar.js'
import Player from './Player.js'

import IconMenu from './IconMenu.js'

import './App.css';

class App extends React.Component {
  database;

  constructor(props) {
    super(props);

    this.onSwitchCategory = this.onSwitchCategory.bind(this);
    this.onToggleUI = this.onToggleUI.bind(this);
    this.onToggleMute = this.onToggleMute.bind(this);
    this.sync = this.sync.bind(this);

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

  render() {
    const isReady = this.state.currentVideo;

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
                style={{ transition: 'opacity 0.8s cubic-bezier(0.65, 0, 0.35, 1)' }}
                >
                <MainBar
                  categories={this.state.categories}
                  currentCategory={this.state.currentCategory}
                  onSwitchCategory={this.onSwitchCategory}
                  onToggleUI={this.onToggleUI}
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
                sync={this.sync}
                isMuted={this.state.isMuted}
                isUIVisible={this.state.isUIVisible}
              />
            </div>
            :
            <h1>Carregando...</h1>
        }
      </div>
    );
  }
}


export default App;
