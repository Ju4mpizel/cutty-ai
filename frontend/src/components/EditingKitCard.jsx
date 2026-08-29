import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EditingKitCard({ kit, lang = "en" }) {
  const [copiedText, setCopiedText] = useState(null);

  if (!kit) return null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const colVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 240,
        damping: 20,
      },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-zinc-950 border-2 border-zinc-800 rounded-3xl p-5 sm:p-6 flex flex-col gap-5 shadow-[6px_6px_0px_rgba(0,0,0,1)] w-full"
    >
      {/* HEADER DEL KIT */}
      <div className="flex items-center justify-between border-b-2 border-zinc-800/80 pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-sm shadow-inner">
            🧰
          </div>
          <div>
            <h3 className="font-black text-xs sm:text-sm tracking-wider text-zinc-100 uppercase font-mono">
              {lang === "es"
                ? "Kit de Assets para CapCut / Premiere"
                : "CapCut / Premiere Asset Kit"}
            </h3>
            <p className="text-[10px] text-zinc-500 font-mono">
              {lang === "es"
                ? "Assets curados para aumentar retención"
                : "AI-curated assets to boost retention"}
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono font-black bg-pink-950/60 text-pink-400 border border-pink-500/40 px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
          {lang === "es" ? "Recomendados por IA" : "AI Curated"}
        </span>
      </div>

      {/* 4 COLUMNAS BENTO */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
        {/* 1. SFX */}
        <motion.div
          custom={0}
          variants={colVariants}
          initial="hidden"
          animate="visible"
          className="bg-zinc-900/60 border-2 border-zinc-800/90 rounded-2xl p-3.5 flex flex-col gap-3 shadow-[3px_3px_0px_rgba(0,0,0,0.8)]"
        >
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <div className="flex items-center gap-2 text-xs font-black text-emerald-400 uppercase tracking-wider font-mono">
              <span>🔊</span> {lang === "es" ? "Efectos Sonido" : "SFX"}
            </div>
            <span className="text-[9px] font-mono font-bold text-zinc-500 bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800">
              AUDIO
            </span>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            {kit.sfx?.slice(0, 3).map((item, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleCopy(item.name)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800/80 border border-zinc-800 hover:border-emerald-500/50 transition-colors text-left cursor-pointer group shadow-sm"
                title={lang === "es" ? "Clic para copiar" : "Click to copy"}
              >
                <div className="overflow-hidden pr-1">
                  <p className="text-xs font-bold text-zinc-200 group-hover:text-emerald-400 truncate">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-zinc-400 font-mono leading-tight mt-0.5 truncate">
                    {item.useCase}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded shrink-0 ml-1.5 font-bold transition-colors ${
                    copiedText === item.name
                      ? "bg-emerald-500 text-black font-black"
                      : "bg-zinc-900 text-zinc-400 group-hover:text-zinc-200 border border-zinc-800"
                  }`}
                >
                  {copiedText === item.name ? "✓" : "Copy"}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* 2. FONTS */}
        <motion.div
          custom={1}
          variants={colVariants}
          initial="hidden"
          animate="visible"
          className="bg-zinc-900/60 border-2 border-zinc-800/90 rounded-2xl p-3.5 flex flex-col gap-3 shadow-[3px_3px_0px_rgba(0,0,0,0.8)]"
        >
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <div className="flex items-center gap-2 text-xs font-black text-cyan-400 uppercase tracking-wider font-mono">
              <span>✍️</span> {lang === "es" ? "Tipografías" : "Fonts"}
            </div>
            <span className="text-[9px] font-mono font-bold text-zinc-500 bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800">
              TEXT
            </span>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            {kit.fonts?.slice(0, 3).map((item, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleCopy(item.name)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800/80 border border-zinc-800 hover:border-cyan-500/50 transition-colors text-left cursor-pointer group shadow-sm"
                title={lang === "es" ? "Clic para copiar" : "Click to copy"}
              >
                <div className="overflow-hidden pr-1">
                  <p className="text-xs font-bold text-zinc-200 group-hover:text-cyan-400 truncate">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-zinc-400 font-mono leading-tight mt-0.5 truncate">
                    {item.style}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded shrink-0 ml-1.5 font-bold transition-colors ${
                    copiedText === item.name
                      ? "bg-cyan-400 text-black font-black"
                      : "bg-zinc-900 text-zinc-400 group-hover:text-zinc-200 border border-zinc-800"
                  }`}
                >
                  {copiedText === item.name ? "✓" : "Copy"}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* 3. VFX */}
        <motion.div
          custom={2}
          variants={colVariants}
          initial="hidden"
          animate="visible"
          className="bg-zinc-900/60 border-2 border-zinc-800/90 rounded-2xl p-3.5 flex flex-col gap-3 shadow-[3px_3px_0px_rgba(0,0,0,0.8)]"
        >
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-wider font-mono">
              <span>✨</span> {lang === "es" ? "Efectos Visuales" : "Effects"}
            </div>
            <span className="text-[9px] font-mono font-bold text-zinc-500 bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800">
              VFX
            </span>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            {kit.effects?.slice(0, 3).map((item, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleCopy(item.name)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800/80 border border-zinc-800 hover:border-amber-500/50 transition-colors text-left cursor-pointer group shadow-sm"
                title={lang === "es" ? "Clic para copiar" : "Click to copy"}
              >
                <div className="overflow-hidden pr-1">
                  <p className="text-xs font-bold text-zinc-200 group-hover:text-amber-400 truncate">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-zinc-400 font-mono leading-tight mt-0.5 truncate">
                    {item.moment}
                  </p>
                </div>
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded shrink-0 ml-1.5 font-bold transition-colors ${
                    copiedText === item.name
                      ? "bg-amber-400 text-black font-black"
                      : "bg-zinc-900 text-zinc-400 group-hover:text-zinc-200 border border-zinc-800"
                  }`}
                >
                  {copiedText === item.name ? "✓" : "Copy"}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* 4. COLORS */}
        <motion.div
          custom={3}
          variants={colVariants}
          initial="hidden"
          animate="visible"
          className="bg-zinc-900/60 border-2 border-zinc-800/90 rounded-2xl p-3.5 flex flex-col gap-3 shadow-[3px_3px_0px_rgba(0,0,0,0.8)]"
        >
          <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
            <div className="flex items-center gap-2 text-xs font-black text-rose-400 uppercase tracking-wider font-mono">
              <span>🎨</span> {lang === "es" ? "Colores Subtítulos" : "Colors"}
            </div>
            <span className="text-[9px] font-mono font-bold text-zinc-500 bg-zinc-950 px-1.5 py-0.5 rounded border border-zinc-800">
              HEX
            </span>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            {kit.colorPalette?.slice(0, 3).map((item, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.02, x: 2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleCopy(item.hex)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800/80 border border-zinc-800 hover:border-rose-500/50 transition-colors text-left cursor-pointer group shadow-sm"
                title={
                  lang === "es" ? "Clic para copiar Hex" : "Click to copy Hex"
                }
              >
                <div className="flex items-center gap-2.5 overflow-hidden pr-1">
                  <span
                    className="w-4 h-4 rounded-lg border-2 border-white/20 shrink-0 shadow-sm"
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
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded shrink-0 ml-1.5 font-bold transition-colors ${
                    copiedText === item.hex
                      ? "bg-rose-500 text-black font-black"
                      : "bg-zinc-900 text-zinc-400 group-hover:text-zinc-200 border border-zinc-800"
                  }`}
                >
                  {copiedText === item.hex ? "✓" : "Copy"}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
