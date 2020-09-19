import React from 'react';

import ArtSVG from './assets/Art.js'

import { throttle } from './utils.js';

import {
    MAIN_BAR_WIDTH,
    BOTTOM_BAR_HEIGHT,
    LIVENESS_CHECK_MS,
    VIDEO_TRANSITION_MS,
    ESCAPIST_EASING_BEZIER,
    ESCAPIST_EASING_TIMING
} from './constants.js';


class Art extends React.Component {
    constructor(props) {
        super(props);
    }

    onMouseMove(e) {
        const selectors = {
            layers: '.parallax-layer',
            deep: 'parallaxDeep'
        };
        
        const x = e.clientX;
        const y = e.clientY;
        const layers = document.querySelectorAll(selectors.layers);

        // console.debug(x,y);
        console.debug(layers);

        for (var j = 0; j < layers.length; j++) {
            const deep = layers[j].getAttribute(selectors.deep);
            const disallow = layers[j].getAttribute('data-parallax-disallow');
            const itemX = (disallow && disallow === 'x') ? 0 : x / deep;
            const itemY = (disallow && disallow === 'y') ? 0 : y / deep;
            
            console.debug(deep);
            console.debug(itemX,itemY);

            if (disallow && disallow === 'both') return;

            layers[j].style.transform = 'translateX(' + itemX + '%) translateY(' + itemY + '%)';
        }
    }

    componentDidMount() {
        document.addEventListener(
            'mousemove',
            throttle(this.onMouseMove, 10),
            { capture: true, passive: true }
        );
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.onMouseMove);
    }

    render() {
        // const { isUIVisible } = this.props;
        const isUIVisible = true;

        return (
            <div className="overflow-hidden">
                <div
                    className="absolute w-full h-full bg-gray-100 flex items-end justify-start"
                    style={{
                        transition: `transform ${ESCAPIST_EASING_TIMING} ${ESCAPIST_EASING_BEZIER}`,
                        transform: isUIVisible ? 
                            `translate(${MAIN_BAR_WIDTH}px, -${BOTTOM_BAR_HEIGHT}px)`:
                            `translate(0, 0)`,
                        paddingRight: isUIVisible && MAIN_BAR_WIDTH,
                        paddingTop: isUIVisible && BOTTOM_BAR_HEIGHT
                    }}>
                    
                    {/* <div className="h-10 w-10 text-gray-400"> */}
                        <ArtSVG/>
                    {/* </div> */}
                </div>
            </div>
        );
    }
}


export default Art;
