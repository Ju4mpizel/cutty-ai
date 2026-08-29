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
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col items-center text-center shadow-xl">
      <div className="relative mb-4">
        <img
          src={imageSrc}
          alt={mood}
          className="w-36 h-36 object-contain pixelated transition-transform duration-300 hover:scale-105"
          style={{ imageRendering: "pixelated" }}
        />
        {score !== null && (
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-black font-black text-xs px-2.5 py-1 rounded-full shadow">
            Score: {score}
          </div>
        )}
      </div>

      <span className="text-sm font-semibold text-emerald-400 mb-2 uppercase tracking-wider">
        {MOOD_LABELS[mood] || mood}
      </span>

      {currentTip ? (
        <div className="bg-zinc-800/80 border border-zinc-700/60 rounded-xl p-3 text-left w-full">
          <p className="text-xs text-zinc-400 font-semibold mb-1 uppercase tracking-wide">
            {currentTip.type} • Segundo {currentTip.timestampSeconds}s
          </p>
          <p className="text-sm text-zinc-100 font-medium">
            {currentTip.critique}
          </p>
          <p className="text-xs text-emerald-300 mt-2 font-mono bg-emerald-950/40 p-1.5 rounded">
            🛠 {currentTip.suggestion}
          </p>
        </div>
      ) : (
        <p className="text-xs text-zinc-400 mt-2">
          Reproduce el video para ver las reacciones de Cutty en tiempo real.
        </p>
      )}
    </div>
  );
}
