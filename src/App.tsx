import { useEffect, useRef, useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import gsap from "gsap";

type InteractiveGridPatternProps = {
  className?: string;
  squaresClassName?: string;
  width?: number;
  height?: number;
  squares?: [number, number];
};

function InteractiveGridPattern({
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

function Home() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) {
      return;
    }

    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }
    );
  }, []);

  return (
    <section ref={cardRef} className="mx-auto max-w-5xl p-6">
      <div className="relative mb-8 grid h-[500px] place-content-center overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900/70">
        <p className="z-10 text-center text-5xl font-medium tracking-tighter text-slate-100">
          Interactive Grid Pattern
        </p>
        <InteractiveGridPattern className="inset-0 h-[200%] skew-y-12 [mask-image:radial-gradient(350px_circle_at_center,white,transparent)]" />
      </div>
      <h1 className="mb-4 text-3xl font-bold text-slate-100">Spora Yonlendirme Uzman Sistemi</h1>
      <p className="mb-6 text-slate-300">
        Teknoloji paketi basariyla yuklendi: React 18, TypeScript, Vite, React Router,
        Tailwind, GSAP, Three.js, Fiber ve Drei.
      </p>
    </section>
  );
}

function About() {
  return (
    <section className="mx-auto max-w-5xl p-6">
      <h2 className="mb-2 text-2xl font-semibold text-slate-100">Proje Durumu</h2>
      <p className="text-slate-300">Altyapi kuruldu, gelistirmeye hazir.</p>
    </section>
  );
}

export default function App() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-slate-100">
      <header className="mx-auto flex max-w-5xl items-center gap-5 border-b border-slate-800 px-6 py-5">
        <Link className="font-semibold text-cyan-300 transition-colors hover:text-cyan-200" to="/">
          Ana Sayfa
        </Link>
        <Link className="font-semibold text-cyan-300 transition-colors hover:text-cyan-200" to="/hakkinda">
          Hakkinda
        </Link>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hakkinda" element={<About />} />
      </Routes>
    </main>
  );
}