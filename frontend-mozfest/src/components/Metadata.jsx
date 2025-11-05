import React, { useState } from "react";
import toggleOnIcon from "../assets/toggle-on.svg";
import toggleOffIcon from "../assets/toggle-off.svg";

function Metadata({
  dataEnabled,
  setDataEnabled,
  authorEnabled,
  setAuthorEnabled,
  dataOrder,
  setDataOrder,
  authorOrder,
  setAuthorOrder
})  {

  return (
    <div className="flex flex-col items-center gap-6">
      <span className="text-lg font-bold">metadades</span>

      <div className="flex items-center gap-4">
        <span className="text-lg font-medium">data</span>

        <button onClick={() => setDataEnabled(!dataEnabled)}>
          <img
            src={dataEnabled ? toggleOnIcon : toggleOffIcon}
            alt="toggle data metadata"
            className="w-8 h-8"
          />
        </button>

        <div className="flex items-center gap-3">
          <button
            className={`px-3 py-1 ${dataOrder === "newest" ? "font-bold" : "opacity-50"} ${
              !dataEnabled && "opacity-30"
            }`}
            onClick={() => dataEnabled && setDataOrder("newest")}
          >
            cronològic
          </button>

          <button
            className={`px-3 py-1 ${dataOrder === "oldest" ? "font-bold" : "opacity-50"} ${
              !dataEnabled && "opacity-30"
            }`}
            onClick={() => dataEnabled && setDataOrder("oldest")}
          >
            invers
          </button>

          <button
            className={`px-3 py-1 ${dataOrder === "random" ? "font-bold" : "opacity-50"} ${
              !dataEnabled && "opacity-30"
            }`}
            onClick={() => dataEnabled && setDataOrder("random")}
          >
            random
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-lg font-medium">autor</span>

        <button onClick={() => setAuthorEnabled(!authorEnabled)}>
          <img
            src={authorEnabled ? toggleOnIcon : toggleOffIcon}
            alt="toggle author metadata"
            className="w-8 h-8"
          />
        </button>

        <div className="flex items-center gap-3">
          <button
            className={`px-3 py-1 ${authorOrder === "az" ? "font-bold" : "opacity-50"} ${
              !authorEnabled && "opacity-30"
            }`}
            onClick={() => authorEnabled && setAuthorOrder("az")}
          >
            A-Z
          </button>

          <button
            className={`px-3 py-1 ${authorOrder === "za" ? "font-bold" : "opacity-50"} ${
              !authorEnabled && "opacity-30"
            }`}
            onClick={() => authorEnabled && setAuthorOrder("za")}
          >
            Z-A
          </button>

          <button
            className={`px-3 py-1 ${authorOrder === "random" ? "font-bold" : "opacity-50"} ${
              !authorEnabled && "opacity-30"
            }`}
            onClick={() => authorEnabled && setAuthorOrder("random")}
          >
            random
          </button>
        </div>
      </div>
    </div>
  );
}

export default Metadata;
