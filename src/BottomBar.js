import React from 'react';
import { withTranslation } from 'react-i18next';

import { BrowserView, isMobile } from "react-device-detect";

import {
  MAIN_BAR_WIDTH,
  BOTTOM_BAR_HEIGHT,
  BOTTOM_BAR_AUTOCLOSE_TIMEOUT_MS,
  LABELS_TRANSITION_MS,
  ESCAPIST_EASING_BEZIER,
  ESCAPIST_EASING_TIMING,
} from './constants.js';

import { throttle } from './utils.js';

import IconVolume from './IconVolume.js'
import IconFullScreen from './IconFullScreen.js'
// import IconGlobe from './IconGlobe.js'


class BottomBar extends React.Component {
  autoCloseTimeout;

  constructor(props) {
    super(props);

    this.onMouseMove = this.onMouseMove.bind(this);

    if (!isMobile) {
      document.addEventListener(
        'mousemove', 
        throttle(this.onMouseMove, 300),
        { capture: true, passive: true }
      );

      this.autoCloseMenu();
    }

    this.state = {
      loading: true,
      open: !isMobile,
      ...this.props
    }

    this.delayStateUpdate();
  }

  onMouseMove(e) {
    // console.debug('onMouseMove');
    if (!this.props.isUIVisible) {
      this.setState({
        open: true
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentVideo !== this.props.currentVideo) {
      console.debug('currentVideo', this.props.currentVideo);

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
    const { time1, time2, time3, i18n } = this.props;

    const dateTimeOpts = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };

    const str1 = time1.toLocaleTimeString(i18n.language, dateTimeOpts);
    const str2 = time2.toLocaleTimeString(i18n.language, dateTimeOpts);
    const str3 = time3.toLocaleTimeString(i18n.language, dateTimeOpts);

    return {
      time1Str: `${str1} — ${str2}`,
      time2Str: `${str2} — ${str3}`,
    }
  }

  render() {
    const {
      currentVideo,
      nextVideo
    } = this.state;

    const { time1Str, time2Str } = this.getFormatedTimes();

    const channelTitle = 
      currentVideo.fields['channelTitle'] &&
      currentVideo.fields['channelTitle'][0];
    const channelUrl = 
      currentVideo.fields['channelUrl'] &&
      currentVideo.fields['channelUrl'][0];
    
    const nextChannelTitle = 
      nextVideo.fields['channelTitle'] && 
      nextVideo.fields['channelTitle'][0];
    // const nextChannelUrl =
    //   nextVideo.fields['channelUrl'] &&
    //   nextVideo.fields['channelUrl'][0];
    
    // let latlong, latlongLabel;
    // latlong = currentVideo.fields['latlong'];
    // latlongLabel = latlong && latlong.split(',').map(i => i+'°').join(' ');

    return (
        <div className={`
            bg-white z-1 fixed left-0 bottom-0 w-full
            transform transition-all
            ${this.props.isUIVisible || this.state.open ? '-translate-y-0' : 'translate-y-full'}
          `} style={{
            transitionTimingFunction: ESCAPIST_EASING_BEZIER,
            transitionDuration: ESCAPIST_EASING_TIMING
          }}>
          <div 
            className={`
              pt-2 flex justify-between text-green-900 font-body
              transform transition-all ease-out duration-${LABELS_TRANSITION_MS}
              ${this.state.loading ? '-translate-y-2 opacity-0' : '-translate-y-0 opacity-100'}
            `}
            style={{
              paddingLeft: MAIN_BAR_WIDTH,
              height: BOTTOM_BAR_HEIGHT + 'px'}}
            >
              <div className={`${isMobile ? 'w-10/12' : 'w-7/12'} pr-8 flex flex-col`}>
                <div className="mt-2 text-xs font-extrabold whitespace-no-wrap">
                    { time1Str }
                </div>

                <div className="flex justify-between">
                  <div className="flex truncate">
                    <div className="truncate">
                      <div className="truncate text-2xl">
                        <a target="_blank" rel="noopener noreferrer"
                          className="hover:underline"
                          href={currentVideo.fields['url']} >
                            {currentVideo.fields['title']}
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

              <BrowserView viewClassName="w-4/12 pr-8 flex flex-col text-gray-500">
                  {/* <div className="mb-1 mt-2 h-2px w-full bg-gray-300"/> */}
                  <div className="mt-2 text-xs font-extrabold whitespace-no-wrap">
                    { time2Str }
                  </div>

                  <div className="flex">
                    <div className="truncate">
                      <div className="truncate text-2xl">
                        {/* <a target="_blank" rel="noopener noreferrer"
                          className="hover:underline"
                          href={nextVideo.fields['url']} > */}
                            { nextVideo.fields['title'] }
                        {/* </a> */}
                      </div>

                      <div>
                        {/* <a target="_blank" rel="noopener noreferrer"
                          className="hover:underline"
                          href={nextChannelUrl} > */}
                            { nextChannelTitle }
                        {/* </a> */}
                      </div>
                    </div>
                  </div>
              </BrowserView>
              
              <div className="w-1/12 pr-2 flex justify-end items-start">
                <button
                  className="p-5 hover:bg-gray-200 transition-colors duration-300 rounded-lg"
                  onClick={this.props.onToggleMute}>
                    <IconVolume isMuted={this.props.isMuted}/>
                </button>
                <button
                  className="p-5 hover:bg-gray-200 transition-colors duration-300 rounded-lg"
                  onClick={this.props.onToggleFullscreen}>
                    <IconFullScreen isFullScreen={this.props.isFullScreen}/>
                </button>
              </div>

              {/* <div className="w-1/12"></div> */}
          </div>
        </div>
    );
  }
}


export default withTranslation()(BottomBar);