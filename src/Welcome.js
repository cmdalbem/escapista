import React, { useEffect, useState } from "react";

import { withTranslation } from 'react-i18next';

import Art from './Art.js'

import {
    BOTTOM_BAR_HEIGHT,
    MAIN_BAR_WIDTH,
    ESCAPIST_EASING_BEZIER,
    ESCAPIST_EASING_TIMING,
} from './constants.js';


function Welcome(props) {
    const { t } = props;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // setTimeout(() => setLoading(false), 1000);
        setLoading(false);
    }, []);

    function onStartClick() {
        setLoading(true);
        setTimeout(props.onStartClick, 2000);
    }

    const logoTypography = 'text-lg noto tracking-widest uppercase font-bold';

    const slideIn = `
        transition-all transform duration-1000 ease-in-out
        ${loading ? '-translate-y-3 opacity-0' : '-translate-y-0 opacity-100'}`;

    return (
        <div>
            <div
                className="fixed z-10 pt-16 pl-16 noto w-screen h-full text-green-900 flex flex-col items-start justify-between"
                style={{paddingBottom: BOTTOM_BAR_HEIGHT}}
            >
                <div className={`${slideIn}`}>
                    <h1 className={logoTypography}>
                        Escapista
                    </h1>

                    <h2 className="mt-16 max-w-xl font-extrabold text-6xl leading-tight">
                        { t('welcome-heading') }
                    </h2>

                    <div className="mt-12 pr-24 text-sm" style={{width: MAIN_BAR_WIDTH}}>
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
                </div>

                <div className={`${slideIn} delay-200`}>
                    <button
                        className="py-3 px-6 bg-green-700 rounded text-white hover:bg-green-800 duration-300"
                        onClick={onStartClick}>
                        { t('welcome-cta') }
                    </button>

                    <a
                        href="https://www.notion.so/Manifesto-dac06fb54a264b719a299f06705f15bf"
                        className="py-3 px-6 ml-2 rounded hover:bg-gray-200 duration-300"
                        target="_blank" rel="noopener noreferrer"
                    >
                        { t('manifesto') }
                    </a>
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