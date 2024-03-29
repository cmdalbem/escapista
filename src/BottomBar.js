import React from 'react';
import { withTranslation } from 'react-i18next';
import Screenfull from "screenfull";

import { BrowserView, isMobile } from "react-device-detect";

import {
  MAIN_BAR_WIDTH,
  BOTTOM_BAR_HEIGHT,
  BOTTOM_BAR_AUTOCLOSE_TIMEOUT_MS,
  LABELS_TRANSITION_MS,
  ESCAPIST_EASING_BEZIER,
  ESCAPIST_EASING_TIMING,
} from './constants.js';

import { throttle, stripEmojis } from './utils.js';

import IconVolume from './assets/IconVolume.js'
import IconFullScreen from './assets/IconFullScreen.js'
// import IconGlobe from './assets/IconGlobe.js'


class BottomBar extends React.Component {
  autoCloseTimeout;

  constructor(props) {
    super(props);

    this.onMouseMove = this.onMouseMove.bind(this);
    this.throttleMouseMove = throttle(this.onMouseMove, 300);

    this.state = {
      loading: true,
      open: false,
      showVolumeSlider: false
    }

    this.delayStateUpdate();
    this.updateMenuAutocloseBehavior();
  }

  onMouseMove(e) {
    console.debug('onMouseMove');

    if (!this.props.isUIVisible) {
      this.setState({
        open: true
      });
    }
  }

  updateMenuAutocloseBehavior() {
    if (this.props.isUIVisible)  {
      document.removeEventListener(
        'mousemove',
        this.throttleMouseMove,
        { capture: true, passive: true });
    } else {
      this.setState({
        open: false
      })

      setTimeout( () => {
        document.addEventListener(
          'mousemove', 
          this.throttleMouseMove,
          { capture: true, passive: true }
        );
      }, 1500);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isMobile && prevProps.isUIVisible !== this.props.isUIVisible) {
      this.updateMenuAutocloseBehavior();
    }

    if (prevProps.channelData !== this.props.channelData) {
      this.setState({
        loading: true
      })

      // Delay updating content to give time for transition
      this.delayStateUpdate();
    }

    if (prevState.open !== this.state.open) {
      this.autoCloseMenu()
    }
  }

  autoCloseMenu() {
    if (this.autoCloseTimeout) {
      clearTimeout(this.autoCloseTimeout);
    }

    this.autoCloseTimeout = setTimeout(() => {
      this.setState({
        open: false
      })
    }, BOTTOM_BAR_AUTOCLOSE_TIMEOUT_MS);
  }

  delayStateUpdate() {
    setTimeout(() => {
      this.setState({
        loading: false,
        ...this.props
      })
    }, LABELS_TRANSITION_MS);
  }

  getFormatedTimes() {
    const { time1, time2, time3 } = this.state.channelData;
    const { i18n } = this.props;

    const dateTimeOpts = {
      hour: '2-digit',
      minute: '2-digit'
    };

    const str1 = new Date(time1).toLocaleTimeString(i18n.language, dateTimeOpts);
    const str2 = new Date(time2).toLocaleTimeString(i18n.language, dateTimeOpts);
    const str3 = new Date(time3).toLocaleTimeString(i18n.language, dateTimeOpts);

    return {
      time1Str: `${str1} — ${str2}`,
      time2Str: `${str2} — ${str3}`
    }
  }

