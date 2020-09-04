import React from 'react';

import { MAIN_BAR_WIDTH } from './constants.js';
import { slugify } from './utils.js';


class MainBar extends React.Component {
    render() {
        const categories = this.props.categories;
        const currentCategory = this.props.currentCategory;

        return (
            <div
                className="absolute left-0 top-0 h-full"
                style={{ width: MAIN_BAR_WIDTH }}
                >
                <div
                    className="flex flex-col items-start text-lg mt-32 pl-32"
                    style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                    {
                        Object.keys(categories).map(id =>
                            <button
                                className={`
                                    py-2 w-full text-left
                                    hover:opacity-100 transition-opacity duration-300
                                    ${currentCategory === id ? 'opacity-100' : 'opacity-25'}
                                `}
                                onClick={this.props.onSwitchCategory}
                                // data-id={slugify(categories[id].fields.title)}
                                data-id={id}
                                key={id}
                            >
                                { categories[id].fields.title }
                            </button>
                        )
                    }
                </div>
            </div>
        );
    }
}


export default MainBar;
