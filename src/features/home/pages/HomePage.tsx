import { useEffect, useRef } from "react";
import gsap from "gsap";
import InteractiveGridPattern from "@/features/home/components/InteractiveGridPattern";

export default function HomePage() {
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
        <p className="z-10 text-center text-4xl font-medium tracking-tighter text-slate-100 sm:text-5xl">
          Spora Yonlendirme Sistemi
        </p>
        <InteractiveGridPattern className="inset-0 h-[200%] skew-y-12 [mask-image:radial-gradient(350px_circle_at_center,white,transparent)]" />
      </div>

      <h1 className="mb-4 text-3xl font-bold text-slate-100">Spora Yonlendirme Uzman Sistemi</h1>
      <p className="mb-6 text-slate-300">
        Sistem, 7-14 yas arasi cocuklarin boy, kilo, kulac ve motorik profil
        verilerini analiz ederek guvenli ve aciklanabilir spor onerileri uretir.
      </p>
    </section>
  );
}