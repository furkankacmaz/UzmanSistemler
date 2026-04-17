import { useEffect, useRef } from "react";
import gsap from "gsap";
import VideoText from "@/features/home/components/VideoText";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const cardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
      <div className="relative mb-8 flex h-[360px] items-center justify-center overflow-hidden">
        <VideoText
          src="https://cdn.magicui.design/ocean-small.webm"
          text="AXIOM"
          className="absolute inset-0 opacity-80"
          fontSize={16}
          fontWeight={800}
        />
      </div>

      <h1 className="mb-4 text-3xl font-bold text-gray-900">Spora Yonlendirme Uzman Sistemi</h1>
      <p className="mb-6 text-gray-500">
        Sistem, 7-14 yas arasi cocuklarin boy, kilo, kulac ve motorik profil
        verilerini analiz ederek guvenli ve aciklanabilir spor onerileri uretir.
      </p>

      <button
        className="rounded-md border border-blue-500 bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
        onClick={() => navigate("/test")}
        type="button"
      >
        Teste Basla
      </button>
    </section>
  );
}