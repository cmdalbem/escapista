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

import Producao from './Producao.js'

import LogoMenu from './LogoMenu.js'
import BottomBar from './BottomBar.js'
import MainBar from './MainBar.js'
import Player from './Player.js'

import Welcome from './Welcome.js'

import IconRotate from './assets/IconRotate.js'

import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.onFullScreenChange = this.onFullScreenChange.bind(this);
    this.onToggleFullscreen = this.onToggleFullscreen.bind(this);
    this.onPlayerClick = this.onPlayerClick.bind(this);
    this.onSwitchCategory = this.onSwitchCategory.bind(this);
    this.onToggleUI = this.onToggleUI.bind(this);
    this.onToggleMute = this.onToggleMute.bind(this);
    this.updateGuide = this.updateGuide.bind(this);
    this.skipVideo = this.skipVideo.bind(this);

    if (!isMobileSafari()) {
      Screenfull.on('change', this.onFullScreenChange);
    }

    const saved = this.getStateFromLocalStorage();
    const params = this.getParamsFromURL();

    this.state = {
      welcome: saved && saved.welcome !== undefined ? saved.welcome : !isMobile,
      categories: null,
      guide: null,
      currentCategoryId: null,
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
    const res = await (await fetch('/api/get')).json();
    const data = res.body;

    // console.debug('data from our own API ✨', res);
    // console.debug(data);
     
    let category;
    let pathname = this.props.location.pathname.split('/')[1];
    if (pathname) {
      category = this.getCategoryByName(data.categories, pathname);
    } else {
      const prevState = this.getStateFromLocalStorage();
      if (prevState) {
        category = prevState.currentCategoryId;
      }
    }

    this.setState({
      ...data,
      currentCategoryId: category || Object.keys(data.categories)[0]
    });

    this.updateGuide();
  }

  updateURL() {
    const searchParams = new URLSearchParams();
    // searchParams.set('muted', this.state.isMuted);
    // searchParams.set('ui', this.state.isUIVisible);
    
    const slug = this.state.categories[this.state.currentCategoryId].slug;
    
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
      currentCategoryId: this.state.currentCategoryId,
      welcome: this.state.welcome
    }
 
    const str = JSON.stringify(state);
    window.localStorage.setItem('escapista-app-state', str);
  }

  updateGuide() {
    const guide = Producao.getGuide(this.state.categories);

    if (guide) {
      this.setState({
        guide
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentCategoryId !== this.state.currentCategoryId) {
      if (this.state.guide) {
        const currentChannelData = this.state.guide[this.state.currentCategoryId];
        if (Date.now() > currentChannelData.time2) {
          // Changing channel but current video already ended, rebuild guide
          this.updateGuide();
        }
      }
    }

    if (this.state.isUIVisible !== prevState.isUIVisible
        || this.state.isMuted !== prevState.isMuted
        || this.state.currentCategoryId !== prevState.currentCategoryId){
        this.updateURL();
    }
  }

  onSwitchCategory(e) {
    this.setState({ currentCategoryId: e.currentTarget.dataset.id });
  }

  onToggleUI() {
    this.setState({ isUIVisible: !this.state.isUIVisible });
  }

  onPlayerClick(value) {
    // if (Screenfull.isEnabled) {
    //   Screenfull.request();
    // }
    this.setState({ isUIVisible: false })
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
    // Disabled with new backend system
    // console.warn('Something went wrong, skipping this video', this.state.currentVideo);
    
    // const currentPlaylist = this.state.categories[this.state.currentCategoryId].videos;
    // currentPlaylist.splice(this.state.currentVideo, 1);
    // this.updateGuide();
  }

  render() {
    const { t } = this.props;
    const isReady = this.state.guide;

    let currentChannelData;
    if (isReady) {
      currentChannelData = this.state.guide[this.state.currentCategoryId];
    }

    return (
      <div>
        <MobileView>
        {
          this.props.isPortrait &&
          <div className="fixed top-0 left-0 w-screen h-screen flex flex-col items-center justify-center text-white z-10 bg-teal-800">
            <IconRotate/>
            <div className="w-1/2 my-2 text-lg text-center leading-tight font-body">
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
          !this.state.welcome &&
          <div>
            <Player
              channelData={currentChannelData}
              isMuted={this.state.isMuted}
              isUIVisible={this.state.isUIVisible}
              onPlayerClick={this.onPlayerClick}
              updateGuide={this.updateGuide}
              skipVideo={this.skipVideo}
            />

            <BottomBar
              channelData={currentChannelData}
              isUIVisible={this.state.isUIVisible}
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
                currentCategoryId={this.state.currentCategoryId}
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