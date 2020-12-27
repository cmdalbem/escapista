import React from 'react';
import { withTranslation } from 'react-i18next';

import * as typeformEmbed from '@typeform/embed'

import { BrowserView, isMobile } from "react-device-detect";

import {
    BOTTOM_BAR_HEIGHT,
    MAIN_BAR_WIDTH,
    TYPEFORM_IDS,
    AIRTABLE_URLS
} from './constants.js';


const SECONDARY_NAV_STYLE = `
    py-1 text-left focus:outline-none hover:text-current focus:text-current
    text-gray-400 text-sm
`;

class MainBar extends React.Component {
    typeformPopup;

    constructor(props) {
        super(props);

        this.onFeedbackClick = this.onFeedbackClick.bind(this);

        this.state = {
            fadeOutDiffs: false
        }
    }

    componentDidMount() {
        const lang = this.props.i18n.language.split('-')[0];
        const typeformUrl = 'https://form.typeform.com/to/' + TYPEFORM_IDS[lang];

        this.typeformPopup = typeformEmbed.makePopup(typeformUrl, {
            mode: 'drawer_right',
            hideHeaders: true,
            hideFooters: true,
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.channels !== this.props.channels) {
            setTimeout(() => {
                this.setState({ fadeOutDiffs: true });
            }, 3000);
        }
    }

    onFeedbackClick() {
        this.typeformPopup.open();
    }
    render() {
        const {
            t, i18n,
            channels,
            currentCategory
        } = this.props;

        if (!channels || !currentCategory) {
            return null;
        }

        const lang = i18n.language.split('-')[0];
        const airtableUrl = AIRTABLE_URLS[lang];

        return (
            <div
                className={`
                    fixed left-0 top-0 z-1 h-full font-body
                    text-teal-800 flex flex-col justify-between
                    ${isMobile ? 'pl-6 pt-16' : 'pl-20 pt-32'}
                `}
                style={{
                    width: MAIN_BAR_WIDTH,
                    paddingBottom: BOTTOM_BAR_HEIGHT
                }}>
                <div className={`flex flex-col items-start`}>
                    {
                        Object.keys(channels).map(k =>
                            <button
                                className={`
                                    flex items-baseline w-full text-left focus:outline-none
                                    hover:text-current focus:text-current transition-all ease-in duration-300
                                    ${isMobile ? 'py-1 text-lg' : 'py-2 text-xl'}
                                    ${currentCategory === k ? 'text-current' : 'text-gray-400'}
                                `}
                                onClick={this.props.onSwitchCategory}
                                data-id={channels[k].slug}
                                key={k}
                            >
                                {
                                    lang === 'es'
                                        ? channels[k]['title-es']
                                        : lang === 'en'
                                            ? channels[k]['title-en']
                                            : channels[k]['title']
                                }
                                {
                                    !isMobile &&
                                    <sup className="ml-1 text-xs">
                                        {channels[k].length}
                                        {
                                            channels[k].diff ?
                                            // <span className="bg-orange-600 text-white font-bold py-0 px-1 rounded-full text-xs">
                                            <span className={`
                                                text-teal-600 font-bold py-0 px-1 text-xs
                                                ${this.state.fadeOutDiffs ? 'opacity-0' : 'opacity-100'}`}
                                                style={{transition: 'opacity 10s ease-in'}}>
                                                <span className="font-logo">↑</span>{ channels[k].diff }
                                            </span>
                                            : null
                                        }
                                    </sup>
                                }
                            </button>
                        )
                    }
                </div>

                <BrowserView>
                    <div className="flex flex-col -mb-2 mt-4">
                        <button
                            className={SECONDARY_NAV_STYLE}
                            onClick={this.props.onAboutClick}
                        >
                            { t('about') }
                        </button>

                        <button
                            className={SECONDARY_NAV_STYLE}
                            onClick={this.onFeedbackClick}
                        >
                            { t('feedback') }
                        </button>

                        <a 
                            target="_blank" rel="noopener noreferrer"
                            href={airtableUrl}
                            className={SECONDARY_NAV_STYLE}
                        >
                            { t('suggest') }
                        </a>

                        <a 
                            target="_blank" rel="noopener noreferrer"
                            href={'https://www.buymeacoffee.com/cmdalbem'}
                            className={SECONDARY_NAV_STYLE}
                        >
                            { t('buymeacoffee') }
                        </a>
                    </div>
                </BrowserView>
            </div>
        );
    }
}


export default withTranslation()(MainBar);
