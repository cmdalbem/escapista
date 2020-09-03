import React from "react";

function IconFullScreen(props) {
    const { isFullScreen } = props;

    return (
        isFullScreen ?
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 16 16"
            >
                <path
                    stroke="#333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.33"
                    d="M2.667 9.334h4v4M13.333 6.667h-4v-4M9.333 6.667L14 2M2 14l4.667-4.666"
                ></path>
            </svg>
            :
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 16 16"
            >
                <path
                    stroke="#333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.33"
                    d="M10 2h4v4M6 14H2v-4M14 2L9.333 6.667M2 14l4.667-4.666"
                ></path>
            </svg>
    );
}

export default IconFullScreen;
