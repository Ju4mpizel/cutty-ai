import React, { useState, useRef } from "react";
import MascotCard from "./MascotCard";
import EditingKitCard from "./EditingKitCard";

const SparklesIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
    />
  </svg>
);

const PlayIcon = () => (
  <svg
    className="w-3.5 h-3.5 text-zinc-400 shrink-0 ml-2 mt-0.5"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M8 5v14l11-7z" />
  </svg>
);

const EyeOpenIcon = () => (
  <svg
    className="w-4 h-4 text-amber-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
    />
  </svg>
);

const EyeClosedIcon = () => (
  <svg
    className="w-4 h-4 text-zinc-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
    />
  </svg>
);

const MOOD_COLORS = {
  happy:
    "bg-emerald-500 border-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]",
  bored: "bg-amber-500 border-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]",
  confused:
    "bg-indigo-500 border-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.8)]",
  shocked: "bg-rose-500 border-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.8)]",
  encouraging:
    "bg-cyan-500 border-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]",
  analyzing: "bg-zinc-500 border-zinc-400",
};

const LIVE_SCAN_FEEDBACK = {
  es: [
    {
      sec: 0,
      mood: "analyzing",
      critique: "Escaneando primeros 3s. Detectando Hook visual...",
      suggestion: "Midiendo impacto inicial",
    },
    {
      sec: 3,
      mood: "bored",
      critique: "Comprobando ritmo de cortes y dinamismo...",
      suggestion: "Detectando caídas de atención",
    },
    {
      sec: 6,
      mood: "confused",
      critique: "Analizando balance vocal y diseño sonoro...",
      suggestion: "Verificando claridad de audio",
    },
    {
      sec: 9,
      mood: "shocked",
      critique: "Detectando elementos visuales estáticos...",
      suggestion: "Calculando retención final",
    },
    {
      sec: 11,
      mood: "encouraging",
      critique: "Sintetizando veredicto con Gemini 3.5...",
      suggestion: "Generando Kit de Assets",
    },
  ],
  en: [
    {
      sec: 0,
      mood: "analyzing",
      critique: "Scanning first 3s. Searching for visual hook...",
      suggestion: "Checking initial retention",
    },
    {
      sec: 3,
      mood: "bored",
      critique: "Measuring pace and visual dynamics...",
      suggestion: "Spotting potential drop-offs",
    },
    {
      sec: 6,
      mood: "confused",
      critique: "Analyzing audio frequencies and sound balance...",
      suggestion: "Verifying audio punch",
    },
    {
      sec: 9,
      mood: "shocked",
      critique: "Detecting static elements...",
      suggestion: "Calculating retention curve",
    },
    {
      sec: 11,
      mood: "encouraging",
      critique: "Synthesizing verdict with Gemini 3.5...",
      suggestion: "Curating Asset Kit",
    },
  ],
};

