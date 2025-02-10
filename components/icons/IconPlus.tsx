const IconPlus = ({
    height = '18',
    width = '19',
    className = '',
    viewBox = '0 0 18 19',
}: {
    height?: string
    width?: string
    className?: string
    viewBox?: string
}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox={viewBox}
            fill="none"
            className={className}
            xmlns="http://www.w3.org/2000/svg"
        >
            <g clipPath="url(#clip0_169_1205)">
                <path
                    d="M18 0.491211H0V18.4912H18V0.491211Z"
                    fill="white"
                    fillOpacity="0.01"
                />
                <path
                    d="M9.02255 4.24121L9.00879 14.7412"
                    stroke="currentColor"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                />
                <path
                    d="M3.75 9.49121H14.25"
                    stroke="currentColor"
                    strokeLinecap="square"
                    strokeLinejoin="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_169_1205">
                    <rect
                        width="18"
                        height="18"
                        fill="white"
                        transform="translate(0 0.491211)"
                    />
                </clipPath>
            </defs>
        </svg>
    )
}

export default IconPlus
