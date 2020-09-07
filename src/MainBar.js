import React from 'react';

import { MAIN_BAR_WIDTH } from './constants.js';


class MainBar extends React.Component {
    render() {
        const categories = this.props.categories;
        const currentCategory = this.props.currentCategory;

        return (
            <div
                className="absolute left-0 top-0 h-full text-green-900"
                style={{ width: MAIN_BAR_WIDTH }}
                >
                <div
                    className="flex flex-col items-start text-lg mt-32 pl-32"
                    style={{ fontFamily: 'Noto Sans, sans-serif' }}>
                    {
                        Object.keys(categories).map(id =>
                            <button
                                className={`
                                    py-2 w-full text-left focus:outline-none
                                    hover:text-current focus:text-current transition-all ease-in duration-300
                                    ${currentCategory === id ? 'text-current' : 'text-gray-400'}
                                `}
                                onClick={this.props.onSwitchCategory}
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