export default function VideoAuditWorkspace({
  videoFile,
  videoUrl,
  lang = "es",
  onReset,
}) {
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditData, setAuditData] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showBroOpinion, setShowBroOpinion] = useState(false);
  const [copiedReport, setCopiedReport] = useState(false);

  const videoRef = useRef(null);

  const handleUploadAndAudit = async () => {
    if (!videoFile) return;
    setIsAuditing(true);
    setAuditData(null);
    setShowBroOpinion(false);

    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }

    const formData = new FormData();
    formData.append("video", videoFile);
    formData.append("language", lang);

    const API_BASE =
      import.meta.env.VITE_API_URL ||
      "https://cutty-backend-747715483985.us-central1.run.app";

    try {
      const res = await fetch(`${API_BASE}/api/audit-video`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errJson = await res.json().catch(() => ({}));
        throw new Error(
          errJson.details || errJson.error || `HTTP ${res.status}`,
        );
      }

      const data = await res.json();
      setAuditData(data);

      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    } catch (err) {
      console.error(err);
      if (videoRef.current) {
        videoRef.current.pause();
      }
      alert(
        lang === "es"
          ? `Error al auditar el video: ${err.message}`
          : `Error auditing video: ${err.message}`,
      );
    } finally {
      setIsAuditing(false);
    }
  };

  const handleCopyFullReport = () => {
    if (!auditData) return;
    const text = `🎬 CUTTY AI AUDIT REPORT
Virality Score: ${auditData.viralityScore}/100
Verdict: ${auditData.summary}

🔥 Bro Roast: "${auditData.broRoast}"

TIMELINE KEY MOMENTS:
${auditData.timelineFeedback
  ?.map(
    (t) =>
      `- [00:${t.timestampSeconds.toString().padStart(2, "0")}] (${t.type.toUpperCase()}): ${t.critique} -> TIP: ${t.suggestion}`,
  )
  .join("\n")}
    `;
    navigator.clipboard.writeText(text);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const seekTo = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime = seconds;
      videoRef.current.play().catch(() => {});
    }
  };

  const currentSecond = Math.floor(currentTime);

  let activeFeedback = null;
  let currentMood = "analyzing";

  const liveList = LIVE_SCAN_FEEDBACK[lang] || LIVE_SCAN_FEEDBACK.es;

  if (isAuditing) {
    activeFeedback =
      liveList
        .slice()
        .reverse()
        .find((item) => item.sec <= currentSecond) || liveList[0];
    currentMood = activeFeedback.mood;
  } else if (auditData) {
    activeFeedback =
      auditData.timelineFeedback
        ?.slice()
        .reverse()
        .find((item) => item.timestampSeconds <= currentSecond) ||
      auditData.timelineFeedback?.[0];
    currentMood =
      activeFeedback?.mascotReaction || auditData.overallMood || "happy";
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto px-2 sm:px-4 py-4">
      {/* 1. BARRA SUPERIOR DE CONTROL */}
      <div className="flex flex-wrap items-center justify-between bg-zinc-950 border-2 border-zinc-800 p-3 sm:p-4 rounded-3xl shadow-[4px_4px_0px_rgba(0,0,0,1)] gap-3">
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 px-4 py-2 rounded-xl border border-zinc-700 transition-all cursor-pointer shadow-sm active:translate-x-0.5 active:translate-y-0.5"
        >
          ← {lang === "es" ? "Subir otro clip" : "Upload another clip"}
        </button>

        <div className="flex items-center gap-3 ml-auto">
          <span className="text-xs text-zinc-400 font-mono hidden md:inline truncate max-w-xs bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800">
            📄 {videoFile?.name}
          </span>
          {auditData && (
            <button
              onClick={handleCopyFullReport}
              className="bg-emerald-500 hover:bg-emerald-400 text-black px-4 py-2 rounded-xl text-xs font-black font-mono uppercase tracking-wider border-2 border-black shadow-[2px_2px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer"
            >
              {copiedReport
                ? lang === "es"
                  ? "✓ Reporte Copiado"
                  : "✓ Copied"
                : lang === "es"
                  ? "📋 Copiar Reporte"
                  : "📋 Copy Full Report"}
            </button>
          )}
        </div>
      </div>

      {/* 2. FILA SUPERIOR: CONSOLA BENTO 3 COLUMNAS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* COLUMNA 1 (4 COLS): VIDEO REPRODUCCIÓN + TIMELINE RETENCIÓN */}
        <div className="lg:col-span-4 bg-zinc-950 border-2 border-zinc-800 rounded-3xl p-4 sm:p-5 flex flex-col items-center gap-4 shadow-[6px_6px_0px_rgba(0,0,0,1)]">
          <div className="w-full max-w-[280px] bg-black rounded-2xl overflow-hidden border-2 border-zinc-800 shadow-2xl relative aspect-[9/16] flex items-center justify-center">
            <video
              ref={videoRef}
              src={videoUrl}
              controls={!isAuditing}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              className="w-full h-full object-contain"
            />
            {isAuditing && (
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-emerald-500/20 via-transparent to-transparent animate-pulse border-b-2 border-emerald-400 flex items-start justify-center pt-3">
                <span className="bg-emerald-950/90 text-emerald-300 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/40">
                  AI SCANNING...
                </span>
              </div>
            )}
          </div>

          {/* Barra de retención */}
          <div className="w-full max-w-[280px] bg-zinc-900 border-2 border-zinc-800 rounded-2xl p-3 flex flex-col gap-2 shadow-inner">
            <div className="flex justify-between items-center text-[11px] font-mono text-zinc-400">
              <span className="text-emerald-400 font-black">
                00:{currentSecond.toString().padStart(2, "0")}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-300 font-mono">
                {isAuditing
                  ? lang === "es"
                    ? "📡 Analizando..."
                    : "📡 Scanning..."
                  : lang === "es"
                    ? "Línea de Retención"
                    : "Retention Curve"}
              </span>
              <span>00:{Math.floor(duration).toString().padStart(2, "0")}</span>
            </div>

            <div className="relative w-full h-3.5 bg-zinc-950 rounded-full flex items-center cursor-pointer border border-zinc-800 overflow-visible">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-100 shadow-[0_0_10px_#10B981]"
                style={{ width: `${progressPercent}%` }}
              />
              {auditData &&
                duration > 0 &&
                auditData.timelineFeedback?.map((item, idx) => {
                  const pinPos = (item.timestampSeconds / duration) * 100;
                  const pinColor =
                    MOOD_COLORS[item.mascotReaction] || MOOD_COLORS.analyzing;
                  return (
                    <button
                      key={idx}
                      onClick={() => seekTo(item.timestampSeconds)}
                      title={`00:${item.timestampSeconds}s - ${item.critique}`}
                      className={`absolute w-3.5 h-3.5 rounded-full border-2 transform -translate-x-1/2 cursor-pointer transition-transform hover:scale-150 ${pinColor}`}
                      style={{ left: `${pinPos}%` }}
                    />
                  );
                })}
            </div>
          </div>
        </div>

        {/* COLUMNA 2 (4 COLS): MASCOTA INTERACTIVA + MODO BRO */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {!auditData && !isAuditing && (
            <div className="bg-zinc-950 border-2 border-emerald-500/40 p-8 rounded-3xl text-center flex flex-col items-center shadow-[6px_6px_0px_rgba(16,185,129,0.3)] justify-center">
              <img
                src="/mascot/analyzing.png"
                alt="Cutty"
                className="w-28 h-28 object-contain mb-3 animate-bounce"
                style={{ imageRendering: "pixelated" }}
              />
              <h3 className="text-base font-black uppercase text-white font-mono">
                {lang === "es"
                  ? "¿Listo para la auditoría?"
                  : "Ready for audit?"}
              </h3>
              <p className="text-xs text-zinc-400 max-w-xs mt-1.5 mb-6 leading-relaxed">
                {lang === "es"
                  ? "Cutty inspeccionará ritmo, ganchos y audio con Gemini 3.5 Flash en Vertex AI."
                  : "Cutty will inspect pacing, hooks, and audio with Gemini 3.5 Flash in Vertex AI."}
              </p>
              <button
                onClick={handleUploadAndAudit}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs font-mono uppercase tracking-wider px-6 py-3.5 rounded-2xl border-2 border-black shadow-[3px_3px_0px_#000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
              >
                <SparklesIcon />{" "}
                {lang === "es"
                  ? "Iniciar Auditoría en Vivo"
                  : "Start Live Audit"}
              </button>
            </div>
          )}

          {(isAuditing || auditData) && (
            <div className="bg-zinc-950 border-2 border-emerald-500/30 rounded-3xl p-4 shadow-[6px_6px_0px_rgba(0,0,0,1)]">
              <MascotCard
                mood={currentMood}
                score={auditData?.viralityScore || null}
                currentTip={activeFeedback}
              />
            </div>
          )}

          {auditData && (
            <div className="bg-zinc-950 border-2 border-amber-500/40 p-4 rounded-3xl shadow-[6px_6px_0px_rgba(245,158,11,0.2)] flex flex-col gap-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🔥</span>
                  <h4 className="text-xs font-black text-amber-300 uppercase tracking-wider font-mono">
                    {lang === "es"
                      ? "Opinión Sin Filtro (Modo Bro)"
                      : "Unfiltered Bro Opinion"}
                  </h4>
                </div>
                <button
                  onClick={() => setShowBroOpinion(!showBroOpinion)}
                  className="flex items-center gap-1.5 bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-xl text-[10px] font-bold font-mono transition-all cursor-pointer"
                >
                  {showBroOpinion ? <EyeClosedIcon /> : <EyeOpenIcon />}
                  <span>
                    {showBroOpinion
                      ? lang === "es"
                        ? "Ocultar"
                        : "Hide"
                      : lang === "es"
                        ? "Revelar"
                        : "Reveal"}
                  </span>
                </button>
              </div>
              {showBroOpinion ? (
                <p className="text-xs font-medium text-amber-100 bg-amber-950/30 p-3.5 rounded-2xl border border-amber-500/30 leading-relaxed italic font-sans">
                  "{auditData.broRoast || auditData.summary}"
                </p>
              ) : (
                <p className="text-[11px] text-zinc-500 italic px-1 font-mono">
                  {lang === "es"
                    ? "⚠️ Crítica sin censura. Haz clic en Revelar para ver qué opina Cutty."
                    : "⚠️ Honest critique. Click Reveal to see what Cutty thinks."}
                </p>
              )}
            </div>
          )}
        </div>

        {/* COLUMNA 3 (4 COLS): VEREDICTO DEL DIRECTOR + MOMENTOS CLAVE */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {auditData && (
            <div className="bg-zinc-950 border-2 border-emerald-500/40 rounded-3xl p-4 sm:p-5 shadow-[6px_6px_0px_rgba(0,0,0,1)]">
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                  <span className="text-sm">🎬</span>
                  <h4 className="text-xs font-black text-emerald-400 uppercase tracking-wider font-mono">
                    {lang === "es"
                      ? "Veredicto del Director"
                      : "Director's Verdict"}
                  </h4>
                </div>
                <span className="text-[9px] font-mono font-bold text-zinc-300 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-700">
                  PRO SCAN
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed max-h-36 overflow-y-auto pr-1">
                {auditData.summary}
              </p>
            </div>
          )}

          {/* Momentos Clave / Timeline */}
          <div className="bg-zinc-950 border-2 border-indigo-500/30 rounded-3xl p-4 sm:p-5 shadow-[6px_6px_0px_rgba(0,0,0,1)] flex flex-col">
            <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-zinc-800">
              <h4 className="text-xs font-black text-indigo-300 uppercase tracking-wider font-mono">
                {lang === "es"
                  ? `Momentos Clave (${auditData?.timelineFeedback?.length || 0})`
                  : `Key Moments (${auditData?.timelineFeedback?.length || 0})`}
              </h4>
              <span className="text-[10px] bg-indigo-950/80 text-indigo-300 border border-indigo-500/40 px-2.5 py-0.5 rounded-full font-mono font-bold">
                TIMELINE SYNC
              </span>
            </div>

            <div className="flex flex-col gap-2.5 overflow-y-auto max-h-[280px] pr-1">
              {auditData ? (
                auditData.timelineFeedback?.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => seekTo(item.timestampSeconds)}
                    className={`text-left p-3 rounded-2xl text-xs transition-all border-2 flex items-center justify-between cursor-pointer ${
                      currentSecond === item.timestampSeconds
                        ? "bg-indigo-950 border-indigo-400 text-indigo-100 shadow-[3px_3px_0px_#000] scale-[1.01]"
                        : "bg-zinc-900/60 border-zinc-800/90 hover:border-zinc-700 text-zinc-300 shadow-sm"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="font-mono font-black text-indigo-400 text-[11px] bg-zinc-950 px-2 py-0.5 rounded-lg border border-zinc-800 mt-0.5">
                        00:{item.timestampSeconds.toString().padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-bold text-zinc-100 text-xs line-clamp-1">
                          {item.critique}
                        </p>
                        <p className="text-[10px] font-mono text-zinc-400 mt-0.5 line-clamp-1">
                          🛠 {item.suggestion}
                        </p>
                      </div>
                    </div>
                    <PlayIcon />
                  </button>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-44 text-zinc-500 text-xs italic text-center p-4 font-mono">
                  {lang === "es"
                    ? "Los momentos clave aparecerán aquí sincronizados con el reproductor tras la auditoría."
                    : "Key moments will appear here synchronized with the player after the audit."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. FILA INFERIOR: KIT DE ASSETS NEO-BRUTALISTA */}
      {auditData?.editingKit && (
        <EditingKitCard kit={auditData.editingKit} lang={lang} />
      )}
    </div>
  );
}
