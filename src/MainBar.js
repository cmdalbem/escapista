import React from 'react';
import { withTranslation } from 'react-i18next';

import { isMobile } from "react-device-detect";

import { MAIN_BAR_WIDTH } from './constants.js';


class MainBar extends React.Component {
    render() {
        const {
            i18n,
            categories,
            currentCategory
        } = this.props;

        const lang = i18n.language.split('-')[0];

        return (
            <div
                className="fixed left-0 top-0 z-1 h-full text-green-900"
                style={{ width: MAIN_BAR_WIDTH }}
                >
                <div
                    className={`
                        flex flex-col items-start noto
                        ${isMobile ? 'pl-16 mt-16' : 'pl-24 mt-32'}
                    `}>
                    {
                        Object.keys(categories).map(id =>
                            <button
                                className={`
                                    w-full text-left focus:outline-none
                                    hover:text-current focus:text-current transition-all ease-in duration-300
                                    ${isMobile ? 'py-1 text-xl' : 'py-0 text-5xl font-light tracking-tighter'}
                                    ${currentCategory === id ? 'text-current' : 'text-gray-400'}
                                `}
                                onClick={this.props.onSwitchCategory}
                                data-id={id}
                                key={id}
                            >{
                                lang === 'es' 
                                    ? categories[id].fields['title-es']
                                : lang === 'en' 
                                    ? categories[id].fields['title-en']
                                    : categories[id].fields['title']
                            }</button>
                        )
                    }
                </div>
            </div>
        );
    }
}


export default withTranslation()(MainBar);
