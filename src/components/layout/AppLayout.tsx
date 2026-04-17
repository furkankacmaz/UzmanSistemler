import { NavLink, Outlet } from "react-router-dom";
import GravityParticles from "@/components/effects/GravityParticles";

function linkClass({ isActive }: { isActive: boolean }) {
  return [
    "rounded-lg px-3 py-2 text-sm font-semibold tracking-wide transition-colors",
    isActive
      ? "bg-blue-100 text-blue-700"
      : "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
  ].join(" ");
}

export default function AppLayout() {
  return (
    <main className="relative min-h-screen bg-[#EFF2F7] text-[#212226]">
      {/* Antigravity-style particle background */}
      <GravityParticles />

      <header className="sticky top-0 z-20 border-b border-gray-200/80 bg-white/80 backdrop-blur">
        <nav className="mx-auto flex max-w-5xl items-center gap-2 px-4 py-4 sm:px-6">
          <NavLink className={linkClass} end to="/">
            Ana Sayfa
          </NavLink>
          <NavLink className={linkClass} to="/test">
            Test Akisi
          </NavLink>
          <NavLink className={linkClass} to="/sonuc">
            Sonuc
          </NavLink>
          <NavLink className={linkClass} to="/hakkinda">
            Hakkinda
          </NavLink>
        </nav>
      </header>
      <div className="relative z-10">
        <Outlet />
      </div>
    </main>
  );
}