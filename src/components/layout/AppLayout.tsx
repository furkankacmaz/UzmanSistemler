import { NavLink, Outlet } from "react-router-dom";

function linkClass({ isActive }: { isActive: boolean }) {
  return [
    "rounded-lg px-3 py-2 text-sm font-semibold tracking-wide transition-colors",
    isActive ? "bg-cyan-500/15 text-cyan-200" : "text-cyan-300 hover:text-cyan-200",
  ].join(" ");
}

export default function AppLayout() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-slate-100">
      <header className="sticky top-0 z-20 border-b border-slate-800/80 bg-slate-950/70 backdrop-blur">
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
      <Outlet />
    </main>
  );
}