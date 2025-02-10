const IconClose = ({
    height = '32',
    width = '32',
    className = '',
    viewBox = '0 0 32 32',
    variant = 'default',
}: {
    height?: string
    variant?: 'default' | 'cross'
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
            {variant === 'default' && (
                <rect
                    x="0.7"
                    y="0.7"
                    width="30.6"
                    height="30.6"
                    rx="15.3"
                    stroke="currentColor"
                    strokeWidth="1.4"
                />
            )}
            <g clipPath="url(#clip0_71_759)">
                <g clipPath="url(#clip1_71_759)">
                    <path
                        d="M28 4H4V28H28V4Z"
                        fill="white"
                        fillOpacity="0.01"
                    />
                    <path
                        d="M11 11L21 21"
                        stroke="currentColor"
                        strokeLinecap="square"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M11 21L21 11"
                        stroke="currentColor"
                        strokeLinecap="square"
                        strokeLinejoin="round"
                    />
                </g>
            </g>
            <defs>
                <clipPath id="clip0_71_759">
                    <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(4 4)"
                    />
                </clipPath>
                <clipPath id="clip1_71_759">
                    <rect
                        width="24"
                        height="24"
                        fill="white"
                        transform="translate(4 4)"
                    />
                </clipPath>
            </defs>
        </svg>
    )
}

export default IconClose
