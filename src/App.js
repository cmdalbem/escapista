import React from 'react';
import { withRouter } from "react-router-dom";
import Screenfull from "screenfull";

import {
  withOrientationChange,
  MobileView,
  isMobile
} from "react-device-detect";

import { withTranslation } from 'react-i18next';


import { isMobileSafari } from './utils.js';

// import Database from './Database.js'
import Producao from './Producao.js'

import LogoMenu from './LogoMenu.js'
import BottomBar from './BottomBar.js'
import MainBar from './MainBar.js'
import Player from './Player.js'

import Welcome from './Welcome.js'

import IconRotate from './IconRotate.js'

import './App.css';


class App extends React.Component {
  // database;

  constructor(props) {
    super(props);

    this.onFullScreenChange = this.onFullScreenChange.bind(this);
    this.onToggleFullscreen = this.onToggleFullscreen.bind(this);
    this.setFullscreen = this.setFullscreen.bind(this);
    this.onSwitchCategory = this.onSwitchCategory.bind(this);
    this.onToggleUI = this.onToggleUI.bind(this);
    this.onToggleMute = this.onToggleMute.bind(this);
    this.sync = this.sync.bind(this);
    this.skipVideo = this.skipVideo.bind(this);

    if (!isMobileSafari()) {
      Screenfull.on('change', this.onFullScreenChange);
    }

    // this.database = new Database();

    const saved = this.getStateFromLocalStorage();
    const params = this.getParamsFromURL();

    this.state = {
      welcome: saved && saved.welcome !== undefined ? saved.welcome : !isMobile,
      videos: [],
      categories: [],
      currentCategory: null,
      currentVideo: null,
      videoStart: 0,
      isUIVisible:
        params.ui !== undefined
          ? params.ui
        : saved
          ? saved.isUIVisible
          : true,
      isMuted:
        params.muted !== undefined
          ? params.muted
        : saved
          ? saved.isMuted
          : false,
    };

    window.addEventListener('beforeunload', e => {
      this.saveStateToLocalStorage();
    });
  }

  getCategoryByName(categories, name) {
    return Object.keys(categories).find( i => categories[i].slug === name);
  }

  async componentDidMount() {
    // const data = await this.database.get();
    const res = await (await fetch('/api/get')).json();
    const data = res.body;

    console.debug('data from our own API ✨', res);
    console.debug(data);
     
    let category;
    let pathname = this.props.location.pathname.split('/')[1];
    if (pathname) {
      category = this.getCategoryByName(data.categories, pathname);
    } else {
      const prevState = this.getStateFromLocalStorage();
      if (prevState) {
        category = prevState.currentCategory;
      }
    }

    this.setState({
      ...data,
      currentCategory: category || Object.keys(data.categories)[0]
    });
  }

  updateURL() {
    const searchParams = new URLSearchParams();
    // searchParams.set('muted', this.state.isMuted);
    // searchParams.set('ui', this.state.isUIVisible);
    
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

  getStateFromLocalStorage() {
    const savedState = JSON.parse(window.localStorage.getItem('escapista-app-state'));
    console.debug('Retrived saved state from local storage:', savedState);
    return savedState;
  }

  saveStateToLocalStorage() {
    const state = {
      isUIVisible: this.state.isUIVisible,
      isMuted: this.state.isMuted,
      currentCategory: this.state.currentCategory,
      welcome: this.state.welcome
    }
 
    const str = JSON.stringify(state);
    window.localStorage.setItem('escapista-app-state', str);
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
    this.setState({ isUIVisible: !this.state.isUIVisible });
  }

  setFullscreen(value) {
    if (Screenfull.isEnabled) {
      if (value) {
        Screenfull.request();
      } else {
        Screenfull.exit();
      }
    }
  }

  onToggleFullscreen() {
    Screenfull.toggle();
  }

  onFullScreenChange(e) {
    this.setState({
      isUIVisible: !Screenfull.isFullscreen
    })
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
    const { t } = this.props;
    const isReady = this.state.currentVideo;

    return (
      <div>
        <MobileView>
        {
          this.props.isPortrait &&
          <div className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center text-white z-10 bg-green-700">
            <IconRotate/>
            <div className="w-1/2 my-2 text-2xl text-center leading-tight font-body">
              { t('turn-phone') }
            </div>
          </div>
        }
        </MobileView>

        {
          this.state.welcome &&
          <Welcome
            onStartClick={() => this.setState({welcome: false})}
          />
        }

        {
          isReady && !this.state.welcome &&
          <div>
            <Player
              videoId={this.state.currentVideo.fields['id']}
              videoStart={this.state.videoStart}
              videoEnd={this.state.currentVideo.fields.duration * 60}
              isMuted={this.state.isMuted}
              isUIVisible={this.state.isUIVisible}
              setFullscreen={this.setFullscreen}
              sync={this.sync}
              skipVideo={this.skipVideo}
            />

            <BottomBar
              isUIVisible={this.state.isUIVisible}
              currentVideo={this.state.currentVideo}
              nextVideo={this.state.nextVideo}
              time1={this.state.time1}
              time2={this.state.time2}
              time3={this.state.time3}
              isMuted={this.state.isMuted}
              onToggleMute={this.onToggleMute}
              onToggleFullscreen={this.onToggleFullscreen}
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
                onAboutClick={() => this.setState({welcome: true})}
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


export default withTranslation()(withOrientationChange(withRouter(App)));