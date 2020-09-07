import React from "react";

function IconVolume(props) {
    const { isMuted } = props;

    return (
        isMuted ?
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
                    d="M6.667 3.333L3.333 6H.667v4h2.666l3.334 2.667V3.333z"
                    clipRule="evenodd"
                ></path>
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.333"
                    d="M14.667 6l-4 4M10.667 6l4 4"
                ></path>
            </svg>
            :
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="16"
                fill="none"
                viewBox="0 0 17 16"
            >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.333"
                    d="M8 3.333L4.667 6H2v4h2.667L8 12.667V3.333z"
                    clipRule="evenodd"
                ></path>
                <path
                    fill="currentColor"
                    d="M13.852 2.815a.667.667 0 00-.943.943l.943-.943zm-.943 9.427a.667.667 0 10.943.943l-.943-.943zm-1.41-7.073a.667.667 0 00-.943.942l.943-.942zm-.943 4.713a.667.667 0 00.943.943l-.943-.943zm2.353-6.124a6 6 0 010 8.484l.943.943a7.333 7.333 0 000-10.37l-.943.943zm-2.353 2.353a2.667 2.667 0 010 3.77l.943.944a4 4 0 000-5.656l-.943.942z"
                ></path>
            </svg>
    );
}

export default IconVolume;
