import React, { useState } from "react";
import Header from "./components/Header";
import HeroLanding from "./components/HeroLanding";
import VideoAuditWorkspace from "./components/VideoAuditWorkspace";

export default function App() {
  const [lang, setLang] = useState("en"); // 'en' default for global submission
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const MAX_SIZE_MB = 30;
    const fileSizeMB = file.size / (1024 * 1024);

    if (fileSizeMB > MAX_SIZE_MB) {
      alert(
        lang === "es"
          ? `⚠️ El video pesa ${fileSizeMB.toFixed(1)}MB.\n\nPara un análisis óptimo en tiempo real con Gemini, el tamaño máximo permitido es de ${MAX_SIZE_MB}MB.\nPor favor comprímelo o sube un clip más corto.`
          : `⚠️ Video size is ${fileSizeMB.toFixed(1)}MB.\n\nFor optimal real-time analysis with Gemini, maximum file size is ${MAX_SIZE_MB}MB.\nPlease compress it or upload a shorter clip.`,
      );
      e.target.value = "";
      return;
    }

    setVideoFile(file);
    setVideoUrl(URL.createObjectURL(file));
  };

  const handleReset = () => {
    setVideoFile(null);
    setVideoUrl(null);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black antialiased relative overflow-x-hidden">
      {/* Subtle technical background grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: "radial-gradient(#27272a 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Global Header with Flags */}
      <Header
        lang={lang}
        setLang={setLang}
        onReset={handleReset}
        isAuditingView={Boolean(videoFile)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col relative z-10">
        {!videoFile ? (
          <HeroLanding lang={lang} onFileSelect={handleFileSelect} />
        ) : (
          <VideoAuditWorkspace
            videoFile={videoFile}
            videoUrl={videoUrl}
            lang={lang}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-900/90 py-6 text-center text-xs text-zinc-500 font-mono relative z-10 bg-zinc-950/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>CUTTY AI • AI Video Director Copilot</span>
          <span className="text-zinc-600">
            Built with Google Gemini 3.5 Flash & Vertex AI
          </span>
          <span className="text-emerald-500/80">Ju4mpizel</span>
        </div>
      </footer>
    </div>
  );
}
