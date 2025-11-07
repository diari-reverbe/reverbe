import React from "react";

const ToggleOnIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <title>Toggle</title>
    <g fill="currentColor">
      <rect x="0" y="5" width="23" height="14" rx="2" />
      <circle
        cx="17"
        cy="12"
        r="4"
        fill="var(--primary)"
        stroke="var(--primary)"
        strokeWidth="1.5"
      />
    </g>
  </svg>
);

export default ToggleOnIcon;
