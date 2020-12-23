import React, { useEffect, useState } from "react";

import { withTranslation } from 'react-i18next';

import {
    isMobile
  } from "react-device-detect";

import Art from './Art.js'
import ProductHuntBadge from './ProductHuntBadge.js'

import {
    BOTTOM_BAR_HEIGHT,
    MAIN_BAR_WIDTH,
    ESCAPIST_EASING_BEZIER,
    ESCAPIST_EASING_TIMING,
    MANIFESTO_URLS
} from './constants.js';


function Welcome(props) {
    const { t, i18n } = props;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // setTimeout(() => setLoading(false), 1000);
        setLoading(false);
    }, []);

    function onStartClick() {
        setLoading(true);
        setTimeout(props.onStartClick, 2000);
    }

    const lang = i18n.language.split('-')[0];
    const manifestoUrl = MANIFESTO_URLS[lang];

    const logoTypography = 'text-lg font-logo tracking-widest uppercase font-bold';

    const slideIn = `
        transition-all transform duration-1000 ease-in-out
        ${loading ? '-translate-y-3 opacity-0' : '-translate-y-0 opacity-100'}`;

    return (
        <div>
            <div
                className="fixed z-10 pt-16 pl-16 font-body w-screen h-full text-teal-800 flex flex-col items-start justify-between"
                style={{paddingBottom: BOTTOM_BAR_HEIGHT}}
            >
                <div className={`${slideIn} flex flex-auto flex-col`}>
                    <h1 className={logoTypography}>
                        Escapista
                    </h1>

                    <div className="ml-16 flex justify-between flex-col flex-auto">
                        <div>
                            <h2 className="mt-8 max-w-xl font-heading text-teal-800 whitespace-pre-line font-extrabold text-6xl leading-tight">
                                { t('welcome-heading') }
                            </h2>

                            <div className="mt-8 max-w-sm text-lg">
                                <p className="mt-3">
                                    { t('welcome-body1') }
                                </p>

                                <p className="mt-3">
                                    { t('welcome-body2') }
                                </p>

                                <p className="mt-3">
                                    { t('welcome-body3') }
                                </p>
                            </div>
                            
                            <div className={`mt-8 ${slideIn} delay-200`}>
                                <button
                                    className="py-3 px-6 bg-teal-800 font-medium rounded text-white hover:bg-teal-800 duration-300"
                                    style={{minWidth: 120}}
                                    onClick={onStartClick}>
                                    { t('welcome-cta') }
                                </button>

                                <a
                                    href={manifestoUrl}
                                    className="py-3 px-6 ml-2 bg-white rounded font-medium hover:bg-gray-200 duration-300"
                                    target="_blank" rel="noopener noreferrer"
                                >
                                    { t('read-the-manifesto') }
                                </a>
                            </div>
                        </div>
                        
                        {
                            !isMobile && 
                            <ProductHuntBadge/>
                        }
                    </div>
                </div>
            </div>

            <div className={`overflow-hidden`}>
                <div
                    className="bg-gray-100 flex h-screen items-end justify-start w-screen"
                    style={{
                        transition: `transform ${ESCAPIST_EASING_TIMING} ${ESCAPIST_EASING_BEZIER}`,
                        transform: `translate(${MAIN_BAR_WIDTH}px, -${BOTTOM_BAR_HEIGHT}px)`,
                        paddingRight: MAIN_BAR_WIDTH,
                        paddingTop: BOTTOM_BAR_HEIGHT
                    }}>
                    <div className={`w-full transition-opacity duration-1000 delay-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                        <Art />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withTranslation()(Welcome);