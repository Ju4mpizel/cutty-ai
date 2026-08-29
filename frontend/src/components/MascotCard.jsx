import React from "react";

const MOOD_IMAGES = {
  happy: "/mascot/happy.png",
  bored: "/mascot/bored.png",
  analyzing: "/mascot/analyzing.png",
  confused: "/mascot/confused.png",
  shocked: "/mascot/shocked.png",
  encouraging: "/mascot/encouraging.png",
};

const MOOD_LABELS = {
  happy: "🔥 ¡Ritmo impecable!",
  bored: "😴 Se vuelve lento aquí",
  analyzing: "🧐 Analizando técnica...",
  confused: "❓ Audio/Corte confuso",
  shocked: "⚠️ Error crítico de retención",
  encouraging: "💡 ¡Buena idea, ajústala!",
};

export default function MascotCard({
  mood = "analyzing",
  score = null,
  currentTip = null,
}) {
  const imageSrc = MOOD_IMAGES[mood] || MOOD_IMAGES.analyzing;

  return (
    <div className="bg-zinc-950 border-2 border-zinc-800 rounded-3xl p-5 flex flex-col items-center text-center shadow-[4px_4px_0px_rgba(0,0,0,1)] w-full">
      {/* CONTENEDOR DE LA MASCOTA */}
      <div className="relative mb-3.5 flex items-center justify-center">
        <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-inner">
          <img
            src={imageSrc}
            alt={mood}
            className="w-32 h-32 sm:w-36 sm:h-36 object-contain transition-transform duration-300 hover:scale-105"
            style={{ imageRendering: "pixelated" }}
          />
        </div>

        {/* BADGE VIRALITY SCORE NEO-BRUTAL */}
        {score !== null && (
          <div className="absolute -bottom-2.5 bg-emerald-500 text-black font-black font-mono text-xs px-3 py-1 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] tracking-wider uppercase">
            Score: {score}/100
          </div>
        )}
      </div>

      {/* ESTADO / MOOD */}
      <span className="text-xs font-black font-mono text-emerald-400 mt-1 mb-3 uppercase tracking-wider bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
        {MOOD_LABELS[mood] || mood}
      </span>

      {/* TARJETA DE TIP EN TIEMPO REAL */}
      {currentTip ? (
        <div className="bg-zinc-900 border-2 border-zinc-800 rounded-2xl p-3.5 text-left w-full shadow-inner">
          <div className="flex items-center justify-between mb-1.5 pb-1 border-b border-zinc-800">
            <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wide">
              {currentTip.type || "TIMELINE"} • 00:
              {currentTip.timestampSeconds?.toString().padStart(2, "0") || "00"}
              s
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>

          <p className="text-xs text-zinc-100 font-bold leading-snug">
            {currentTip.critique}
          </p>

          <p className="text-[11px] text-emerald-300 mt-2.5 font-mono bg-emerald-950/80 border border-emerald-500/40 p-2 rounded-xl">
            🛠 {currentTip.suggestion}
          </p>
        </div>
      ) : (
        <p className="text-xs text-zinc-500 mt-1 font-mono italic">
          Reproduce el video para sincronizar las reacciones de Cutty en vivo.
        </p>
      )}
    </div>
  );
}
