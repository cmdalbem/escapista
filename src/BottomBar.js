import React from 'react';

import { MAIN_BAR_WIDTH } from './constants.js';


class BottomBar extends React.Component {
  render() {
    const currentVideo = this.props.currentVideo;

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
          className="bg-white absolute left-0 bottom-0 w-full h-24 text-sm pt-2"
          style={{paddingLeft: MAIN_BAR_WIDTH}}
          >
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
    );
  }
}


export default BottomBar;
