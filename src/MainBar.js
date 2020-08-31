import React from 'react';

import { MAIN_BAR_WIDTH } from './constants.js';


class MainBar extends React.Component {
    render() {
        // const isReady = this.state.currentVideo;
        // let youtubeConfig, videoId, categoriesSwitcher;
        const categories = this.props.categories;
        const currentCategory = this.props.currentCategory;

        return (
            <div
                className="bg-white absolute left-0 top-0 h-full"
                style={{
                    width: MAIN_BAR_WIDTH
                }}>
                <div className="mt-8 ml-12 absolute">
                    <button
                        className="p-4 hover:opacity-50"
                        onClick={this.props.onToggleUI}>
                        ✕
                    </button>
                </div>

                <div className="mt-12 pl-32">
                    <h1
                        // className="tracking-widest uppercase inline-block"
                        className="inline-block text-2xl leading-none"
                        style={{ fontFamily: 'Unna, sans-serif' }}>
                        Escapista
                    </h1>
                </div>

                <div
                    className="flex flex-col items-start text-lg mt-16 pl-32"
                    style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                    {
                        Object.keys(categories).map(id =>
                            <button
                                className={`pb-4 hover:opacity-100 ${currentCategory === id ? 'opacity-100' : 'opacity-25'}`}
                                onClick={this.props.onSwitchCategory}
                                data-id={id}
                                key={id}
                            >
                                {categories[id].fields.title}
                                <span className="ml-2 opacity-25">
                                    {categories[id].videos.length}
                                </span>
                            </button>
                        )
                    }
                </div>
            </div>
        );
    }
}


export default MainBar;
