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
    "bg-emerald-500 border-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.7)]",
  bored: "bg-amber-500 border-amber-400 shadow-[0_0_8px_rgba(245,158,11,0.7)]",
  confused:
    "bg-indigo-500 border-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.7)]",
  shocked: "bg-rose-500 border-rose-400 shadow-[0_0_8px_rgba(244,63,94,0.7)]",
  encouraging:
    "bg-cyan-500 border-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.7)]",
  analyzing: "bg-zinc-500 border-zinc-400",
};

const LIVE_SCAN_FEEDBACK = {
  es: [
    {
      sec: 0,
      mood: "analyzing",
      critique:
        "Escaneando los primeros 3 segundos. Buscando hook visual o texto de impacto...",
      suggestion: "Verificando retención inicial",
    },
    {
      sec: 3,
      mood: "bored",
      critique:
        "Midiendo dinamismo. La toma permanece fija por más de 2 segundos...",
      suggestion: "Detectando posibles caídas de atención",
    },
    {
      sec: 6,
      mood: "confused",
      critique: "Analizando pista de audio y frecuencias vocales vs. fondo...",
      suggestion: "Verificando balance sonoro",
    },
    {
      sec: 9,
      mood: "shocked",
      critique: "Detectando elementos visuales estáticos sin movimiento...",
      suggestion: "Calculando drop-off rate",
    },
    {
      sec: 11,
      mood: "encouraging",
      critique: "Procesando llamado a la acción (CTA) y cierre...",
      suggestion: "Sintetizando veredicto con Gemini",
    },
  ],
  en: [
    {
      sec: 0,
      mood: "analyzing",
      critique: "Scanning first 3 seconds. Searching for visual hook...",
      suggestion: "Checking initial retention",
    },
    {
      sec: 3,
      mood: "bored",
      critique: "Measuring dynamism. The shot stays static for over 2s...",
      suggestion: "Detecting potential drop-offs",
    },
    {
      sec: 6,
      mood: "confused",
      critique: "Analyzing audio track and vocal frequencies...",
      suggestion: "Checking sound balance",
    },
    {
      sec: 9,
      mood: "shocked",
      critique: "Detecting static visual elements...",
      suggestion: "Calculating drop-off rate",
    },
    {
      sec: 11,
      mood: "encouraging",
      critique: "Processing call-to-action (CTA)...",
      suggestion: "Synthesizing verdict with Gemini",
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

    try {
      const res = await fetch("http://localhost:5000/api/audit-video", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setAuditData(data);
    } catch (err) {
      console.error(err);
      alert(
        lang === "es"
          ? "Error al auditar el video. Backend no responde."
          : "Error auditing video. Backend not responding.",
      );
    } finally {
      setIsAuditing(false);
    }
  };

  const handleCopyFullReport = () => {
    if (!auditData) return;
    const text = `🎬 CUTTY AI AUDIT REPORT
Score: ${auditData.viralityScore}/100
Verdict: ${auditData.summary}

🔥 Bro Roast: "${auditData.broRoast}"

TIMELINE CUTS:
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
    <div className="flex flex-col gap-5 w-full max-w-7xl mx-auto px-4 py-4">
      {/* 1. BARRA SUPERIOR DE ACCIONES */}
      <div className="flex items-center justify-between bg-zinc-900/60 border border-zinc-800/80 p-3 rounded-2xl backdrop-blur-sm shadow-md">
        <button
          onClick={onReset}
          className="flex items-center gap-2 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-800/70 hover:bg-zinc-700 px-3.5 py-1.5 rounded-xl transition-all cursor-pointer shadow-sm"
        >
          ← {lang === "es" ? "Subir otro video" : "Upload another video"}
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs text-zinc-400 font-mono hidden md:inline truncate max-w-xs">
            📄 {videoFile?.name}
          </span>
          {auditData && (
            <button
              onClick={handleCopyFullReport}
              className="bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/80 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow"
            >
              {copiedReport
                ? lang === "es"
                  ? "✓ Reporte Copiado"
                  : "✓ Copied"
                : lang === "es"
                  ? "📋 Copiar Todo el Reporte"
                  : "📋 Copy Full Report"}
            </button>
          )}
        </div>
      </div>

      {/* 2. FILA SUPERIOR: 3 COLUMNAS BENTO BALANCEADAS */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* COLUMNA 1 (4 COLS): VIDEO 9:16 + RETENCIÓN */}
        <div className="lg:col-span-4 bg-zinc-900/50 border border-zinc-800/80 rounded-3xl p-4 flex flex-col items-center gap-3.5 shadow-xl backdrop-blur-sm">
          <div className="w-full max-w-[270px] bg-black rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl relative aspect-[9/16] flex items-center justify-center">
            <video
              ref={videoRef}
              src={videoUrl}
              controls={!isAuditing}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              className="w-full h-full object-contain"
            />
            {isAuditing && (
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-emerald-500/10 via-transparent to-transparent animate-pulse border-b-2 border-emerald-400" />
            )}
          </div>

          <div className="w-full max-w-[270px] bg-zinc-950/80 border border-zinc-800/90 rounded-2xl p-3 flex flex-col gap-2">
            <div className="flex justify-between items-center text-[11px] font-mono text-zinc-400">
              <span className="text-emerald-400 font-bold">
                00:{currentSecond.toString().padStart(2, "0")}
              </span>
              <span className="text-[11px] font-semibold text-zinc-300">
                {isAuditing
                  ? lang === "es"
                    ? "📡 Escaneando..."
                    : "📡 Scanning..."
                  : lang === "es"
                    ? "Línea de Retención"
                    : "Retention Timeline"}
              </span>
              <span>00:{Math.floor(duration).toString().padStart(2, "0")}</span>
            </div>

            <div className="relative w-full h-3 bg-zinc-900 rounded-full flex items-center cursor-pointer border border-zinc-800">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-100"
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
                      className={`absolute w-3 h-3 rounded-full border-2 transform -translate-x-1/2 cursor-pointer transition-transform hover:scale-150 ${pinColor}`}
                      style={{ left: `${pinPos}%` }}
                    />
                  );
                })}
            </div>
          </div>
        </div>

        {/* COLUMNA 2 (4 COLS): MASCOTA + MODO BRO */}
        <div className="lg:col-span-4 flex flex-col gap-3.5">
          {!auditData && !isAuditing && (
            <div className="bg-gradient-to-b from-emerald-950/20 via-zinc-900/50 to-zinc-900/50 border border-emerald-500/30 p-8 rounded-3xl text-center flex flex-col items-center shadow-xl justify-center">
              <img
                src="/mascot/analyzing.png"
                alt="Cutty"
                className="w-24 h-24 object-contain mb-3 animate-bounce"
                style={{ imageRendering: "pixelated" }}
              />
              <h3 className="text-base font-extrabold text-zinc-100">
                {lang === "es"
                  ? "¿Listo para la auditoría?"
                  : "Ready for the audit?"}
              </h3>
              <p className="text-xs text-zinc-400 max-w-xs mt-1.5 mb-5 leading-relaxed">
                {lang === "es"
                  ? "Cutty inspeccionará ganchos, ritmo y elementos visuales con Gemini en Google Cloud."
                  : "Cutty will inspect hooks, pacing, and visuals with Gemini in Google Cloud."}
              </p>
              <button
                onClick={handleUploadAndAudit}
                className="bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xs uppercase tracking-wider px-5 py-3 rounded-2xl shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
              >
                <SparklesIcon />{" "}
                {lang === "es"
                  ? "Iniciar Auditoría en Vivo"
                  : "Start Live Audit"}
              </button>
            </div>
          )}

          {(isAuditing || auditData) && (
            <div className="bg-gradient-to-b from-zinc-900/80 via-zinc-900/60 to-zinc-950/80 border border-emerald-500/20 rounded-3xl p-4 shadow-xl">
              <MascotCard
                mood={currentMood}
                score={auditData?.viralityScore || null}
                currentTip={activeFeedback}
              />
            </div>
          )}

          {auditData && (
            <div className="bg-gradient-to-br from-amber-950/20 via-zinc-900/60 to-zinc-900/60 border border-amber-500/30 p-3.5 rounded-3xl shadow-xl flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">🔥</span>
                  <h4 className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">
                    {lang === "es"
                      ? "Opinión Sin Filtro (Modo Bro)"
                      : "Unfiltered Bro Opinion"}
                  </h4>
                </div>
                <button
                  onClick={() => setShowBroOpinion(!showBroOpinion)}
                  className="flex items-center gap-1.5 bg-amber-950/40 hover:bg-amber-900/50 text-amber-200 border border-amber-500/30 px-2.5 py-1 rounded-xl text-[10px] font-semibold transition-all cursor-pointer"
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
                <p className="text-xs font-medium text-amber-100 bg-amber-950/40 p-3 rounded-2xl border border-amber-500/20 leading-relaxed italic">
                  "{auditData.broRoast || auditData.summary}"
                </p>
              ) : (
                <p className="text-[11px] text-zinc-500 italic px-1">
                  {lang === "es"
                    ? "⚠️ Crítica honesta. Haz clic en Revelar para leer el veredicto real."
                    : "⚠️ Honest critique. Click Reveal to read what Cutty thinks."}
                </p>
              )}
            </div>
          )}
        </div>

        {/* COLUMNA 3 (4 COLS): VEREDICTO (ARRIBA) + MOMENTOS CLAVE (ABAJO) */}
        <div className="lg:col-span-4 flex flex-col gap-3.5">
          {auditData && (
            <div className="bg-zinc-900/70 border border-emerald-500/30 rounded-3xl p-4 shadow-xl">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-800/80">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">🎬</span>
                  <h4 className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                    {lang === "es"
                      ? "Veredicto del Director"
                      : "Director's Verdict"}
                  </h4>
                </div>
                <span className="text-[10px] text-zinc-400 font-mono bg-zinc-800/80 px-2 py-0.5 rounded-md border border-zinc-700/50">
                  Pro Analysis
                </span>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed max-h-36 overflow-y-auto pr-1">
                {auditData.summary}
              </p>
            </div>
          )}

          {/* Momentos Clave / Timeline */}
          <div className="bg-zinc-900/60 border border-indigo-500/20 rounded-3xl p-4 shadow-xl flex flex-col">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-800/80">
              <h4 className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider">
                {lang === "es"
                  ? `Momentos Clave (${auditData?.timelineFeedback?.length || 0})`
                  : `Key Moments (${auditData?.timelineFeedback?.length || 0})`}
              </h4>
              <span className="text-[10px] bg-indigo-950/60 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-mono">
                Timeline Sync
              </span>
            </div>

            <div className="flex flex-col gap-2 overflow-y-auto max-h-[260px] pr-1">
              {auditData ? (
                auditData.timelineFeedback?.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => seekTo(item.timestampSeconds)}
                    className={`text-left p-2.5 rounded-2xl text-xs transition-all border flex items-center justify-between cursor-pointer ${
                      currentSecond === item.timestampSeconds
                        ? "bg-indigo-950/80 border-indigo-400 text-indigo-100 shadow-md scale-[1.01]"
                        : "bg-zinc-950/50 border-zinc-800/80 hover:border-zinc-700 text-zinc-300"
                    }`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="font-mono font-bold text-indigo-400 text-[11px] bg-zinc-900 px-1.5 py-0.5 rounded border border-zinc-800 mt-0.5">
                        00:{item.timestampSeconds.toString().padStart(2, "0")}
                      </span>
                      <div>
                        <p className="font-semibold text-zinc-200 text-xs line-clamp-1">
                          {item.critique}
                        </p>
                        <p className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">
                          🛠 {item.suggestion}
                        </p>
                      </div>
                    </div>
                    <PlayIcon />
                  </button>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-40 text-zinc-500 text-xs italic text-center p-4">
                  {lang === "es"
                    ? "Los momentos clave aparecerán aquí sincronizados con el reproductor tras la auditoría."
                    : "Key moments will appear here synchronized with the player after the audit."}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. FILA INFERIOR: KIT DE ASSETS HORIZONTAL */}
      {auditData?.editingKit && (
        <EditingKitCard kit={auditData.editingKit} lang={lang} />
      )}
    </div>
  );
}
