import React from 'react';

import ArtSVG from './assets/ArtSVG.js'

import { throttle } from './utils.js';

import {
    MAIN_BAR_WIDTH,
    BOTTOM_BAR_HEIGHT,
    ESCAPIST_EASING_BEZIER,
    ESCAPIST_EASING_TIMING
} from './constants.js';


class Art extends React.Component {
    constructor(props) {
        super(props);
    }

    // Inspired by Eugene Burlak
    onMouseMove(e) {
        const x = e.clientX;
        const y = e.clientY;
        const layers = document.querySelectorAll('.parallax-layer');

        for (var j = 0; j < layers.length; j++) {
            const deep = layers[j].getAttribute('parallaxDeep');
            const itemX = x / deep;
            const itemY = y / deep;
            
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
                    className="bg-gray-100 flex h-screen items-end justify-start w-screen"
                    style={{
                        transition: `transform ${ESCAPIST_EASING_TIMING} ${ESCAPIST_EASING_BEZIER}`,
                        transform: isUIVisible ? 
                            `translate(${MAIN_BAR_WIDTH}px, -${BOTTOM_BAR_HEIGHT}px)`:
                            `translate(0, 0)`,
                        paddingRight: isUIVisible && MAIN_BAR_WIDTH,
                        paddingTop: isUIVisible && BOTTOM_BAR_HEIGHT
                    }}>
                    <div className="w-full">
                        <ArtSVG/>
                    </div>
                </div>
            </div>
        );
    }
}


export default Art;
