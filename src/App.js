import React from 'react';
import {
  withRouter
} from "react-router-dom";

import { Fade as Hamburger } from 'hamburger-react'

import Database from './Database.js'
import Producao from './Producao.js'

import BottomBar from './BottomBar.js'
import MainBar from './MainBar.js'
import Player from './Player.js'

import { ESCAPIST_EASING_BEZIER } from './constants.js'

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
                cursor-pointer hover:opacity-75
                ${this.state.isUIVisible ? 'text-black' : 'text-white'}`
              }
              onClick={this.onToggleUI}
              >
              <Hamburger
                size={16}
                duration={1}
                easing={`${ESCAPIST_EASING_BEZIER}`}
                toggled={this.state.isUIVisible}
              />

              <h1
                className={`inline-block text-2xl leading-6 ml-8`}
                style={{
                  fontFamily: 'Unna, sans-serif',
                  transition: this.state.isUIVisible
                    ? `color 1s ${ESCAPIST_EASING_BEZIER} 1s`
                    : `color 1s ${ESCAPIST_EASING_BEZIER} 1s`
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
              }}
              >
              <MainBar
                categories={this.state.categories}
                currentCategory={this.state.currentCategory}
                onSwitchCategory={this.onSwitchCategory}
              />
            </div>

            <BottomBar
              isUIVisible={this.state.isUIVisible}
              currentVideo={this.state.currentVideo}
              nextVideo={this.state.nextVideo}
              time1={this.state.time1}
              time2={this.state.time2}
              onToggleMute={this.onToggleMute}
              isMuted={this.state.isMuted}
            />

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
          </div>
        }
      </div>
    );
  }
}


export default withRouter(App);
