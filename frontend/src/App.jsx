import React, { useState } from "react";
import Header from "./components/Header";
import HeroLanding from "./components/HeroLanding";
import VideoAuditWorkspace from "./components/VideoAuditWorkspace";

export default function App() {
  const [lang, setLang] = useState("es"); // 'es' o 'en'
  const [videoFile, setVideoFile] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoUrl(URL.createObjectURL(file));
    }
  };

  const handleReset = () => {
    setVideoFile(null);
    setVideoUrl(null);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black antialiased">
      {/* Header Global */}
      <Header lang={lang} setLang={setLang} onReset={handleReset} />

      {/* Contenedor Principal Panorámico Bento */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col">
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

      {/* Footer Minimalista */}
      <footer className="border-t border-zinc-900/80 py-5 text-center text-xs text-zinc-500 font-mono">
        Cutty AI • AI Video Director Copilot • Powered by Google Gemini 3.6
        Flash
      </footer>
    </div>
  );
}
