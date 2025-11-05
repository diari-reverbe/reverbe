
import React, { useState, useRef, useEffect } from "react";
import Navbar from "./Navbar";
import Button from "./Button";
import filterIcon from "../assets/filter-icon.svg";
import { useTheme } from "../hooks/useThemeContext";
import Metadata from "./Metadata";
import Next from "./Next";

function Header({
  dataEnabled,
  setDataEnabled,
  authorEnabled,
  setAuthorEnabled,
  dataOrder,
  setDataOrder,
  authorOrder,
  setAuthorOrder
}) {
  const [open, setOpen] = useState(false);
  const { theme, setTheme, randomizeColors } = useTheme();
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-(--primary) text-(--secondary) transition-colors duration-500 fixed top-0 left-0 w-full shadow-sm z-50">
      <div className="flex items-center justify-between px-4 py-2 h-14">
        <button
          ref={buttonRef}
          onClick={() => setOpen(true)}
          aria-label="Toggle navigation and filters"
          className="p-1 z-50 relative"
        >
          <img src={filterIcon} alt="Filter icon" className="w-10 h-10" />
        </button>

        <div className="flex justify-center flex-1">
          <Navbar />
        </div>

        <div className="w-10" />
      </div>

      {open && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 w-full max-h-[80vh] overflow-y-auto animate-fade-in-down bg-(--primary) z-40"
        >
          <div className="flex flex-col items-center justify-center gap-8 p-6">
            <div className="flex flex-col items-center gap-2">
              <span className="text-lg font-bold">estil</span>
              <div className="flex items-center gap-3 relative">
                <Button
                  variant="primary"
                  className={theme === "normal" ? "overline decoration-[3px]" : ""}
                  onClick={() => setTheme("normal")}
                >
                  clar
                </Button>

                <Button
                  variant="primary"
                  className={theme === "canviant" ? "overline decoration-[3px]" : ""}
                  onClick={() => {
                    setTheme("canviant");
                    randomizeColors();
                  }}
                >
                  canviant
                </Button>

                <Button
                  variant="primary"
                  className={theme === "fosc" ? "overline decoration-[3px]" : ""}
                  onClick={() => setTheme("fosc")}
                >
                  fosc
                </Button>

                <Button
                  variant="primary"
                  className={theme === "contrast" ? "overline decoration-[3px]" : ""}
                  onClick={() => setTheme("contrast")}
                >
                  alt contrast
                </Button>
              </div>
            </div>

            <Metadata
              dataEnabled={dataEnabled}
              setDataEnabled={setDataEnabled}
              authorEnabled={authorEnabled}
              setAuthorEnabled={setAuthorEnabled}
              dataOrder={dataOrder}
              setDataOrder={setDataOrder}
              authorOrder={authorOrder}
              setAuthorOrder={setAuthorOrder}
            />
            <Next />
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
