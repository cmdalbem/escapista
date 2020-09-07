import React from 'react';

import './Spinner.css'

// Thanks: https://codepen.io/jczimm/pen/vEBpoL
export default function () {
    return (
        <svg class="circular" viewBox="25 25 50 50">
            <circle
                class="path"
                cx="50"
                cy="50"
                r="20"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-miterlimit="10"
            />
        </svg>
    )
}