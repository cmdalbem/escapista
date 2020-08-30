import React from 'react';

import { MAIN_BAR_WIDTH } from './constants.js';

import IconVolume from './IconVolume.js'


class BottomBar extends React.Component {
  render() {
    const { currentVideo, isMuted } = this.props;

    const channelTitle = currentVideo.fields['channelTitle'] && currentVideo.fields['channelTitle'][0];
    const channelUrl = currentVideo.fields['channelUrl'] && currentVideo.fields['channelUrl'][0];

    // const isReady = this.state.currentVideo;
    // let youtubeConfig, videoId, categoriesSwitcher;

    //   categoriesSwitcher = Object.keys(this.state.categories).map( id =>
    //     <button 
    //       onClick={this._onSwitchCategory}
    //       data-id={id}
    //       key={id}
    //       style={{backgroundColor: this.state.currentCategory === id ? 'white' : 'gray'}}
    //       >
    //         {this.state.categories[id].fields.title} ({this.state.categories[id].videos.length})
    //     </button>
    //   );
    
    return (
        <div 
          className="bg-white absolute left-0 bottom-0 w-full h-24 text-xs pt-3 pr-6 flex justify-between"
          style={{
            paddingLeft: MAIN_BAR_WIDTH,
            fontFamily: 'Noto Sans, sans-serif'}}
          >
            <div>
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
            
            <div>
              <button
                className="hover:opacity-50"
                onClick={this.props.onToggleMute}>
                {
                  <IconVolume isMuted={isMuted}/>
                }
              </button>
            </div>
        </div>
    );
  }
}


export default BottomBar;
