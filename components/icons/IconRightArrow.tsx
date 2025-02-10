const IconRightArrow = ({
  height = "12",
  width = "17",
  className = "",
  viewBox = "0 0 17 12",
}: {
  height?: string;
  width?: string;
  className?: string;
  viewBox?: string;
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
      <g clipPath="url(#clip0_169_1229)">
        <path
          d="M10.773 12L13.9955 6.62022H0V5.37978H13.982L13.9955 5.4027V5.37978H13.982L10.773 0L16.9483 6.01348L10.773 12Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_169_1229">
          <rect width="16.9483" height="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IconRightArrow;
