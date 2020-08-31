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
    onStateChange(e) {
      const statuses = [
        'unstarted',
        'ended',
        'playing',
        'paused',
        'buffering',
        '',
        'video cued'
      ];

      console.debug('YouTube Player status:', e.data, statuses[e.data+1]);
    }

    render() {
        const { videoStart, videoId, isUIVisible } = this.props;

        const youtubeConfig = {
            playerVars: {
                autoplay: 1,
                controls: 0,
                disablekb: 1,
                enablejsapi: 1,
                modestbranding: 1,
                fs: 0,
                loop: 0,
                rel: 0,
                showinfo: 0,
                autohide: 1,
                origin: 'https://slowproject.app/',
                start: videoStart
            },
        };

        return (
            <div className="overflow-hidden">
                <div
                    className="video-background cursor-pointer"
                    style={{
                        transition: 'transform 1.8s cubic-bezier(0.65, 0, 0.35, 1)',
                        transform: isUIVisible ? 
                            `translate(${MAIN_BAR_WIDTH}px, -96px)` :
                            `translate(0, 0)`
                    }}
                    onClick={this.props.onToggleUI}
                    >
                    <div className="video-foreground">
                        <YouTube
                            videoId={videoId}
                            opts={youtubeConfig}
                            onEnd={this.onVideoEnd}
                            onError={this.onVideoError}
                            onStateChange={this.onStateChange}
                            ref={this.playerRef}
                        />
                    </div>
                </div>
            </div>
        );
    }
}


export default Player;
