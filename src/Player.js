import React from 'react';
import YouTube from 'react-youtube';

import {
    MAIN_BAR_WIDTH,
    BOTTOM_BAR_HEIGHT,
    LIVENESS_CHECK_MS,
    VIDEO_TRANSITION_MS
} from './constants.js';


class Player extends React.Component {
    playerRef;

    constructor(props) {
        super(props);

        this.onEnd = this.onEnd.bind(this);
        this.onError = this.onError.bind(this);
        this.onReady = this.onReady.bind(this);
        this.onStateChange = this.onStateChange.bind(this);

        this.playerRef = React.createRef();

        this.state = {
            playerStatus: undefined,
            videoStart: this.props.videoStart,
            videoEnd: this.props.videoEnd,
            videoId: this.props.videoId
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isMuted !== this.props.isMuted) {
            this.updateVolume();
        }

        if (prevProps.videoId !== this.props.videoId) {
            this.setState({
                playerStatus: undefined
            })

            //   Delay update of Player data to give time to animation transition
            setTimeout(() => {
                this.setState({
                    videoStart: this.props.videoStart,
                    videoEnd: this.props.videoEnd,
                    videoId: this.props.videoId
                })
            }, VIDEO_TRANSITION_MS);
        }
    }

    onReady(e) {
        this.updateVolume();

        // Just to make sure (also turns it up after computer sleeping)
        setInterval(() => {
            if (this.playerRef.current) {
                this.playerRef.current.internalPlayer.playVideo();
                console.debug('.');
            }
        }, LIVENESS_CHECK_MS);

        // Inject Hotjar whitelist attribute
        const iframeEl = document.querySelector('iframe');
        if (iframeEl && iframeEl.setAttribute) {
            iframeEl.setAttribute('data-hj-allow-iframe','')
        }
    }

    updateVolume() {
        if (this.playerRef.current) {
            if (this.props.isMuted) {
                this.playerRef.current.internalPlayer.mute();
            } else {
                this.playerRef.current.internalPlayer.unMute();
            }
        }
    }

    onEnd() {
        console.debug('onEnd');
        this.props.sync();
    }

    onError(e) {
        const msg = {
             2: 'The request contains an invalid parameter value. For example, this error occurs if you specify a video ID that does not have 11 characters, or if the video ID contains invalid characters, such as exclamation points or asterisks.'
            ,5: 'The requested content cannot be played in an HTML5 player or another error related to the HTML5 player has occurred.'
            ,100: 'The video requested was not found. This error occurs when a video has been removed (for any reason) or has been marked as private.'
            ,101: 'The owner of the requested video does not allow it to be played in embedded players.'
            ,150: 'The owner of the requested video does not allow it to be played in embedded players.'
        };

        console.warn('YouTube Player error', e.data, msg[e.data]);

        this.props.skipVideo();
    }

    onStateChange(e) {
        // Source: https://developers.google.com/youtube/iframe_api_reference#onStateChange
        const msg = [
            'unstarted',// -1
            'ended',    // 0
            'playing',  // 1
            'paused',   // 2
            'buffering',// 3
            '',         // 4
            'video cued'// 5
        ];
        const statusStr = msg[e.data + 1];

        console.debug('YouTube Player status:', e.data, statusStr);

        this.setState({
            playerStatus: statusStr
        });

        // // If status is 'unstarted', trigger a timeout check, otherwise clear it
        // if (e.data === -1) {
        //     this.livenessCheckTimeout = setTimeout(() => {
        //         this.playerRef.current.internalPlayer.getPlayerState()
        //             .then(result => {
        //                 console.debug('state', result);
        //             })
        //     }, TIMEOUT_MS)
        // } else {
        //     clearTimeout(this.livenessCheckTimeout);
        // }
    }

    render() {
        const { isUIVisible } = this.props;

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
                start: this.state.videoStart,
                end: this.state.videoEnd
            },
        };

        return (
            <div className="overflow-hidden">
                <div
                    className="video-background cursor-pointer"
                    style={{
                        transition: 'transform 1.8s cubic-bezier(0.65, 0, 0.35, 1)',
                        transform: isUIVisible ? 
                            `translate(${MAIN_BAR_WIDTH}px, -${BOTTOM_BAR_HEIGHT}px)` :
                            `translate(0, 0)`
                    }}
                    onClick={this.props.onToggleUI}>
                    <div className="absolute w-full h-full bg-gray-200 animate-pulse"/>
                    
                    <div className={`video-foreground
                        transition-opacity ease-in-out duration-${VIDEO_TRANSITION_MS}
                        ${this.state.playerStatus === 'playing' ? 'opacity-100' : 'opacity-0'}
                    `}>
                        <YouTube
                            videoId={this.state.videoId}
                            opts={youtubeConfig}
                            onEnd={this.onEnd}
                            onError={this.onError}
                            onReady={this.onReady}
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
