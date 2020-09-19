import React from "react";

import Art from './Art.js'

import { BOTTOM_BAR_HEIGHT, MAIN_BAR_WIDTH } from './constants.js';

function Welcome(props) {
    const logoTypography = 'text-lg noto tracking-widest uppercase font-bold';

    return (
        <div>
            <div
                className="fixed z-10 pt-16 pl-16 noto w-screen h-full text-green-900 flex flex-col items-start justify-between"
                style={{paddingBottom: BOTTOM_BAR_HEIGHT}}
            >
                <div>
                    <h1 className={logoTypography}>
                        Escapista
                    </h1>

                    <h2 className="mt-16 font-extrabold text-6xl leading-tight">
                        Para onde você<br/>quer escapar?
                    </h2>

                    <div className="mt-8 pr-24" style={{width: MAIN_BAR_WIDTH}}>
                        <p className="mt-2">
                            Este é sua oportunidade de escapar para novos e diferentes lugares. Escolha uma categoria e deixe sua mente vagar por aí com a programação que curamos carinhosamente para você.
                        </p>

                        <p className="mt-2">
                            Deixe rolando enquanto trabalha, ponha na TV da sala ou combine com amigos para passearem juntos durante uma call.
                        </p>
                        
                    </div>
                </div>

                <button className="py-3 px-6 bg-green-700 rounded text-white" onClick={props.onStartClick}>
                    Começar
                </button>
            </div>

            <Art />
        </div>
    );
}

export default Welcome;