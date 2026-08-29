import React from "react";

export default function Header({ lang, setLang, onReset }) {
  return (
    <header className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50 px-6 lg:px-12 py-3.5 flex items-center justify-between">
      {/* Logo clicable para regresar a la landing */}
      <button
        onClick={onReset}
        className="flex items-center gap-3 cursor-pointer group text-left"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-black font-black text-lg shadow-lg shadow-emerald-950/50 group-hover:scale-105 transition-transform">
          C
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base tracking-tight text-white group-hover:text-emerald-400 transition-colors">
              Cutty AI
            </span>
            <span className="text-[10px] bg-zinc-800 text-emerald-400 font-mono font-bold px-2 py-0.5 rounded-full border border-zinc-700">
              v1.0 Beta
            </span>
          </div>
          <p className="text-[10px] text-zinc-400 font-medium">
            AI Director Copilot for Short-Form Video
          </p>
        </div>
      </button>

      {/* Acciones del Header */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-3 py-1 rounded-full text-[11px] text-zinc-400 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Powered by Gemini 3.6 Flash
        </div>

        {/* Switch Idioma */}
        <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-xl p-1 gap-1 shadow-inner">
          <button
            onClick={() => setLang("es")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              lang === "es"
                ? "bg-emerald-500 text-black shadow font-bold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            🇪🇸 ES
          </button>
          <button
            onClick={() => setLang("en")}
            className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              lang === "en"
                ? "bg-emerald-500 text-black shadow font-bold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            🇺🇸 EN
          </button>
        </div>
      </div>
    </header>
  );
}
