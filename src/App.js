import React from 'react';
import { withRouter } from "react-router-dom";

import {
  withOrientationChange,
  MobileView
} from "react-device-detect";

import Database from './Database.js'
import Producao from './Producao.js'

import LogoMenu from './LogoMenu.js'
import BottomBar from './BottomBar.js'
import MainBar from './MainBar.js'
import Player from './Player.js'

import IconRotate from './IconRotate.js'

import './App.css';


class App extends React.Component {
  database;

  constructor(props) {
    super(props);

    this.onSwitchCategory = this.onSwitchCategory.bind(this);
    this.setUIState = this.setUIState.bind(this);
    this.onToggleUI = this.onToggleUI.bind(this);
    this.onToggleMute = this.onToggleMute.bind(this);
    this.sync = this.sync.bind(this);
    this.skipVideo = this.skipVideo.bind(this);

    this.database = new Database();

    const params = this.getParamsFromURL();

    this.state = {
      videos: [],
      categories: [],
      currentCategory: null,
      currentVideo: null,
      videoStart: 0,
      isUIVisible: params.ui!==undefined ? params.ui : true,
      isMuted: params.muted!==undefined ? params.muted : false,
    };
  }

  getCategoryByName(categories, name) {
    return Object.keys(categories).find( i => categories[i].slug === name);
  }

  async componentDidMount() {
    const data = await this.database.get();
    let category;
    
    let pathname = this.props.location.pathname.split('/')[1];
    if (pathname) {
      category = this.getCategoryByName(data.categories, pathname);
    }

    this.setState({
      ...data,
      currentCategory: category || Object.keys(data.categories)[0]
    });
  }

  updateURL() {
    const searchParams = new URLSearchParams();
    searchParams.set('muted', this.state.isMuted);
    searchParams.set('ui', this.state.isUIVisible);
    
    const slug = this.state.categories[this.state.currentCategory].slug;
    
    this.props.history.push(`/${slug}?${searchParams.toString()}`);
  }

  getParamsFromURL() {
    const possibleParams = ['ui', 'muted'];
    const params = new URLSearchParams(this.props.location.search);

    let ret = {}
    possibleParams.forEach( p => {
        let value = params.get(p);
        if (value) {
            ret[p] = value === 'true';
        }
    })

    return ret;
}

  sync() {
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

    if (this.state.isUIVisible !== prevState.isUIVisible
        || this.state.isMuted !== prevState.isMuted
        || this.state.currentCategory !== prevState.currentCategory){
        this.updateURL();
    }
  }

  onSwitchCategory(e) {
    this.setState({ currentCategory: e.currentTarget.dataset.id });
  }

  onToggleUI() {
    this.setUIState(!this.state.isUIVisible)
  }

  setUIState(value) {
    this.setState({ isUIVisible: value });
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
      <div>
        <MobileView>
        {
          this.props.isPortrait &&
          <div className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center text-white z-10 bg-green-700">
            <IconRotate/>
            <div className="w-1/2 my-2 text-2xl text-center leading-tight unna">
              Gire seu celular para ter a melhor experiência.
            </div>
          </div>
        }
        </MobileView>

        {
          isReady &&
          <div>
            <Player
              videoId={this.state.currentVideo.fields['id']}
              videoStart={this.state.videoStart}
              videoEnd={this.state.currentVideo.fields.duration * 60}
              isMuted={this.state.isMuted}
              isUIVisible={this.state.isUIVisible}
              onToggleUI={this.onToggleUI}
              sync={this.sync}
              skipVideo={this.skipVideo}
            />
            
            <BottomBar
              isUIVisible={this.state.isUIVisible}
              currentVideo={this.state.currentVideo}
              nextVideo={this.state.nextVideo}
              time1={this.state.time1}
              time2={this.state.time2}
              isMuted={this.state.isMuted}
              setUIState={this.setUIState}
              onToggleMute={this.onToggleMute}
            />

            <div
              className={
                this.state.isUIVisible
                  ? 'opacity-100'
                  : 'opacity-0 pointer-events-none'}
              style={{
                transition: this.state.isUIVisible
                  ? 'opacity 1.2s ease-out 0.8s'
                  : 'opacity 0.8s ease-out'
              }}
              >
              <MainBar
                categories={this.state.categories}
                currentCategory={this.state.currentCategory}
                onSwitchCategory={this.onSwitchCategory}
              />
            </div>

            <LogoMenu
              isUIVisible={this.state.isUIVisible}
              onToggleUI={this.onToggleUI}
            />
          </div>
        }
      </div>
    );
  }
}


export default withOrientationChange(withRouter(App));
