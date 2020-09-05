import React from 'react';

import {
  MAIN_BAR_WIDTH,
  BOTTOM_BAR_HEIGHT,
  LABELS_TRANSITION_MS
} from './constants.js';

import IconVolume from './IconVolume.js'
import IconFullScreen from './IconFullScreen.js'
// import IconGlobe from './IconGlobe.js'


class BottomBar extends React.Component {
  constructor(props) {
    super(props);

    this.onFullScreenChange = this.onFullScreenChange.bind(this);

    document.addEventListener('fullscreenchange', this.onFullScreenChange);

    this.state = {
      loading: true,
      isFullscreen: false,
      ...this.props
    }

    this.delayedStateUpdate();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.currentVideo !== this.props.currentVideo) {
      console.debug('currentVideo', this.props.currentVideo);

      this.setState({
        loading: true
      })

      // Delay updating content to give time for transition
      this.delayedStateUpdate();
    }
  }

  delayedStateUpdate() {
    setTimeout(() => {
      this.setState({
        loading: false,
        ...this.props
      })
    }, LABELS_TRANSITION_MS);
  }

  onToggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen(); 
      }
    }
  }

  onFullScreenChange(e) {
    this.setState({
      isFullScreen: document.fullscreenElement
    })
  }

  render() {
    const {
      currentVideo,
      nextVideo,
      isMuted,
      time1,
      time2
    } = this.state;

    const channelTitle = 
      currentVideo.fields['channelTitle'] &&
      currentVideo.fields['channelTitle'][0];
    const channelUrl = 
      currentVideo.fields['channelUrl'] &&
      currentVideo.fields['channelUrl'][0];
    
    const nextChannelTitle = 
      nextVideo.fields['channelTitle'] && 
      nextVideo.fields['channelTitle'][0];
    const nextChannelUrl =
      nextVideo.fields['channelUrl'] &&
      nextVideo.fields['channelUrl'][0];
    
    const latlong = currentVideo.fields['latlong'];
    const latlongLabel = latlong && latlong.split(',').map(i => i+'°').join(' ');

    return (
        <div 
          className={`
            absolute left-0 bottom-0 w-full text-xs pt-2 flex justify-between
            transition-all ease-out duration-${LABELS_TRANSITION_MS} transform
            ${this.state.loading ? '-translate-y-2 opacity-0' : '-translate-y-0 opacity-100'}
          `}
          style={{
            paddingLeft: MAIN_BAR_WIDTH,
            height: BOTTOM_BAR_HEIGHT + 'px',
            fontFamily: 'Noto Sans, sans-serif'}}
          >
            <div className="w-7/12 flex">
              <div className="mt-2">
                <div>
                  {time1}
                </div>
                <div className="h-px w-full bg-gray-200">
                  <div id="progressBar" className="h-px bg-gray-600 w-0 transition-all duration-1000"></div>
                </div> 
              </div>

              <div className="ml-4">
                <div className="h-16 overflow-hidden">
                  <a target="_blank" rel="noopener noreferrer"
                    className="hover:underline text-xl"
                    href={currentVideo.fields['url']} >
                      {currentVideo.fields['title']}
                  </a>
                </div>

                <div>
                  <a target="_blank" rel="noopener noreferrer"
                    className="italic hover:underline"
                    href={channelUrl} >
                      {channelTitle}
                  </a>
                </div>
              </div>

              {
                latlong && 
                <div className="ml-4 mt-2">
                  <a target="_blank" rel="noopener noreferrer"
                    className="hover:underline text-gray-700 whitespace-no-wrap"
                    href={`https://www.google.com/maps/@${latlong},12z`} >
                      {latlongLabel}
                  </a>
                </div>
              }
            </div>

            <div className="w-3/12 flex text-gray-500">
              <div className="mt-2">
                <div>
                  {time2}
                </div>
                <div className="h-px w-full bg-gray-200"/>
              </div>

              <div className="ml-4 truncate">
                <div className="truncate">
                  <a target="_blank" rel="noopener noreferrer"
                    className="hover:underline text-xl"
                    href={nextVideo.fields['url']} >
                      { nextVideo.fields['title'] }
                  </a>
                </div>

                <div className="italic">
                  <a target="_blank" rel="noopener noreferrer"
                    className="hover:underline"
                    href={nextChannelUrl} >
                      { nextChannelTitle }
                  </a>
                </div>
              </div>
            </div>
            
            <div className="w-1/12 flex justify-end items-start -mt-2">
              <button
                className="p-4 hover:bg-gray-200 transition-colors duration-300 rounded-lg"
                onClick={this.props.onToggleMute}>
                  <IconVolume isMuted={isMuted}/>
              </button>
              <button
                className="p-4 hover:bg-gray-200 transition-colors duration-300 rounded-lg"
                onClick={this.onToggleFullscreen}>
                  <IconFullScreen isFullScreen={this.state.isFullScreen}/>
              </button>
            </div>

            {/* <div className="w-1/12"></div> */}
        </div>
    );
  }
}


export default BottomBar;
