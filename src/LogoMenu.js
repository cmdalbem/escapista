import React from 'react';
import { Fade as Hamburger } from 'hamburger-react'
import { isMobile } from "react-device-detect";

import { ESCAPIST_EASING_BEZIER } from './constants.js'


export default function LogoMenu(props) {
  const {
    isUIVisible,
    onToggleUI
  } = props;

  return (
    <div
      className={`
        flex items-center pt-1 absolute z-1
        cursor-pointer hover:opacity-75
        ${isMobile ? 'mt-4 ml-2' : 'mt-8 ml-12'}
        ${isUIVisible ? 'text-green-900' : 'text-white'}`
      }
      onClick={onToggleUI}
    >
      <Hamburger
        size={16}
        duration={1}
        easing={`${ESCAPIST_EASING_BEZIER}`}
        toggled={isUIVisible}
      />

      <h1
        className={`
            inline-block text-2xl leading-6
            ${isMobile ? 'ml-2' : 'ml-8'}
          `}
        style={{
          fontFamily: 'Unna, sans-serif',
          transition: isUIVisible
            ? `color 1s ${ESCAPIST_EASING_BEZIER} 1s`
            : `color 1s ${ESCAPIST_EASING_BEZIER} 1s`
        }}
      >
        Escapista
      </h1>
    </div>
  )
}