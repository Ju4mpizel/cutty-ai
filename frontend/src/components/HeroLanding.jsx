import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroLanding({ lang = "en", onFileSelect }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelect({ target: { files: e.dataTransfer.files } });
    }
  };

  // Variantes para animación escalonada
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 20 },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-10 sm:gap-14 py-4 sm:py-8 max-w-7xl mx-auto w-full"
    >
      {/* SECCIÓN HERO PRINCIPAL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* COLUMNA IZQUIERDA: COPY + DROPZONE */}
        <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6 text-left">
          {/* BADGE ANIMADO */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 self-start bg-zinc-900/90 border border-emerald-500/40 px-3.5 py-1.5 rounded-full shadow-[2px_2px_0px_rgba(16,185,129,0.4)]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wide">
              {lang === "es"
                ? "Copiloto Multimodal 9:16"
                : "Multimodal 9:16 Copilot"}
            </span>
          </motion.div>

          {/* TÍTULO */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-[1.08]"
          >
            {lang === "es" ? (
              <>
                Convierte tus clips en{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200 underline decoration-emerald-500/40 underline-offset-8">
                  máquinas de retención
                </span>
              </>
            ) : (
              <>
                Turn your raw clips into{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-200 underline decoration-emerald-500/40 underline-offset-8">
                  retention beasts
                </span>
              </>
            )}
          </motion.h1>

          {/* DESCRIPCIÓN */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl font-normal"
          >
            {lang === "es"
              ? "Cutty inspecciona tus videos cortos segundo a segundo con Gemini 3.5 Flash: detecta debilidades en el hook, caídas de ritmo y te entrega el kit exacto de assets para editar en CapCut o Premiere."
              : "Cutty inspects your short-form videos second-by-second using Gemini 3.5 Flash: detects hook flaws, pacing drops, and curates ready-to-use editing kits for CapCut or Premiere."}
          </motion.p>

          {/* DROPZONE REACTIVA */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.015, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`group relative overflow-hidden rounded-3xl border-2 border-dashed p-6 sm:p-8 transition-colors cursor-pointer bg-zinc-950 flex flex-col items-center justify-center text-center gap-4 ${
              isDragging
                ? "border-emerald-400 bg-emerald-950/30 shadow-[0_0_25px_rgba(16,185,129,0.3)]"
                : "border-zinc-700 hover:border-emerald-400 hover:bg-zinc-900/80 shadow-[4px_4px_0px_rgba(39,39,42,1)] hover:shadow-[6px_6px_0px_rgba(16,185,129,0.9)]"
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={onFileSelect}
              accept="video/mp4,video/quicktime,video/webm"
              className="hidden"
            />

            <motion.div
              animate={{ rotate: [0, -5, 5, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="w-14 h-14 rounded-2xl bg-zinc-900 border-2 border-zinc-700 flex items-center justify-center text-2xl group-hover:border-emerald-400 shadow-inner"
            >
              ⚡
            </motion.div>

            <div className="flex flex-col gap-1">
              <p className="text-sm font-black uppercase tracking-wider text-zinc-100 group-hover:text-emerald-400 transition-colors">
                {lang === "es"
                  ? "Suelta tu video aquí o toca para explorar"
                  : "Drop your video here or tap to browse"}
              </p>
              <p className="text-xs font-mono text-zinc-500">
                MP4, MOV, WEBM • Max 30MB • 1080p / 720p
              </p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="mt-1 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase font-mono tracking-wider px-6 py-3 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] cursor-pointer"
            >
              {lang === "es" ? "Seleccionar Clip" : "Select Video File"}
            </motion.button>
          </motion.div>

          {/* SPECS RÁPIDAS */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-2.5 sm:gap-3 pt-1"
          >
            <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                Input
              </span>
              <span className="text-xs font-bold text-zinc-200">
                Multimodal 9:16
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                Engine
              </span>
              <span className="text-xs font-bold text-emerald-400 font-mono">
                Gemini 3.5 Global
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                Output
              </span>
              <span className="text-xs font-bold text-amber-300">
                SFX, Fonts & FX
              </span>
            </div>
          </motion.div>
        </div>

        {/* COLUMNA DERECHA: SHOWCASE DE CUTTY INTERACTIVO */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-5 flex flex-col items-center justify-center"
        >
          <motion.div
            whileHover={{ y: -4 }}
            className="w-full max-w-md bg-zinc-900/80 border-2 border-zinc-800 rounded-3xl p-5 sm:p-6 shadow-[8px_8px_0px_rgba(16,185,129,0.25)] relative overflow-hidden backdrop-blur-md"
          >
            {/* Header de consola */}
            <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-zinc-800">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500 border border-rose-600 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500 border border-amber-600 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-600 inline-block" />
                <span className="text-[11px] font-mono text-zinc-400 font-bold ml-1.5">
                  CUTTY_DIRECTOR.EXE
                </span>
              </div>
              <span className="text-[10px] font-mono bg-emerald-950/80 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/40">
                ACTIVE
              </span>
            </div>

            {/* Escenario de Cutty */}
            <div className="flex flex-col items-center text-center my-2">
              <div className="relative p-6 sm:p-8 rounded-2xl bg-zinc-950 border border-zinc-800 shadow-inner w-full flex items-center justify-center overflow-hidden">
                {/* Láser escaneador animado con Framer Motion */}
                <motion.div
                  animate={{ y: [-70, 70, -70] }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_12px_#10B981] pointer-events-none"
                />

                {/* Mascota con float dinámico */}
                <motion.img
                  animate={{ y: [-4, 6, -4], rotate: [-0.5, 0.5, -0.5] }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  src="/mascot/analyzing.png"
                  alt="Cutty Analyzing"
                  className="w-36 h-36 sm:w-44 sm:h-44 object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]"
                  style={{ imageRendering: "pixelated" }}
                />

                <div className="absolute bottom-3 right-3 bg-zinc-900/90 border border-zinc-700 text-zinc-300 font-mono text-[9px] font-bold px-2 py-1 rounded-lg shadow-sm">
                  STANDBY • 60 FPS
                </div>
              </div>

              {/* Globo de diálogo */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 p-4 rounded-2xl bg-zinc-950 border border-emerald-500/30 text-left w-full shadow-md"
              >
                <p className="text-[11px] font-mono text-emerald-400 font-bold uppercase mb-1 flex items-center gap-1.5">
                  <span>💬</span> Cutty Copilot:
                </p>
                <p className="text-xs text-zinc-300 leading-relaxed italic font-sans">
                  {lang === "es"
                    ? '"Sube tu borrador. Auditaré la fuerza de tu gancho y te entregaré los assets exactos para arreglar el ritmo antes de publicar."'
                    : '"Upload your draft. I’ll audit your hook retention and hand you the exact asset kit to polish your pacing before posting."'}
                </p>
              </motion.div>
            </div>

            {/* Métricas */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-3.5 border-t border-zinc-800 text-center font-mono">
              <div className="bg-zinc-950/70 p-2 rounded-xl border border-zinc-800/80">
                <span className="text-[9px] text-zinc-500 uppercase block">
                  Response Time
                </span>
                <span className="text-xs font-bold text-zinc-200">
                  ~5-7 Seconds
                </span>
              </div>
              <div className="bg-zinc-950/70 p-2 rounded-xl border border-zinc-800/80">
                <span className="text-[9px] text-zinc-500 uppercase block">
                  Audit Precision
                </span>
                <span className="text-xs font-bold text-emerald-400">
                  99.4% Virality
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* 3 BENTO CARDS FOOTER CON REBOTE */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 pt-2"
      >
        <motion.div
          whileHover={{ y: -5, scale: 1.01 }}
          className="p-5 rounded-3xl bg-zinc-900/40 border-2 border-zinc-800/80 hover:border-emerald-500/50 hover:bg-zinc-900/70 transition-colors shadow-[4px_4px_0px_rgba(0,0,0,0.8)] cursor-pointer"
        >
          <div className="text-2xl mb-2">🎯</div>
          <h3 className="text-sm font-black uppercase text-white mb-1">
            {lang === "es"
              ? "Hook & Drop-off Detection"
              : "Hook & Drop-off Detection"}
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            {lang === "es"
              ? "Localiza caídas críticas de atención en la línea temporal sincronizada al segundo."
              : "Spot critical audience drop-offs in the synchronized timeline down to the exact second."}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5, scale: 1.01 }}
          className="p-5 rounded-3xl bg-zinc-900/40 border-2 border-zinc-800/80 hover:border-amber-500/50 hover:bg-zinc-900/70 transition-colors shadow-[4px_4px_0px_rgba(0,0,0,0.8)] cursor-pointer"
        >
          <div className="text-2xl mb-2">🔥</div>
          <h3 className="text-sm font-black uppercase text-white mb-1">
            {lang === "es" ? "Modo Bro Roast" : "Bro Roast Mode"}
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            {lang === "es"
              ? "Crítica sin filtros con jerga real de editor para mejorar el dinamismo de tus tomas."
              : "No-BS critique with viral editor slang to upgrade your visual dynamics fast."}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -5, scale: 1.01 }}
          className="p-5 rounded-3xl bg-zinc-900/40 border-2 border-zinc-800/80 hover:border-cyan-500/50 hover:bg-zinc-900/70 transition-colors shadow-[4px_4px_0px_rgba(0,0,0,0.8)] cursor-pointer"
        >
          <div className="text-2xl mb-2">🧰</div>
          <h3 className="text-sm font-black uppercase text-white mb-1">
            {lang === "es" ? "Kit de Assets Integrado" : "Instant Asset Kit"}
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            {lang === "es"
              ? "Copia con un toque nombres de SFX, fuentes tipográficas, transiciones y paleta Hex."
              : "One-tap copy for SFX names, fonts, visual transitions, and Hex palettes tailored to your video."}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
