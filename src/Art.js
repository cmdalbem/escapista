import React from 'react';

import {
    isMobile
  } from "react-device-detect";

import ArtSVG from './assets/ArtSVG.js'

import { throttle } from './utils.js';

class Art extends React.Component {
    // Inspired by Eugene Burlak
    onMouseMove(e) {
        const x = e.clientX;
        const y = e.clientY;
        const layers = document.querySelectorAll('.parallax-layer');

        const xMult = 1;
        const yMult = 3;

        for (var j = 0; j < layers.length; j++) {
            const deep = layers[j].getAttribute('parallaxdeep');
            const itemX = x * xMult / deep;
            const itemY = y * yMult / deep;
            
            layers[j].style.transform = 'translateX(' + itemX + '%) translateY(' + itemY + '%)';
        }
    }

    componentDidMount() {
        if (!isMobile) {
            document.addEventListener(
                'mousemove',
                throttle(this.onMouseMove, 10),
                { capture: true, passive: true }
            );
        }
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.onMouseMove);
    }

    render() {
        return (
            <ArtSVG/>
        );
    }
}


export default Art;
