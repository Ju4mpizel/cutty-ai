import React from "react";

export default function Header({
  lang,
  setLang,
  onReset,
  isAuditingView = false,
}) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/85 backdrop-blur-md">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* LOGO & BRANDING */}
        <div
          onClick={onReset}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-zinc-900 border-2 border-zinc-700 shadow-[2px_2px_0px_rgba(16,185,129,0.9)] group-hover:shadow-[3px_3px_0px_rgba(16,185,129,1)] group-hover:translate-x-[-1px] group-hover:translate-y-[-1px] transition-all">
            <img
              src="/mascot/happy.png"
              alt="Cutty Mascot"
              className="w-7 h-7 object-contain drop-shadow"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-base tracking-tighter text-white uppercase group-hover:text-emerald-400 transition-colors">
                CUTTY
                <span className="text-emerald-400 font-mono text-xs ml-0.5">
                  .AI
                </span>
              </span>
              <span className="text-[9px] font-mono font-extrabold uppercase px-1.5 py-0.5 rounded bg-emerald-950/70 border border-emerald-500/40 text-emerald-400">
                v3.5 Flash
              </span>
            </div>
            <span className="text-[10px] text-zinc-500 font-mono tracking-tight hidden sm:block">
              Viral Short-Form Video Copilot
            </span>
          </div>
        </div>

        {/* CONTROLES / STATUS */}
        <div className="flex items-center gap-3">
          {/* Status Badge */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-lg bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_6px_#10B981]" />
            <span>Vertex AI Global</span>
          </div>

          {/* SELECTOR DE IDIOMA CON BANDERITAS */}
          {!isAuditingView ? (
            <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded-xl p-1 shadow-[2px_2px_0px_rgba(39,39,42,1)] gap-1">
              <button
                onClick={() => setLang("en")}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold font-mono rounded-lg transition-all cursor-pointer ${
                  lang === "en"
                    ? "bg-emerald-500 text-black shadow-sm font-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <span>🇺🇸</span>
                <span>EN</span>
              </button>
              <button
                onClick={() => setLang("es")}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-bold font-mono rounded-lg transition-all cursor-pointer ${
                  lang === "es"
                    ? "bg-emerald-500 text-black shadow-sm font-black"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <span>🇪🇸</span>
                <span>ES</span>
              </button>
            </div>
          ) : (
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 uppercase flex items-center gap-1.5">
              <span>{lang === "es" ? "🇪🇸" : "🇺🇸"}</span>
              <span>{lang === "es" ? "ES" : "EN"}</span>
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
