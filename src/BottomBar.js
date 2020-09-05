import React from 'react';

import { MAIN_BAR_WIDTH, BOTTOM_BAR_HEIGHT } from './constants.js';

import IconVolume from './IconVolume.js'
import IconFullScreen from './IconFullScreen.js'
// import IconGlobe from './IconGlobe.js'


class BottomBar extends React.Component {
  constructor(props) {
    super(props);

    this.onFullScreenChange = this.onFullScreenChange.bind(this);

    document.addEventListener('fullscreenchange', this.onFullScreenChange);

    this.state = {
      isFullscreen: false
    }
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
    } = this.props;
    
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
    let latlongLabel;
    if (latlong) {
      latlongLabel = latlong.split(',').map(i => i+'°').join(' ');
    }

    console.debug('currentVideo', currentVideo);

    return (
        <div 
          className="absolute left-0 bottom-0 w-full text-xs pt-2 flex justify-between"
          style={{
            paddingLeft: MAIN_BAR_WIDTH,
            height: BOTTOM_BAR_HEIGHT + 'px',
            fontFamily: 'Noto Sans, sans-serif'}}
          >
            <div className="w-7/12 flex">
              <div className="mt-2">
                {time1}
              </div>

              <div className="ml-4">
                <div>
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
                {time2}
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
                  <IconVolume isMuted={this.props.isMuted}/>
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
