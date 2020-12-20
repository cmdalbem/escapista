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

import LogoMenu from './LogoMenu.js'
import BottomBar from './BottomBar.js'
import MainBar from './MainBar.js'
import Player from './Player.js'
import Welcome from './Welcome.js'
import Analytics from './Analytics.js'

import IconRotate from './assets/IconRotate.js'

import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.onFullScreenChange = this.onFullScreenChange.bind(this);
    this.onToggleFullscreen = this.onToggleFullscreen.bind(this);
    this.onPlayerClick = this.onPlayerClick.bind(this);
    this.onVideoEnd = this.onVideoEnd.bind(this);
    this.onSwitchCategory = this.onSwitchCategory.bind(this);
    this.onToggleUI = this.onToggleUI.bind(this);
    this.onToggleMute = this.onToggleMute.bind(this);
    this.onChangeVolume = this.onChangeVolume.bind(this);
    this.updateGuide = this.updateGuide.bind(this);
    this.skipVideo = this.skipVideo.bind(this);

    if (!isMobileSafari()) {
      Screenfull.on('change', this.onFullScreenChange);
    }

    const saved = this.getStateFromLocalStorage();
    // const params = this.getParamsFromURL();

    this.state = {
      welcome: 
        saved && saved.welcome !== undefined 
          ? saved.welcome
          : !isMobile,
      categories: null,
      guide: null,
      currentCategory: null,
      isUIVisible: true,
      volume:
        saved && saved.volume !== undefined
          ? saved.volume
          : 1,
      isMuted:
        saved && saved.isMuted !== undefined
          ? saved.isMuted
          : true,
    };

    window.addEventListener('beforeunload', e => {
      this.saveStateToLocalStorage();
    });
  }

  async componentDidMount() {
    Analytics.setUserProperty({
      isUIVisible: this.state.isUIVisible,
      isMuted: this.state.isMuted,
      isFullscreen: false
    });

    let category = this.props.location.pathname.split('/')[1];
    if (!category) {
      const prevState = this.getStateFromLocalStorage();
      if (prevState) {
        category = prevState.currentCategory;
      }
    }

    this.setState({
      currentCategory: category
    });

    this.updateGuide();
  }

  updateURL() {
    const searchParams = new URLSearchParams();
    // searchParams.set('muted', this.state.isMuted);
    // searchParams.set('ui', this.state.isUIVisible);
    
    const slug = this.state.currentCategory;
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
      welcome: this.state.welcome,
      volume: this.state.volume
    }
 
    const str = JSON.stringify(state);
    window.localStorage.setItem('escapista-app-state', str);
  }

  async updateGuide() {
    const res = await (await fetch('/api/get')).json();
    const guide = res.body;

    console.debug('guide from API', guide);

    // Check if selected category is valid
    let currentCategory;
    if (this.state.currentCategory && guide.channels[this.state.currentCategory]) {
      currentCategory = this.state.currentCategory;
    } else {
      currentCategory = Object.keys(guide.channels)[0];
    }

    this.setState({
      guide,
      currentCategory
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentCategory !== this.state.currentCategory) {
      if (this.state.guide) {
        const currentChannelData = this.state.guide.channels[this.state.currentCategory];
        if (Date.now() > currentChannelData.time2) {
          // Changing channel but current video already ended, rebuild guide
          this.updateGuide();
        }

        // Guess not needed anymore with automatic video events from GA4?
        // Analytics.event('impression', {
        //   currentId: currentChannelData.currentVideo.fields.id,
        //   currentTitle: currentChannelData.currentVideo.fields.title
        // });

        Analytics.event('category_skipped');
      }

      this.updateURL();
    }

    if (this.state.isUIVisible !== prevState.isUIVisible
        || this.state.isMuted !== prevState.isMuted) {
        Analytics.setUserProperty({
          isUIVisible: this.state.isUIVisible,
          isMuted: this.state.isMuted
        });
    }
  }

  onSwitchCategory(e) {
    this.setState({ currentCategory: e.currentTarget.dataset.id });
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

  onVideoEnd() {
    this.updateGuide();
  }

  onToggleFullscreen() {
    Screenfull.toggle();
  }

  onFullScreenChange(e) {
    this.setState({
      isUIVisible: !Screenfull.isFullscreen
    })

    Analytics.setUserProperty({
      isFullscreen: Screenfull.isFullscreen
    });
  }

  onToggleMute() {
    this.setState({
      isMuted: !this.state.isMuted,
      // volume: this.state.isMuted ? 1 : 0
    });
  }

  onChangeVolume(newVolume) {
    this.setState({ volume: newVolume });
  }

  skipVideo() {
    // Disabled with new backend system
    // console.warn('Something went wrong, skipping this video', this.state.currentVideo);
    
    // const currentPlaylist = this.state.categories[this.state.currentCategory].videos;
    // currentPlaylist.splice(this.state.currentVideo, 1);
    // this.updateGuide();
  }

  render() {
    const { t } = this.props;
    const isReady = !!this.state.guide;

    let currentChannelData;
    if (isReady) {
      currentChannelData = this.state.guide.channels[this.state.currentCategory];
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
              guideCreatedAt={isReady && this.state.guide.createdAt}
              isMuted={this.state.isMuted}
              volume={this.state.volume}
              isUIVisible={this.state.isUIVisible}
              onPlayerClick={this.onPlayerClick}
              onVideoEnd={this.onVideoEnd}
              skipVideo={this.skipVideo}
            />

            <BottomBar
              channelData={currentChannelData}
              isUIVisible={this.state.isUIVisible}
              isMuted={this.state.isMuted}
              volume={this.state.volume}
              onChangeVolume={this.onChangeVolume}
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
                channels={isReady && this.state.guide.channels}
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