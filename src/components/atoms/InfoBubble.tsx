import { useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";

interface InfoBubbleProps {
  info: string;
  colorMode?: "light" | "dark";
}

const InfoBubble = ({ info, colorMode }: InfoBubbleProps) => {
  const [hovered, setHovered] = useState(false);

  const color =
    colorMode === "light"
      ? "text-primary hover:text-unicoop-slate-blue bg-transparent"
      : "text-unicoop hover:text-slate-300 bg-primary";

  return (
    <div className="relative inline-block items-center">
      <FaCircleInfo
        className={`size-5 rounded-full duration-150 cursor-pointer ${color}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      <div
        className={`absolute top-full left-32 -translate-x-1/2 mt-2 p-2 w-64 bg-white text-black rounded shadow-lg z-10 ${hovered ? "" : "hidden"
          }`}
      >
        {info}
      </div>
    </div>
  );
};

export default InfoBubble;
