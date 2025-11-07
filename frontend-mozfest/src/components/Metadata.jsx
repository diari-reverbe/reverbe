import React from "react";
import ToggleOnIcon from "./icons/ToggleOnIcon";
import ToggleOffIcon from "./icons/ToggleOffIcon";
import NumericAscendingIcon from "./icons/NumericAscendingIcon";
import NumericDescendingIcon from "./icons/NumericDescendingIcon";
import RandomIcon from "./icons/RandomIcon";
import Button from "./Button";
import clsx from "clsx";


function Metadata({
  dataEnabled,
  setDataEnabled,
  authorEnabled,
  setAuthorEnabled,
  dataOrder,
  setDataOrder,
  authorOrder,
  setAuthorOrder
}) {


  return (
    <div className="flex flex-col items-center gap-6">
      <span className="text-lg font-bold">metadata</span>

      <div className="flex items-center gap-4">
        <span className="text-lg font-medium">date</span>

        <button className="cursor-pointer" onClick={() => setDataEnabled(!dataEnabled)}>
          {dataEnabled ? (<ToggleOnIcon className="w-8 h-8" />) : (<ToggleOffIcon className="w-8 h-8" />)}

        </button>

        <div className="flex items-center gap-3">
          <button
            className={`hidden md:inline px-3 py-1 ${dataOrder === "newest" ? "font-bold overline decoration-[3px]" : "opacity-40"} ${!dataEnabled && "opacity-40"
              }`}
            onClick={() => dataEnabled && setDataOrder("newest")}
          >
            newest
          </button>

          <button
            className={`hidden md:inline px-3 py-1 ${dataOrder === "oldest" ? "font-bold overline decoration-[3px]" : "opacity-40"} ${!dataEnabled && "opacity-40"
              }`}
            onClick={() => dataEnabled && setDataOrder("oldest")}
          >
            oldest
          </button>

          <button
            className={`hidden md:inline px-3 py-1 ${dataOrder === "random" ? "font-bold overline decoration-[3px]" : "opacity-40"} ${!dataEnabled && "opacity-40"
              }`}
            onClick={() => dataEnabled && setDataOrder("random")}
          >
            random
          </button>

          <Button
            variant="primary"
            className={clsx(
              "md:hidden flex flex-col items-center p-2",
              dataOrder === "newest" ? "text-[var(--secondary)]" : "opacity-40",
              !dataEnabled && "opacity-40"
            )}
            onClick={() => dataEnabled && setDataOrder("newest")}
          >
            <NumericAscendingIcon className={clsx(dataOrder === "newest" ? "text-[var(--secondary)]" : "opacity-40", "w-6 h-6")} />
            {dataOrder === "newest" && dataEnabled && (
              <span className="w-2 h-2 rounded-full bg-[var(--secondary)] mt-1"></span>
            )}
          </Button>

          <Button
            variant="primary"
            className={clsx(
              "md:hidden flex-col items-center p-2",
              dataOrder === "oldest" ? "text-[var(--secondary)]" : "opacity-40",
              !dataEnabled && "opacity-40"
            )}
            onClick={() => dataEnabled && setDataOrder("oldest")}
          >
            <NumericDescendingIcon className={clsx(dataOrder === "oldest" ? "text-[var(--secondary)]" : "opacity-40", "w-6 h-6")} />
            {dataOrder === "oldest" && dataEnabled && (
              <span className="w-2 h-2 rounded-full bg-[var(--secondary)] mt-1"></span>
            )}
          </Button>

          <Button
            variant="primary"
            className={clsx(
              "md:hidden flex-col items-center p-2",
              dataOrder === "random" ? "text-[var(--secondary)]" : "opacity-40",
              !dataEnabled && "opacity-40"
            )}
            onClick={() => dataEnabled && setDataOrder("random")}
          >
            <RandomIcon className={clsx(dataOrder === "random" ? "text-[var(--secondary)]" : "opacity-40", "w-5 h-6")} />
            {dataOrder === "random" && dataEnabled && (
              <span className="w-2 h-2 rounded-full bg-[var(--secondary)] mt-1"></span>
            )}
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-lg font-medium">author</span>

        <button className="cursor-pointer" onClick={() => setAuthorEnabled(!authorEnabled)}>
          {authorEnabled ? (<ToggleOnIcon className="w-8 h-8" />) : (<ToggleOffIcon className="w-8 h-8" />)}
        </button>

        <div className="flex items-center gap-3">
          <button
            className={`hidden md:inline px-3 py-1 ${authorOrder === "az" ? "font-bold overline decoration-[3px]" : "opacity-40"} ${!authorEnabled && "opacity-40"
              }`}
            onClick={() => authorEnabled && setAuthorOrder("az")}
          >
            A-Z
          </button>

          <button
            className={`hidden md:inline px-3 py-1 ${authorOrder === "za" ? "font-bold overline decoration-[3px]" : "opacity-40"} ${!authorEnabled && "opacity-40"
              }`}
            onClick={() => authorEnabled && setAuthorOrder("za")}
          >
            Z-A
          </button>

          <button
            className={`hidden md:inline px-3 py-1 ${authorOrder === "random" ? "font-bold overline decoration-[3px]" : "opacity-40"} ${!authorEnabled && "opacity-40"
              }`}
            onClick={() => authorEnabled && setAuthorOrder("random")}
          >
            random
          </button>

          <div className="flex md:hidden justify-center items-center gap-3">
            <button
              className={`px-3 py-1 ${authorOrder === "az" ? "font-bold" : "opacity-40"} ${!authorEnabled && "opacity-40"
                }`}
              onClick={() => authorEnabled && setAuthorOrder("az")}
            >
              A-Z
              {authorOrder === "az" && authorEnabled && (
                <span className="w-2 h-2 rounded-full bg-[var(--secondary)] mt-1 block mx-auto"></span>
              )}
            </button>

            <button
              className={`px-3 py-1 ${authorOrder === "za" ? "font-bold" : "opacity-40"} ${!authorEnabled && "opacity-40"
                }`}
              onClick={() => authorEnabled && setAuthorOrder("za")}
            >
              Z-A
              {authorOrder === "za" && authorEnabled && (
                <span className="w-2 h-2 rounded-full bg-[var(--secondary)] mt-1 block mx-auto"></span>
              )}
            </button>

            <button
              className={`flex flex-col items-center p-2 ${authorOrder === "random" ? "font-bold" : "opacity-40"
                } ${!authorEnabled && "opacity-40"}`}
              onClick={() => authorEnabled && setAuthorOrder("random")}
            >
              <RandomIcon className="w-5 h-6" />
              {authorOrder === "random" && authorEnabled && (
                <span className="w-2 h-2 rounded-full bg-[var(--secondary)] mt-1"></span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Metadata;