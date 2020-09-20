import React, { useEffect, useState } from "react";

import Art from './Art.js'

import {
    BOTTOM_BAR_HEIGHT,
    MAIN_BAR_WIDTH,
    ESCAPIST_EASING_BEZIER
} from './constants.js';

function Welcome(props) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
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
                <div className={`${slideIn} delay-300`}>
                    <h1 className={logoTypography}>
                        Escapista
                    </h1>

                    <h2 className="mt-16 font-extrabold text-6xl leading-tight">
                        Para onde você<br/>quer escapar?
                    </h2>

                    <div className="mt-12 pr-24" style={{width: MAIN_BAR_WIDTH}}>
                        <p className="mt-2">
                            Este é sua oportunidade de escapar para novos e diferentes lugares. Escolha uma categoria e deixe sua mente vagar por aí com a programação que curamos carinhosamente para você.
                        </p>

                        <p className="mt-2">
                            Deixe rolando enquanto trabalha, ponha na TV da sala ou combine com amigos para passearem juntos durante uma call.
                        </p>
                        
                    </div>
                </div>

                <div className={`${slideIn} delay-500`}>
                    <button
                        className="py-3 px-6 bg-green-700 rounded text-white hover:bg-green-800 duration-300"
                        onClick={onStartClick}>
                        Começar
                    </button>

                    <button className="py-3 px-6 ml-2 rounded hover:bg-gray-200 duration-300">
                        Manifesto
                    </button>
                </div>
            </div>

            <div className={`flex transition-opacity duration-1000 delay-300 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                <Art />
            </div>
        </div>
    );
}

export default Welcome;