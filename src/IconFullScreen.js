import React from "react";

function IconFullScreen(props) {
    const { isFullScreen } = props;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="none"
            viewBox="0 0 16 16"
        >
            <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.333"
                d={isFullScreen ?
                    "M5.333 2v2c0 .736-.597 1.333-1.333 1.333H2M14 5.333h-2A1.333 1.333 0 0110.667 4V2M10.667 14v-2c0-.736.597-1.334 1.333-1.334h2M2 10.666h2c.736 0 1.333.598 1.333 1.334v2"
                    :
                    "M5.333 2h-2C2.597 2 2 2.597 2 3.333v2M14 5.333v-2C14 2.597 13.403 2 12.667 2h-2M10.667 14h2c.736 0 1.333-.597 1.333-1.334v-2M2 10.666v2C2 13.403 2.597 14 3.333 14h2"
                }
            ></path>
        </svg>
    );
}

export default IconFullScreen;
