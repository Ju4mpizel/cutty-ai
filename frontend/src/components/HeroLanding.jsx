import React, { useRef, useState } from "react";

export default function HeroLanding({ lang, onFileSelect }) {
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

  return (
    <div className="flex flex-col gap-12 py-6 sm:py-10 max-w-7xl mx-auto w-full">
      {/* SECCIÓN HERO PRINCIPAL: IZQUIERDA TEXTO / DERECHA CUTTY */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* COLUMNA IZQUIERDA: COPY + DROPZONE TÉCNICA */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          {/* BADGE SUPERIOR */}
          <div className="inline-flex items-center gap-2 self-start bg-zinc-900/90 border border-emerald-500/30 px-3.5 py-1.5 rounded-full shadow-[2px_2px_0px_rgba(16,185,129,0.3)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wide">
              {lang === "es"
                ? "Auditor Multimodal de Retención 9:16"
                : "Multimodal 9:16 Retention Auditor"}
            </span>
          </div>

          {/* TÍTULO HERO */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase leading-[1.05]">
            {lang === "es" ? (
              <>
                Convierte tus clips en{" "}
                <span className="text-emerald-400 underline decoration-emerald-500/50 underline-offset-8">
                  máquinas de retención
                </span>
              </>
            ) : (
              <>
                Turn your raw clips into{" "}
                <span className="text-emerald-400 underline decoration-emerald-500/50 underline-offset-8">
                  retention beasts
                </span>
              </>
            )}
          </h1>

          {/* DESCRIPCIÓN */}
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-xl font-normal">
            {lang === "es"
              ? "Cutty analiza segundo a segundo tus videos cortos (TikTok, Reels, Shorts) detectando caídas de atención, debilidades en el hook y entregándote el kit exacto de assets para editar en CapCut o Premiere."
              : "Cutty inspects your short-form videos second-by-second, pinpointing retention drop-offs, hook flaws, and curating the exact asset kit for CapCut or Premiere."}
          </p>

          {/* DROPZONE NEO-BRUTALISTA */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`group relative overflow-hidden rounded-3xl border-2 border-dashed p-7 transition-all cursor-pointer bg-zinc-950 flex flex-col items-center justify-center text-center gap-4 ${
              isDragging
                ? "border-emerald-400 bg-emerald-950/20 scale-[1.01]"
                : "border-zinc-700 hover:border-emerald-400/80 hover:bg-zinc-900/70 shadow-[4px_4px_0px_rgba(39,39,42,1)] hover:shadow-[5px_5px_0px_rgba(16,185,129,0.8)] hover:translate-x-[-2px] hover:translate-y-[-2px]"
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={onFileSelect}
              accept="video/mp4,video/quicktime,video/webm"
              className="hidden"
            />

            <div className="w-14 h-14 rounded-2xl bg-zinc-900 border-2 border-zinc-700 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:border-emerald-400 transition-all shadow-inner">
              ⚡
            </div>

            <div className="flex flex-col gap-1">
              <p className="text-sm font-black uppercase tracking-wider text-zinc-100 group-hover:text-emerald-400 transition-colors">
                {lang === "es"
                  ? "Suelta tu video aquí o haz clic para subir"
                  : "Drop your video here or click to browse"}
              </p>
              <p className="text-xs font-mono text-zinc-500">
                MP4, MOV, WEBM • Max 30MB • 1080p / 720p
              </p>
            </div>

            <button
              type="button"
              className="mt-1 bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase font-mono tracking-wider px-6 py-3 rounded-xl border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all cursor-pointer"
            >
              {lang === "es" ? "Seleccionar Video" : "Select Video File"}
            </button>
          </div>

          {/* BADGES DE SPECS RÁPIDAS */}
          <div className="grid grid-cols-3 gap-3 pt-1">
            <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                Análisis
              </span>
              <span className="text-xs font-bold text-zinc-200">
                Multimodal 9:16
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                Modelo
              </span>
              <span className="text-xs font-bold text-emerald-400 font-mono">
                Gemini 3.5 Global
              </span>
            </div>
            <div className="p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800">
              <span className="text-[10px] font-mono text-zinc-500 uppercase block">
                Kit Export
              </span>
              <span className="text-xs font-bold text-amber-300">
                SFX, Fonts & FX
              </span>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: SHOWCASE DE CUTTY / NEO-BRUTAL MASCOT CARD */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="w-full max-w-md bg-zinc-900/70 border-2 border-zinc-800 rounded-3xl p-6 shadow-[8px_8px_0px_rgba(16,185,129,0.25)] relative overflow-hidden backdrop-blur-sm">
            {/* Header de la tarjeta */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500 border border-rose-600 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500 border border-amber-600 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500 border border-emerald-600 inline-block" />
                <span className="text-[11px] font-mono text-zinc-400 font-bold ml-1">
                  CUTTY_COPILOT.EXE
                </span>
              </div>
              <span className="text-[10px] font-mono bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded border border-zinc-700">
                DIRECTOR MODE
              </span>
            </div>

            {/* Visual de Cutty */}
            <div className="flex flex-col items-center text-center my-3">
              <div className="relative p-6 rounded-2xl bg-zinc-950 border border-zinc-800/80 shadow-inner w-full flex items-center justify-center">
                <img
                  src="/mascot/analyzing.png"
                  alt="Cutty Analyzing"
                  className="w-40 h-40 object-contain animate-pulse"
                  style={{ imageRendering: "pixelated" }}
                />
                <div className="absolute top-3 right-3 bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-mono text-[10px] font-bold px-2 py-1 rounded-lg">
                  AI SCAN READY
                </div>
              </div>

              {/* Globo de diálogo de Cutty */}
              <div className="mt-4 p-4 rounded-2xl bg-zinc-950 border border-emerald-500/30 text-left w-full shadow-md">
                <p className="text-[11px] font-mono text-emerald-400 font-bold uppercase mb-1">
                  💬 Cutty Director:
                </p>
                <p className="text-xs text-zinc-300 leading-relaxed italic">
                  {lang === "es"
                    ? '"Sube tu borrador. Mediré el gancho en los primeros 3 segundos y te diré exactamente qué cortar antes de que el algoritmo te entierre."'
                    : '"Upload your cut. I’ll audit your 3-second hook and tell you what to trim before the algorithm buries your video."'}
                </p>
              </div>
            </div>

            {/* Métricas simuladas */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-zinc-800 text-center font-mono">
              <div className="bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">
                  TIEMPO PROMEDIO
                </span>
                <span className="text-xs font-bold text-zinc-200">
                  ~6 Segundos
                </span>
              </div>
              <div className="bg-zinc-950/60 p-2.5 rounded-xl border border-zinc-800">
                <span className="text-[10px] text-zinc-500 block">
                  PRECISIÓN DE AUDITORÍA
                </span>
                <span className="text-xs font-bold text-emerald-400">
                  99.4% Virality
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 CARACTERÍSTICAS TÉCNICAS EN BENTO FOOTER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
        <div className="p-5 rounded-3xl bg-zinc-900/40 border-2 border-zinc-800/80 hover:border-zinc-700 transition-all">
          <div className="text-2xl mb-2">🎯</div>
          <h3 className="text-sm font-black uppercase text-white mb-1">
            {lang === "es"
              ? "Hook & Drop-off Detection"
              : "Hook & Drop-off Detection"}
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            {lang === "es"
              ? "Localiza caídas críticas de retención en la línea temporal con precisión de décimas de segundo."
              : "Spot critical audience drop-offs in the timeline down to the exact second."}
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-zinc-900/40 border-2 border-zinc-800/80 hover:border-zinc-700 transition-all">
          <div className="text-2xl mb-2">🔥</div>
          <h3 className="text-sm font-black uppercase text-white mb-1">
            {lang === "es" ? "Modo Bro Roast" : "Bro Roast Mode"}
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            {lang === "es"
              ? "Opinión sin filtros de director senior con jerga real de editor para mejorar el ritmo de edición."
              : "No-BS critique with viral editor slang to upgrade your pacing fast."}
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-zinc-900/40 border-2 border-zinc-800/80 hover:border-zinc-700 transition-all">
          <div className="text-2xl mb-2">🧰</div>
          <h3 className="text-sm font-black uppercase text-white mb-1">
            {lang === "es" ? "Kit de Assets Integrado" : "Instant Asset Kit"}
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            {lang === "es"
              ? "Copia con un clic nombres de SFX, fuentes, efectos de transición y colores Hex ideales para tu clip."
              : "One-click copy for SFX names, fonts, visual transitions, and Hex palettes tailored to your video."}
          </p>
        </div>
      </div>
    </div>
  );
}
