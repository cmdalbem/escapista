import React from 'react';

import './Spinner.css'

// Thanks: https://codepen.io/jczimm/pen/vEBpoL
export default function () {
    return (
        <svg className="circular" viewBox="25 25 50 50">
            <circle
                cx="50"
                cy="50"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeMiterlimit="10"
                strokeWidth="3"
                className="path"
            ></circle>
        </svg>
    )
}