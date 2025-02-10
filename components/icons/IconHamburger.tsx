const IconHamburger = ({
  height = "32",
  width = "32",
  className = "",
  viewBox = "0 0 32 32",
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
      <rect
        x="0.7"
        y="0.7"
        width="30.6"
        height="30.6"
        rx="15.3"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path
        d="M7.97461 9.97461H23.9746M7.97461 15.9746H23.9746M7.97461 21.9746H23.9746"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default IconHamburger;
