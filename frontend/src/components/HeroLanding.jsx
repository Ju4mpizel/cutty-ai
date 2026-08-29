import React, { useState } from "react";

const UploadIcon = () => (
  <svg
    className="w-12 h-12 text-emerald-400 mb-3 group-hover:scale-110 transition-transform"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    />
  </svg>
);

export default function HeroLanding({ lang, onFileSelect }) {
  const [isHovered, setIsHovered] = useState(false);

  const t = {
    es: {
      badge: "🚀 Para creadores de TikTok, Reels y Shorts",
      title1: "Tu mejor y peor amigo",
      title2: "para editar video.",
      subtitle:
        "Cutty analiza tu borrador segundo a segundo con Gemini 3.6. Detecta cuándo la gente se aburre, juzga tu ritmo y te entrega el kit exacto de sonidos y fuentes para viralizarlo.",
      dropTitle: "Arrastra tu borrador (.mp4) aquí",
      dropSubtitle: "o haz clic para explorar tus archivos",
      dropSpecs: "Soporta formatos 9:16 y 16:9 • Hasta 60s recomendado",
      featuresTitle: "¿Por qué los editores usan a Cutty?",
      f1_title: "Escaneo Cuadro a Cuadro",
      f1_desc:
        "Inspección de ganchos (0-3s), cambios de plano y pausas muertas.",
      f2_title: "Kit de Assets Reales",
      f2_desc:
        "Nombres exactos de SFX, fuentes virales y efectos listos para CapCut.",
      f3_title: "Opinión Sin Filtro (Modo Bro)",
      f3_desc:
        "La crítica honesta y sin anestesia que tus amigos no se atreven a darte.",
      f4_title: "Feedback Sincronizado",
      f4_desc:
        "Cutty cambia de expresiones en vivo mientras corre tu línea de tiempo.",
    },
    en: {
      badge: "🚀 Built for TikTok, Reels and Shorts creators",
      title1: "Your best and worst friend",
      title2: "for video editing.",
      subtitle:
        "Cutty audits your draft second by second with Gemini 3.6. Catches where viewers drop off, judges your pacing, and hands you the exact sound & font pack to go viral.",
      dropTitle: "Drop your draft video (.mp4) here",
      dropSubtitle: "or click to browse local files",
      dropSpecs: "Supports 9:16 and 16:9 • Up to 60s recommended",
      featuresTitle: "Why creators rely on Cutty",
      f1_title: "Frame-by-Frame Audit",
      f1_desc:
        "Deep inspection of retention hooks (0-3s), transitions and dead air.",
      f2_title: "Real Editing Asset Kit",
      f2_desc:
        "Searchable CapCut sound names, viral fonts, and trending effects.",
      f3_title: "Unfiltered Bro Roast",
      f3_desc:
        "Brutally honest feedback your friends are too polite to tell you.",
      f4_title: "Synchronized Reactions",
      f4_desc:
        "Cutty dynamically changes emotions in real-time as your video plays.",
    },
  }[lang];

  return (
    <div className="flex flex-col gap-16 py-8">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto px-4">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 shadow-lg shadow-emerald-950/30">
          {t.badge}
        </div>

        {/* Mascota con Diálogo Flotante */}
        <div className="relative mb-6 flex flex-col items-center">
          <div className="bg-zinc-900 border border-zinc-700 text-zinc-200 text-xs px-4 py-2 rounded-2xl shadow-2xl mb-2 flex items-center gap-2 animate-bounce">
            <span>🤖</span>
            <span className="font-mono">
              {lang === "es"
                ? "«Pásame tu borrador, prometo no juzgarte tanto... (mentira)»"
                : "«Drop your draft, I promise not to judge hard... (lying)»"}
            </span>
          </div>

          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative cursor-pointer transition-transform hover:scale-110"
          >
            <img
              src={isHovered ? "/mascot/shocked.png" : "/mascot/analyzing.png"}
              alt="Cutty Robot"
              className="w-32 h-32 object-contain"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
        </div>

        {/* Título Principal */}
        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-zinc-100 leading-tight">
          {t.title1} <br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            {t.title2}
          </span>
        </h1>

        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mt-4 leading-relaxed">
          {t.subtitle}
        </p>

        {/* Dropzone Moderno */}
        <div className="w-full max-w-xl mt-10">
          <div className="group relative border-2 border-dashed border-zinc-700 hover:border-emerald-500 bg-zinc-900/40 hover:bg-zinc-900/80 rounded-3xl p-10 flex flex-col items-center justify-center transition-all cursor-pointer shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <input
              type="file"
              accept="video/*"
              onChange={onFileSelect}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <UploadIcon />
            <p className="font-bold text-base text-zinc-100 mt-2">
              {t.dropTitle}
            </p>
            <p className="text-xs text-zinc-400 mt-1">{t.dropSubtitle}</p>
            <span className="text-[11px] text-emerald-400/80 font-mono mt-4 bg-emerald-950/40 border border-emerald-500/20 px-3 py-1 rounded-full">
              {t.dropSpecs}
            </span>
          </div>
        </div>
      </div>

      {/* Grid de Features */}
      <div className="max-w-5xl mx-auto px-4 w-full">
        <h3 className="text-center text-xs font-bold uppercase tracking-widest text-zinc-500 mb-8">
          {t.featuresTitle}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-zinc-900/70 border border-zinc-800/80 p-5 rounded-2xl flex flex-col gap-2 hover:border-zinc-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-lg">
              ⏱️
            </div>
            <h4 className="font-bold text-sm text-zinc-100">{t.f1_title}</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">{t.f1_desc}</p>
          </div>

          <div className="bg-zinc-900/70 border border-zinc-800/80 p-5 rounded-2xl flex flex-col gap-2 hover:border-zinc-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-lg">
              🧰
            </div>
            <h4 className="font-bold text-sm text-zinc-100">{t.f2_title}</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">{t.f2_desc}</p>
          </div>

          <div className="bg-zinc-900/70 border border-zinc-800/80 p-5 rounded-2xl flex flex-col gap-2 hover:border-zinc-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/30 flex items-center justify-center text-lg">
              🔥
            </div>
            <h4 className="font-bold text-sm text-zinc-100">{t.f3_title}</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">{t.f3_desc}</p>
          </div>

          <div className="bg-zinc-900/70 border border-zinc-800/80 p-5 rounded-2xl flex flex-col gap-2 hover:border-zinc-700 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-lg">
              👾
            </div>
            <h4 className="font-bold text-sm text-zinc-100">{t.f4_title}</h4>
            <p className="text-xs text-zinc-400 leading-relaxed">{t.f4_desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
