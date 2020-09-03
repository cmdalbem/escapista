import React from 'react';

import { MAIN_BAR_WIDTH } from './constants.js';

import IconVolume from './IconVolume.js'
import IconFullScreen from './IconFullScreen.js'
// import IconGlobe from './IconGlobe.js'


class BottomBar extends React.Component {
  state = {
    isFullscreen: false
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
          className="absolute left-0 bottom-0 w-full h-24 text-xs pt-2 flex justify-between"
          style={{
            paddingLeft: MAIN_BAR_WIDTH,
            fontFamily: 'Noto Sans, sans-serif'}}
          >
            <div className="w-7/12 flex">
              <div>
                {time1}
              </div>

              <div className="ml-4">
                <div>
                  <a
                    className="hover:underline"
                    target="_blank" rel="noopener noreferrer"
                    href={currentVideo.fields['url']}
                    >
                      {currentVideo.fields['title']}
                  </a>
                </div>

                <div>
                  <a
                    className="italic hover:underline"
                    target="_blank" rel="noopener noreferrer"
                    href={channelUrl}
                    >
                      {channelTitle}
                  </a>
                </div>
              </div>

              {
                latlong && 
                <div className="ml-4">
                  <a
                    className="hover:underline text-gray-700"
                    target="_blank" rel="noopener noreferrer"
                    href={`https://www.google.com/maps/@${latlong},12z`}
                    >
                      {latlongLabel}
                  </a>
                </div>
              }
            </div>


            <div className="w-3/12 flex text-gray-500">
              <div>
                {time2}
              </div>

              <div className="ml-4 truncate">
                <div className="truncate">
                  <a
                    className="hover:underline"
                    target="_blank" rel="noopener noreferrer"
                    href={nextVideo.fields['url']}
                    >
                      { nextVideo.fields['title'] }
                  </a>
                </div>

                <div className="italic">
                  <a
                    className="hover:underline"
                    target="_blank" rel="noopener noreferrer"
                    href={nextChannelUrl}
                    >
                      { nextChannelTitle }
                  </a>
                </div>
              </div>
            </div>
            
            <div className="w-1/12 flex justify-end items-start -mt-4">
              <button
                className="p-4 hover:opacity-50"
                onClick={this.props.onToggleMute}>
                {
                  <IconVolume isMuted={this.state.isMuted}/>
                }
              </button>
              <button
                className="p-4 hover:opacity-50"
                onClick={this.onToggleFullscreen}>
                {
                  <IconFullScreen isFullScreen={this.state.isFullScreen}/>
                }
              </button>
            </div>

            {/* <div className="w-1/12"></div> */}
        </div>
    );
  }
}


export default BottomBar;
