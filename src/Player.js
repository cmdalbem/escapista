import React from 'react';
import YouTube from 'react-youtube';

import { MAIN_BAR_WIDTH } from './constants.js';


class Player extends React.Component {
    playerRef;

    constructor(props) {
        super(props);

        this.onVideoEnd = this.onVideoEnd.bind(this);
        this.onVideoError = this.onVideoError.bind(this);

        this.playerRef = React.createRef();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isMuted !== this.props.isMuted) {
          if (this.props.isMuted) {
            this.playerRef.current.internalPlayer.mute();
          } else {
            this.playerRef.current.internalPlayer.unMute();
          }
        }
      }

    onVideoEnd() {
        console.debug('onVideoEnd');
        this.props.sync();
    }

    onVideoError(e) {
        console.warn('onVideoError', e);
        // this.props.sync();
    }

    // Source: https://developers.google.com/youtube/iframe_api_reference#onStateChange
    //   -1 (unstarted)
    //   0 (ended)
    //   1 (playing)
    //   2 (paused)
    //   3 (buffering)
    //   5 (video cued).
    // onStateChange(e) {
    //   console.warn('onStateChange', e);

    //   switch(e.data) {
    //     case 0:
    //       this.nextVideo();
    //       break;
    //   }
    // }

    render() {
        const { videoStart, videoId, isUIVisible } = this.props;

        const youtubeConfig = {
            playerVars: {
                autoplay: 1,
                controls: 0,
                disablekb: 1,
                enablejsapi: 1,
                modestbranding: 1,
                origin: 'https://slowproject.app/',
                start: videoStart
            },
        };

        return (
            <div style={{
                // position: 'absolute',
                // top: '0',
                // right: '0',
                // left: isUIVisible ? MAIN_BAR_WIDTH : 0,
                // bottom: isUIVisible ? 96 : 0,
                // transition: 'all 1s',
                // zIndex: -1
            }}>
                <div className="video-background">
                    <div className="video-foreground">
                        <YouTube
                            videoId={videoId}
                            opts={youtubeConfig}
                            onEnd={this.onVideoEnd}
                            onError={this.onVideoError}
                            ref={this.playerRef}
                        />
                    </div>
                </div>
            </div>
        );
    }
}


export default Player;
