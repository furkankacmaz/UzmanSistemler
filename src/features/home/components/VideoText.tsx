import { useMemo } from "react";
import { cn } from "@/lib/utils";

type VideoTextProps = {
  src: string;
  text: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  preload?: "auto" | "metadata" | "none";
  fontSize?: string | number;
  fontWeight?: string | number;
  textAnchor?: string;
  dominantBaseline?: string;
  fontFamily?: string;
};

function escapeXml(input: string) {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export default function VideoText({
  src,
  text,
  className,
  autoPlay = true,
  muted = true,
  loop = true,
  preload = "auto",
  fontSize = 20,
  fontWeight = "bold",
  textAnchor = "middle",
  dominantBaseline = "middle",
  fontFamily = "sans-serif",
}: VideoTextProps) {
  const maskImage = useMemo(() => {
    const responsiveFontSize = typeof fontSize === "number" ? `${fontSize}vw` : fontSize;
    const svgMask = `<svg xmlns='http://www.w3.org/2000/svg' width='100%' height='100%'><text x='50%' y='50%' font-size='${responsiveFontSize}' font-weight='${fontWeight}' text-anchor='${textAnchor}' dominant-baseline='${dominantBaseline}' font-family='${fontFamily}'>${escapeXml(text)}</text></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svgMask)}")`;
  }, [dominantBaseline, fontFamily, fontSize, fontWeight, text, textAnchor]);

  return (
    <div className={cn("relative size-full", className)}>
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
          maskPosition: "center",
          WebkitMaskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      >
        <video
          className="size-full object-cover"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          preload={preload}
          playsInline
        >
          <source src={src} />
          Your browser does not support the video tag.
        </video>
      </div>
      <span className="sr-only">{text}</span>
    </div>
  );
}