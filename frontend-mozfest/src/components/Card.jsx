import React, { useEffect, useState, useMemo } from "react";
import Button from "./Button";
import Modal from "./Modal";
import clsx from "clsx";
import { useTheme } from "../hooks/useThemeContext";
import parse from "html-react-parser";


export default function Card({ data, variant = "scroll", dataEnabled = false, authorEnabled = false }) {
  const collapsible = variant === "postit";
  const { theme } = useTheme();
  const [open, setOpen] = useState(!collapsible);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [localColors, setLocalColors] = useState({
    primary: "var(--white)",
    secondary: "var(--blue)",
  });

  const [revColors, setRevColors] = useState([]);

  const generateRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    const saturation = Math.random() * 100;
    const lightness = Math.random() * 100;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  useEffect(() => {
    let interval;

    const randomizeColors = () => {
      const primary = generateRandomColor();
      let secondary;
      do {
        secondary = generateRandomColor();
      } while (secondary === primary);
      setLocalColors({ primary, secondary });

      const newRevColors =
        data.reverberacions?.map(() => generateRandomColor()) || [];
      setRevColors(newRevColors);
    };

    switch (theme) {
    case "canviant":
      randomizeColors();
      interval = setInterval(randomizeColors, 2000);
      break;

    case "fosc":
      setLocalColors({
        primary: "var(--darkgray)",
        secondary: "var(--babyblue)",
      });
      setRevColors(data.reverberacions?.map(() => "hsl(0, 0%, 25%)") || []);
      break;

    case "contrast":
      setLocalColors({
        primary: "var(--yellow)",
        secondary: "var(--black)",
      });
      setRevColors(data.reverberacions?.map(() => "hsl(0, 0%, 10%)") || []);
      break;

    case "normal":
    default:
      setLocalColors({
        primary: "var(--white)",
        secondary: "var(--blue)",
      });
      setRevColors(data.reverberacions?.map(() => "hsl(0, 0%, 95%)") || []);
      break;
  }


    return () => clearInterval(interval);
  }, [theme, data.reverberacions]);

  const getContrastColor = (bgColor) => {
    if (!bgColor.includes("hsl")) {
      return "#fff";
    }

    const match = bgColor.match(/\d+(\.\d+)?/g);
    if (!match) return "#fff";
    const l = parseFloat(match[2]);
    return l > 60 ? "#000" : "#fff";
  };

  const textColor = useMemo(() => {
    if (theme === "normal") return "var(--blue)";
    if (theme === "contrast") return "var(--black)";
    return getContrastColor(localColors.primary);
  }, [theme, localColors]);

  const formatDate = (iso) =>
    new Date(iso).toLocaleString("ca-ES", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const truncateText = (text, maxWords = 20) => {
    const words = text.split(" ");
    return words.length > maxWords
      ? words.slice(0, maxWords).join(" ") + "..."
      : text;
  };

  const postitColors = {
    normal: [
      "bg-yellow-200 border-yellow-300",
      "bg-pink-200 border-pink-300",
      "bg-green-200 border-green-300",
      "bg-blue-200 border-blue-300",
      "bg-purple-200 border-purple-300",
    ],
    fosc: [
      "bg-yellow-800 border-yellow-700",
      "bg-pink-800 border-pink-700",
      "bg-green-800 border-green-700",
      "bg-blue-800 border-blue-700",
      "bg-purple-800 border-purple-700",
    ],
    contrast: [
      "bg-yellow-300 border-yellow-400",
      "bg-red-400 border-red-500",
      "bg-cyan-300 border-cyan-400",
      "bg-green-300 border-green-400",
      "bg-purple-300 border-purple-400",
    ]
  };
  const randomColor = useMemo(() => {
    const set = postitColors[theme] || postitColors.normal;
    return set[Math.floor(Math.random() * set.length)];
  }, [theme]);

  const style =
    variant === "postit"
      ? {}
       : theme === "normal"
    ? {
        backgroundColor: "var(--gray)",
        borderColor: "var(--blue)",
        color: "var(--blue)",
        transition: "background-color 0.8s ease, color 0.8s ease",
      }
      : {
          backgroundColor: localColors.primary,
          borderColor: localColors.secondary,
          color: textColor,
          transition: "background-color 0.8s ease, color 0.8s ease",
        };

  return (
    <>
    <div
      className={clsx(
        "rounded-md border transition duration-200 ease-in-out p-4 sm:p-6 md:p-8 shadow-md",
        variant === "scroll" && "hover:shadow-md space-y-4",
        variant === "single" && "max-w-3xl w-full mx-auto space-y-6 md:p-10",
        variant === "postit" &&
          clsx(
            randomColor,
            "shadow-lg aspect-square max-w-xs flex flex-col justify-between hover:shadow-xl overflow-hidden"
          )
      )}
      style={style}
    >
      <div className="flex-1 overflow-hidden">
        <h3
          className="text-base sm:text-lg md:text-xl font-semibold"
          style={{ color: textColor }}
        >
          {data.assumpte}
        </h3>
        <p
          className="text-xs sm:text-sm opacity-80 mb-3"
          style={{ color: textColor }}
        >
          {data.remitent} · {formatDate(data.data)}
        </p>
<div
  className={clsx(
    "text-sm sm:text-base leading-relaxed whitespace-pre-line",
    collapsible && "overflow-hidden text-ellipsis h-24"
  )}
  style={{ color: textColor }}
>
  {collapsible
    ? truncateText(data.cos.replace(/<[^>]+>/g, ""), 25)
    : parse(data.cos || "")}
</div>
{data.adjunts && (
  <div className="mt-3">
    {/\.(jpg|jpeg|png|gif|webp)$/i.test(data.adjunts) ? (
      <img
        src={data.adjunts}
        alt="Adjunt"
        className="max-w-full rounded-md mt-2"
      />
    ) : (
      <a
        href={data.adjunts}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline break-all"
      >
        {data.adjunts}
      </a>
    )}
  </div>
)}

      </div>

      {variant === "postit" && (
        <div className="mt-1 flex justify-end">
          <Button variant="ghost" onClick={() => setIsModalOpen(true)}>+</Button>
        </div>
      )}
    {open && data.reverberacions?.length > 0 && (
  <div
    className={clsx(
      "mt-4 space-y-3 border-t border-gray-100 pt-3",
      variant === "postit" && "overflow-auto max-h-48"
    )}
  >
    {data.reverberacions.map((rev, index) => {
      const revBg = revColors[index] || "hsl(0,0%,95%)";
      const revText = getContrastColor(revBg);

      return (
        <div
          key={rev.id}
          className="border rounded-lg p-3"
          style={{
            backgroundColor: revBg,
            color: revText,
            borderColor: "rgba(0,0,0,0.1)",
            transition: "background-color 0.8s ease, color 0.8s ease",
          }}
        >
          <h4 className="text-sm font-medium mb-1">{rev.assumpte}</h4> 
          <p
            className={clsx(
              "text-xs opacity-70 mt-2",
              !dataEnabled && !authorEnabled && "hidden"
            )}
          >
            {dataEnabled && formatDate(rev.data)}
            {dataEnabled && authorEnabled && " · "}
            {authorEnabled && rev.remitent}
          </p>
          {rev.adjunts && (
  <div className="mt-2">
    {/\.(jpg|jpeg|png|gif|webp)$/i.test(rev.adjunts) ? (
      <img
        src={rev.adjunts}
        alt="Adjunt"
        className="max-w-full rounded-md mt-2"
      />
    ) : (
      <a
        href={rev.adjunts}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline break-all"
      >
        {rev.adjunts}
      </a>
    )}
  </div>
)}

          <pre className="whitespace-pre-wrap text-sm">{rev.cos}</pre>
        </div>
      );
    })}
  </div>
)}

    </div>
     {isModalOpen && (
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className="text-lg font-bold mb-2">{data.assumpte}</h2>
          <p className="text-sm text-gray-500 mb-4">
            {data.remitent} · {formatDate(data.data)}
          </p>
          <pre className="whitespace-pre-wrap text-sm leading-relaxed">
            {data.cos}
          </pre>
        </Modal>
      )}
    </>
  );
}
