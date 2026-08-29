import React, { useState } from "react";

export default function EditingKitCard({ kit, lang = "es" }) {
  const [copiedText, setCopiedText] = useState(null);

  if (!kit) return null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  return (
    <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-5 flex flex-col gap-4 shadow-xl backdrop-blur-sm w-full">
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">🧰</span>
          <h3 className="font-bold text-xs tracking-wider text-zinc-100 uppercase">
            {lang === "es"
              ? "Kit de Assets para CapCut / Premiere"
              : "CapCut / Premiere Asset Kit"}
          </h3>
        </div>
        <span className="text-[10px] font-semibold bg-pink-950/40 text-pink-400 border border-pink-500/30 px-2.5 py-0.5 rounded-full">
          {lang === "es" ? "Recomendados por IA" : "AI Curated"}
        </span>
      </div>

      {/* 4 Columnas horizontales sin scrollbars nativas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        {/* SFX */}
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-3 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider pb-1.5 border-b border-zinc-800/60">
            <span>🔊</span> {lang === "es" ? "Efectos de Sonido" : "SFX"}
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            {kit.sfx?.slice(0, 3).map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleCopy(item.name)}
                className="flex items-center justify-between p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800/80 transition text-left cursor-pointer group"
                title={lang === "es" ? "Clic para copiar" : "Click to copy"}
              >
                <div className="overflow-hidden pr-1">
                  <p className="text-xs font-bold text-zinc-200 group-hover:text-emerald-400 truncate">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-zinc-400 leading-tight mt-0.5 truncate">
                    {item.useCase}
                  </p>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono group-hover:text-zinc-300 shrink-0 ml-1">
                  {copiedText === item.name ? "✓" : "Copiar"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* TIPOGRAFÍAS */}
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-3 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wider pb-1.5 border-b border-zinc-800/60">
            <span>✍️</span> {lang === "es" ? "Tipografías" : "Fonts"}
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            {kit.fonts?.slice(0, 3).map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleCopy(item.name)}
                className="flex items-center justify-between p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800/80 transition text-left cursor-pointer group"
                title={lang === "es" ? "Clic para copiar" : "Click to copy"}
              >
                <div className="overflow-hidden pr-1">
                  <p className="text-xs font-bold text-zinc-200 group-hover:text-cyan-400 truncate">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-zinc-400 leading-tight mt-0.5 truncate">
                    {item.style}
                  </p>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono group-hover:text-zinc-300 shrink-0 ml-1">
                  {copiedText === item.name ? "✓" : "Copiar"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* EFECTOS */}
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-3 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider pb-1.5 border-b border-zinc-800/60">
            <span>✨</span> {lang === "es" ? "Efectos Visuales" : "Effects"}
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            {kit.effects?.slice(0, 3).map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleCopy(item.name)}
                className="flex items-center justify-between p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800/80 transition text-left cursor-pointer group"
                title={lang === "es" ? "Clic para copiar" : "Click to copy"}
              >
                <div className="overflow-hidden pr-1">
                  <p className="text-xs font-bold text-zinc-200 group-hover:text-amber-400 truncate">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-zinc-400 leading-tight mt-0.5 truncate">
                    {item.moment}
                  </p>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono group-hover:text-zinc-300 shrink-0 ml-1">
                  {copiedText === item.name ? "✓" : "Copiar"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* PALETA DE COLOR */}
        <div className="bg-zinc-950/60 border border-zinc-800/80 rounded-2xl p-3 flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 uppercase tracking-wider pb-1.5 border-b border-zinc-800/60">
            <span>🎨</span>{" "}
            {lang === "es" ? "Colores Subtítulos" : "Color Palette"}
          </div>
          <div className="flex flex-col gap-1.5 flex-1">
            {kit.colorPalette?.slice(0, 3).map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleCopy(item.hex)}
                className="flex items-center justify-between p-2 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800/80 transition text-left cursor-pointer group"
                title={
                  lang === "es" ? "Clic para copiar Hex" : "Click to copy Hex"
                }
              >
                <div className="flex items-center gap-2 overflow-hidden pr-1">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0 shadow-sm"
                    style={{ backgroundColor: item.hex }}
                  />
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-zinc-200 truncate">
                      {item.label}
                    </p>
                    <p className="text-[10px] text-zinc-400 font-mono truncate">
                      {item.hex}
                    </p>
                  </div>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono group-hover:text-zinc-300 shrink-0 ml-1">
                  {copiedText === item.hex ? "✓" : "Copiar"}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
