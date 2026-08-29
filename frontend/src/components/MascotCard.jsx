import React from "react";
import { motion } from "framer-motion";

const MOOD_IMAGES = {
  happy: "/mascot/happy.png",
  bored: "/mascot/bored.png",
  analyzing: "/mascot/analyzing.png",
  confused: "/mascot/confused.png",
  shocked: "/mascot/shocked.png",
  encouraging: "/mascot/encouraging.png",
};

const MOOD_LABELS = {
  es: {
    happy: "🔥 ¡Ritmo impecable!",
    bored: "😴 Se vuelve lento aquí",
    analyzing: "🧐 Analizando técnica...",
    confused: "❓ Audio/Corte confuso",
    shocked: "⚠️ Error crítico de retención",
    encouraging: "💡 ¡Buena idea, ajústala!",
  },
  en: {
    happy: "🔥 Flawless Pacing!",
    bored: "😴 Retention Drop Here",
    analyzing: "🧐 Analyzing Technique...",
    confused: "❓ Confusing Audio/Cut",
    shocked: "⚠️ Critical Hook Flaw",
    encouraging: "💡 Great Concept, Polish It!",
  },
};

export default function MascotCard({
  mood = "analyzing",
  score = null,
  currentTip = null,
  lang = "en",
}) {
  const imageSrc = MOOD_IMAGES[mood] || MOOD_IMAGES.analyzing;
  const labels = MOOD_LABELS[lang] || MOOD_LABELS.en;
  const moodText = labels[mood] || mood;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-zinc-950 border-2 border-zinc-800 rounded-3xl p-5 flex flex-col items-center text-center shadow-[4px_4px_0px_rgba(0,0,0,1)] w-full"
    >
      {/* MASCOT VISUAL CONTAINER */}
      <div className="relative mb-3.5 flex items-center justify-center">
        <div className="p-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-inner">
          <motion.img
            key={mood}
            initial={{ scale: 0.8, rotate: -4 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            src={imageSrc}
            alt={mood}
            className="w-32 h-32 sm:w-36 sm:h-36 object-contain"
            style={{ imageRendering: "pixelated" }}
          />
        </div>

        {/* SCORE BADGE ANIMADO */}
        {score !== null && (
          <motion.div
            initial={{ scale: 0, y: 10 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 400 }}
            className="absolute -bottom-2.5 bg-emerald-500 text-black font-black font-mono text-xs px-3 py-1 rounded-xl border-2 border-black shadow-[2px_2px_0px_#000] tracking-wider uppercase"
          >
            Score: {score}/100
          </motion.div>
        )}
      </div>

      {/* DYNAMIC MOOD BADGE */}
      <motion.span
        key={moodText}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs font-black font-mono text-emerald-400 mt-1 mb-3 uppercase tracking-wider bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full"
      >
        {moodText}
      </motion.span>

      {/* REAL-TIME TIMELINE TIP */}
      {currentTip ? (
        <motion.div
          key={currentTip.timestampSeconds + currentTip.critique}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900 border-2 border-zinc-800 rounded-2xl p-3.5 text-left w-full shadow-inner"
        >
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
        </motion.div>
      ) : (
        <p className="text-xs text-zinc-500 mt-1 font-mono italic">
          {lang === "es"
            ? "Reproduce el video para sincronizar las reacciones de Cutty en vivo."
            : "Play the video to sync Cutty's live reactions in real-time."}
        </p>
      )}
    </motion.div>
  );
}
