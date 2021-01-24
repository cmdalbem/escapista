import React from 'react';
import YouTube from 'react-youtube';

import { withTranslation } from 'react-i18next';

import Spinner from './Spinner.js'
import Analytics from './Analytics.js'

import {
    MAIN_BAR_WIDTH,
    BOTTOM_BAR_HEIGHT,
    LIVENESS_CHECK_MS,
    VIDEO_TRANSITION_MS,
    ESCAPIST_EASING_BEZIER,
    ESCAPIST_EASING_TIMING,
    UNSTARTED_TIMEOUT_TO_MUTE,
    UNSTARTED_TIMEOUT_GIVEUP
} from './constants.js';

const defaultPlayerVars = {
    autoplay: 1,
    controls: 0,
    disablekb: 1,
    enablejsapi: 1,
    modestbranding: 1,
    fs: 0,
    loop: 0,
    rel: 0,
    muted: 1,
    origin: 'https://slowproject.app/'
};


class Player extends React.Component {
    playerRef;

    constructor(props) {
        super(props);

        this.onEnd = this.onEnd.bind(this);
        this.onError = this.onError.bind(this);
        this.onReady = this.onReady.bind(this);
        this.onStateChange = this.onStateChange.bind(this);
        this.onPlaybackQualityChange = this.onPlaybackQualityChange.bind(this);
        this.gameLoop = this.gameLoop.bind(this);

        this.playerRef = React.createRef();

        this.state = {
            playerStatus: undefined
        }

        this.updateChannelData();
    }

    updateChannelData() {
        const channelData = this.props.channelData;
        if (channelData && channelData.currentVideo) {
            const videoId = channelData.currentVideo.fields['id'];
            const videoEnd = channelData.currentVideo.fields.duration * 60;
    
            const guideCreatedAt = new Date(this.props.guideCreatedAt);
            const videoStartOffset = Math.ceil((new Date() - guideCreatedAt) / 1000);
            const videoStart = channelData.videoStart + videoStartOffset;
    
            // Delay update of Player data to give time to animation transition
            setTimeout(() => {
                this.setState({
                    videoId,
                    playerOpts: {
                        playerVars: {
                            ...defaultPlayerVars,
                            start: videoStart,
                            end: videoEnd
                        },
                    }
                })
            }, VIDEO_TRANSITION_MS);
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.isMuted !== this.props.isMuted ||
            prevProps.volume !== this.props.volume) {
            this.updateVolume();
        }

        if (prevProps.channelData !== this.props.channelData) {
            this.setState({
                playerStatus: undefined,
                videoId: undefined
            })

            this.updateChannelData();
        }
    }

    onReady(e) {
        this.updateVolume();

        if (this.gameLoopInterval) {
            console.debug('clear game loop interval');
            clearInterval(this.gameLoopInterval);
        }

        this.gameLoopInterval = setInterval(this.gameLoop, LIVENESS_CHECK_MS);

        this.consecutiveUnstarted = 0;
    }

    gameLoop() {
        if (this.playerRef.current) {
            let opts = {};

            // If video play failed we need to manually send to Analytics its data
            if (this.state.playerStatus === 'error') {
                const channelData = this.props.channelData;
                if (channelData) {
                    opts = {
                        video_title: this.props.channelData.currentVideo.fields.title,
                        video_url: this.props.channelData.currentVideo.fields.url,
                    }
                }
            }

            Analytics.event('player_status_' + this.state.playerStatus, opts);

            if (this.state.playerStatus === 'unstarted') {
                this.consecutiveUnstarted += 1;
                console.debug('consecutiveUnstarted', this.consecutiveUnstarted);

                if (this.consecutiveUnstarted > UNSTARTED_TIMEOUT_TO_MUTE) {
                    console.debug('force set muted');
                    this.props.setMuted();

                    if (this.consecutiveUnstarted > UNSTARTED_TIMEOUT_GIVEUP) {
                        this.setState({playerStatus: 'error'});
                    }
                }
            } else if(this.state.playerStatus === undefined) {
                // Edge case that seem to happen on videos that were disabled
                this.setState({playerStatus: 'error'});
            } else {
                this.consecutiveUnstarted = 0;
            }

            // Just to make sure (also turns it up after computer sleeping)
            this.playerRef.current.internalPlayer.playVideo();

            // // Update progress bar
            // this.playerRef.current.internalPlayer.getCurrentTime()
            //     .then(time => {
            //         const total = this.state.videoEnd;
            //         const percent = ((time/total) * 100).toFixed(2);
            //         const progressBar = document.querySelector('#progressBar');
            //         if (progressBar) {
            //             progressBar.style.width = percent + '%';
            //         }
            //     });
        }
    }

    updateVolume() {
        if (this.playerRef.current) {
            this.playerRef.current.internalPlayer.setVolume(this.props.volume*100);

            if (this.props.isMuted) {
                this.playerRef.current.internalPlayer.mute();
            } else {
                this.playerRef.current.internalPlayer.unMute();
            }
        }
    }

    onEnd() {
        console.debug('onEnd');
        this.props.onVideoEnd();
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

        this.setState({
            playerStatus: 'error'
        });
        
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

        // Force captions off
        const player = e.target;
        player.unloadModule('captions');
        player.unloadModule('cc');
    }

    onPlaybackQualityChange(e) {
        console.debug('onPlaybackQualityChange', e.data);
    }

    render() {
        const { isUIVisible, t } = this.props;
        
        return (
            <div className="overflow-hidden">
                <div
                    className={
                        `video-background overflow-hidden transition-opacity duration-1000
                        ${isUIVisible ? 'opacity-75 hover:opacity-100' : 'opacity-100'}`}
                    style={{
                        transition: `transform ${ESCAPIST_EASING_TIMING} ${ESCAPIST_EASING_BEZIER}, opacity 300ms ease-out`,
                        transform: isUIVisible ? 
                            `translate(${MAIN_BAR_WIDTH}px, -${BOTTOM_BAR_HEIGHT}px)`:
                            `translate(0, 0)`,
                        cursor: isUIVisible ? 'zoom-in': '',
                    }}
                    onClick={isUIVisible ? this.props.onPlayerClick : undefined}>
                    
                    <div
                        className="absolute w-full h-full bg-gray-100 flex items-center justify-center"
                        style={{
                            paddingRight: isUIVisible && MAIN_BAR_WIDTH,
                            paddingTop: isUIVisible && BOTTOM_BAR_HEIGHT
                        }}
                    >
                        {
                            this.state.playerStatus === 'error' ?
                                <div className="max-w-xs text-center text-gray-500">
                                    {t('video-error')}
                                </div>
                            : this.state.playerStatus !== 'playing' &&
                                <div className="h-10 w-10 text-gray-400">
                                    <Spinner />
                                </div>
                        }
                    </div>
                    
                    {
                        this.state.videoId &&
                        <div className={`video-foreground
                            transition-opacity ease-in-out duration-${VIDEO_TRANSITION_MS}
                            ${this.state.playerStatus === 'playing' ? 'opacity-100' : 'opacity-0'}
                        `}>
                            <YouTube
                                videoId={this.state.videoId}
                                opts={this.state.playerOpts}
                                onEnd={this.onEnd}
                                onError={this.onError}
                                onReady={this.onReady}
                                onStateChange={this.onStateChange}
                                onPlaybackQualityChange={this.onPlaybackQualityChange}
                                ref={this.playerRef}
                            />
                        </div>
                    }
                </div>
            </div>
        );
    }
}


export default withTranslation()(Player);
