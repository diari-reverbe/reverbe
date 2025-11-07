import React from "react";
import { NavLink } from "react-router-dom";
import clsx from "clsx";

const Button = ({
  children,
  variant = "primary",
  to,
  onClick,
  className,
  ...props
}) => {
  const baseStyles =
    "flex items-center justify-center rounded-md font-semibold transition-all duration-200 ease-in-out focus:outline-none align-middle px-4 py-2";

  const colorStyles = {
    primary:
      "text-[var(--secondary)] bg-[var(--primary)] rounded-full px-3 py-1.5 sm:px-5 sm:py-2 flex items-center gap-1 sm:gap-2 text-sm sm:text-base",
    secondary:
      "text-[var(--primary)] bg-[var(--secondary)] hover:bg-[var(--secondary)]/80 rounded-full px-3 py-1.5 sm:px-5 sm:py-2 flex items-center gap-1 sm:gap-2 text-sm sm:text-base",
    ghost:
      "text-[var(--secondary)] bg-transparent hover:bg-[var(--secondary)]/10 px-3 py-1.5 sm:px-5 sm:py-2 flex items-center gap-1 sm:gap-2 text-sm sm:text-base",
  };

  if (to) {
    return (
      <NavLink
        to={to}
        className={({ isActive }) =>
          clsx(
            baseStyles,
            colorStyles[isActive ? "secondary" : variant],
            className
          )
        }
        onClick={onClick}
        {...props}
      >
        {children}
      </NavLink>
    );
  }

  return (
    <button
      className={clsx(baseStyles, colorStyles[variant], className)}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
