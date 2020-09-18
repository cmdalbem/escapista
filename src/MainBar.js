import React from 'react';
import { withTranslation } from 'react-i18next';

import { BrowserView, isMobile } from "react-device-detect";

import { BOTTOM_BAR_HEIGHT, MAIN_BAR_WIDTH } from './constants.js';


class MainBar extends React.Component {
    render() {
        const {
            t, i18n,
            categories,
            currentCategory
        } = this.props;

        const lang = i18n.language.split('-')[0];

        return (
            <div
                className={`
                    fixed left-0 top-0 z-1 h-full noto
                    text-green-900 flex flex-col justify-between
                    ${isMobile ? 'pl-6 pt-16' : 'pl-20 pt-32'}
                `}
                style={{
                    width: MAIN_BAR_WIDTH,
                    paddingBottom: BOTTOM_BAR_HEIGHT
                }}>
                <div className={`flex flex-col items-start`}>
                    {
                        Object.keys(categories).map(id =>
                            <button
                                className={`
                                    w-full text-left focus:outline-none
                                    hover:text-current focus:text-current transition-all ease-in duration-300
                                    ${isMobile ? 'py-1 text-lg' : 'py-2 text-xl'}
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

                <BrowserView>
                    <div className="flex flex-col -mb-2">
                        <a 
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://airtable.com/shrAnseaRWniVl9ar"
                            className={`
                                py-2 text-left focus:outline-none hover:text-current focus:text-current
                                text-gray-500 text-sm 
                            `}
                        >
                            { t('suggest-videos') }
                        </a>

                        {/* <button disabled className={`py-2 text-left
                            text-gray-500 text-xs
                            `}
                        >
                            { t('manifesto') }
                        </button>
                        
                        <button disabled className={`py-2 text-left
                            text-gray-500 text-xs
                            `}
                        >
                            { t('feedback') }
                        </button> */}
                    </div>
                </BrowserView>
            </div>
        );
    }
}


export default withTranslation()(MainBar);
