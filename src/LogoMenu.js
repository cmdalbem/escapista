import React from 'react';
import { Fade as Hamburger } from 'hamburger-react'
import { isMobile } from "react-device-detect";

import { ESCAPIST_EASING_BEZIER } from './constants.js'


export default function LogoMenu(props) {
  const {
    isUIVisible,
    onToggleUI
  } = props;

  // const logoTypography = 'text-2xl unna';
  const logoTypography = 'text-lg font-heading tracking-widest uppercase font-bold';

  return (
    <button
      className={`
        fixed top-0 left-0 z-1 flex items-center pt-1 
        cursor-pointer hover:opacity-75 focus:opacity-75
        ${isMobile ? 'mt-2 ml-2' : 'mt-8 ml-16'}
        ${isUIVisible ? 'text-green-900' : 'text-white'}`
      }
      onClick={onToggleUI}
    >
      <Hamburger
        size={16}
        duration={1}
        easing={ESCAPIST_EASING_BEZIER}
        toggled={isUIVisible}
      />

      <h1
        className={`
            inline-block leading-6 ${logoTypography} text-white
            ${isMobile ? 'ml-2' : 'ml-4'}
          `}
        // style={{
        //   transition: isUIVisible
        //     ? `color .5s ${ESCAPIST_EASING_BEZIER} 1.3s`
        //     : `color .5s ${ESCAPIST_EASING_BEZIER} 1.3s`
        // }}
      >
        Escapista
      </h1>
    </button>
  )
}