  render() {
    const { t } = this.props; 

    let currentVideo, nextVideo;
    let time1Str, time2Str;
    let channelTitle, channelUrl;
    let currentVideoTitle, currentVideoUrl;
    let nextVideoTitle;
    let shouldShowNextVideo;

    if (this.state.channelData) {
      ({ time1Str, time2Str } = this.getFormatedTimes()); 
      ({ currentVideo, nextVideo } = this.state.channelData);
      
      channelTitle =
        currentVideo.fields['channelTitle'] &&
        currentVideo.fields['channelTitle'][0];
      channelUrl =
        currentVideo.fields['channelUrl'] &&
        currentVideo.fields['channelUrl'][0];

      currentVideoUrl = currentVideo.fields['url'];

      currentVideoTitle = stripEmojis(currentVideo.fields['title']);
      nextVideoTitle = stripEmojis(nextVideo.fields['title']);

      const remainingTimeSec = (new Date(this.state.channelData.time2) - new Date()) / 1000;
      shouldShowNextVideo = 
        nextVideoTitle &&
        remainingTimeSec < 10 * 60
    }

    // let latlong, latlongLabel;
    // latlong = currentVideo.fields['latlong'];
    // latlongLabel = latlong && latlong.split(',').map(i => i+'°').join(' ');

    return (
        <div className={`
            bg-white z-1 fixed left-0 bottom-0 w-full
            transform transition-all
            ${this.props.isUIVisible || this.state.open ? '-translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
          `} style={{
            transitionTimingFunction: ESCAPIST_EASING_BEZIER,
            transitionDuration: ESCAPIST_EASING_TIMING
          }}>
          <div
            className="pt-2 flex justify-between text-teal-800 font-body"
            style={{
              paddingLeft: MAIN_BAR_WIDTH,
              height: BOTTOM_BAR_HEIGHT + 'px'}}
            >
              <div className={` 
                flex w-10/12 transform transition-all ease-out
                ${(this.props.isUIVisible && !this.state.loading) || (this.state.open) ? '-translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}
                style={{transitionDuration: LABELS_TRANSITION_MS+'ms'}}
              > 
                <div className={`${isMobile ? 'w-10/12' : 'w-6/12'} pr-8 flex flex-col`}>
                  <div className="mt-2 text-xs font-extrabold whitespace-no-wrap mb-1">
                      { time1Str }
                  </div>

                  <div className="flex justify-between">
                    <div className="flex truncate">
                      <div className="truncate">
                        <div className={`truncate ${isMobile ? '' : 'text-xl'}`}>
                          <a target="_blank" rel="noopener noreferrer"
                            className="hover:underline"
                            href={currentVideoUrl} >
                              {currentVideoTitle}
                          </a>
                        </div>

                        <div>
                          <a target="_blank" rel="noopener noreferrer"
                            className=" hover:underline"
                            href={channelUrl} >
                              {channelTitle}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div id="airtableId" className="hidden">
                      { currentVideo && currentVideo.id }
                    </div>

                    {/* {
                      latlong && 
                      <div className="ml-4 mt-2">
                        <a target="_blank" rel="noopener noreferrer"
                          className="hover:underline text-gray-700 whitespace-no-wrap"
                          href={`https://www.google.com/maps/@${latlong},12z`} >
                            {latlongLabel}
                        </a>
                      </div>
                    } */}
                  </div>
                </div>

                {
                  shouldShowNextVideo &&
                  <BrowserView viewClassName="w-5/12 pr-8 flex flex-col text-gray-400">
                      {/* <div className="mb-1 mt-2 h-2px w-full bg-gray-300"/> */}
                      <div className="mt-2 text-xs font-extrabold whitespace-no-wrap mb-1">
                        { t('later') }
                      </div>

                      <div className="flex">
                        <div className="truncate">
                          <div className="truncate text-xl">
                            { nextVideoTitle }
                          </div>
                        </div>
                      </div>
                  </BrowserView>
                }
              </div>
              
              <div className="w-2/12 mt-4 pr-2 flex justify-end items-start">
                <div
                  className="relative"
                  onMouseEnter={() => this.setState({showVolumeSlider: true})} 
                  onMouseLeave={() => this.setState({showVolumeSlider: false})}
                >
                  {
                    !isMobile &&
                    this.state.showVolumeSlider &&
                    <div
                      className={`
                        absolute flex bg-white p-5 rounded-lg
                        transition-all ease-in-out duration-300
                        ${this.state.showVolumeSlider ? 'opacity-100' : 'opacity-0'}
                      `}
                      style={{
                        transform: `rotate(-90deg)`,
                        top: -112,
                        right: -56
                        }}>
                      <input
                        className={this.props.isMuted ? undefined : `cursor-pointer`}
                        type="range" min={0} max={1} step={0.02}
                        value={this.props.volume}
                        disabled={this.props.isMuted}
                        onChange={e => {
                          this.props.onChangeVolume(e.target.value);
                        }}
                      />
                    </div>
                  }

                  <button className={`
                    p-5 hover:bg-gray-200 transition-colors duration-300 rounded-lg
                    ${this.props.isMuted ? 'text-red-700' : ''} `}
                    onClick={this.props.onToggleMute}>
                      <IconVolume isMuted={this.props.isMuted}/>
                  </button>
                </div>
                
                {
                  Screenfull.isEnabled &&
                  <button
                    className="p-5 hover:bg-gray-200 transition-colors duration-300 rounded-lg"
                    onClick={this.props.onToggleFullscreen}>
                      <IconFullScreen isFullScreen={Screenfull.isFullscreen}/>
                  </button>
                }
              </div>
          </div>
        </div>
    );
  }
}


export default withTranslation()(BottomBar);