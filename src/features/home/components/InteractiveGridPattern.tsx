import { useState } from "react";

type InteractiveGridPatternProps = {
  className?: string;
  squaresClassName?: string;
  width?: number;
  height?: number;
  squares?: [number, number];
};

export default function InteractiveGridPattern({
  className,
  squaresClassName,
  width = 40,
  height = 40,
  squares = [24, 24],
}: InteractiveGridPatternProps) {
  const [hoveredSquare, setHoveredSquare] = useState<number | null>(null);
  const [horizontal, vertical] = squares;
  const totalSquares = horizontal * vertical;

  const getRectClass = (index: number) => {
    const base =
      "stroke-gray-400/30 transition-all duration-100 ease-in-out [&:not(:hover)]:duration-1000";
    const fill = hoveredSquare === index ? "fill-gray-300/30" : "fill-transparent";
    return `${base} ${fill} ${squaresClassName ?? ""}`.trim();
  };

  return (
    <svg
      width={width * horizontal}
      height={height * vertical}
      className={`absolute inset-0 h-full w-full border border-gray-400/30 ${className ?? ""}`.trim()}
      aria-hidden="true"
    >
      {Array.from({ length: totalSquares }).map((_, index) => (
        <rect
          key={index}
          x={(index % horizontal) * width}
          y={Math.floor(index / horizontal) * height}
          width={width}
          height={height}
          className={getRectClass(index)}
          onMouseEnter={() => setHoveredSquare(index)}
          onMouseLeave={() => setHoveredSquare(null)}
        />
      ))}
    </svg>
  );
}