import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import path from "path";

process.env.GOOGLE_GENAI_USE_VERTEXAI = "true";
process.env.GOOGLE_CLOUD_PROJECT =
  process.env.GCP_PROJECT_ID || "project-525de637-e380-4184-b17";
process.env.GOOGLE_CLOUD_LOCATION = process.env.GCP_LOCATION || "global";

import { GoogleGenAI, Type } from "@google/genai";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({ origin: "*" }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const uploadDir = path.join("/tmp", "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  dest: uploadDir,
  limits: { fileSize: 30 * 1024 * 1024 },
});

const ai = new GoogleGenAI({});

// Función de respaldo para limpiar JSON mal formateado
function safeParseJSON(str) {
  try {
    let clean = str
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();
    return JSON.parse(clean);
  } catch (err) {
    console.warn("Direct JSON.parse failed, attempting repair...", err.message);
    let clean = str
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();
    // Extraer solo lo que está entre el primer { y el último }
    const firstBrace = clean.indexOf("{");
    const lastBrace = clean.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1) {
      clean = clean.substring(firstBrace, lastBrace + 1);
    }
    return JSON.parse(clean);
  }
}

app.post("/api/audit-video", upload.single("video"), async (req, res) => {
  let videoPath = null;
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No video file provided" });
    }

    videoPath = req.file.path;
    const fileStats = fs.statSync(videoPath);
    const fileSizeMB = fileStats.size / (1024 * 1024);

    if (fileSizeMB > 30) {
      if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);
      return res.status(413).json({
        error: "Video file exceeds 30MB limit",
        details: `File is ${fileSizeMB.toFixed(1)}MB. Maximum allowed is 30MB.`,
      });
    }

    const videoBytes = fs.readFileSync(videoPath);
    const base64Video = videoBytes.toString("base64");
    const mimeType = req.file.mimetype || "video/mp4";
    const lang = req.body.language || "en";

    const prompt = `
You are Cutty, an elite short-form viral video director and brutally honest editing mentor.
Inspect this video thoroughly (visual motion, cuts, framing, text overlays, and audio track).

CRITICAL MULTIMODAL INSTRUCTIONS:
- AUDIO CHECK: Verify if there is actual audio (voiceover, background music, sound effects) or if the clip is SILENT / NO AUDIO. If there is NO audio, explicitly state "No audio track detected" and focus critique purely on visual pacing, text, and cuts. Do NOT complain about missing audio balance if the video has no audio.
- VIDEO CHECK: Look at the actual scene changes, framing, lighting, face expressions, and on-screen text.
- TIMESTAMPS: Generate key moments ONLY at seconds where real visual events, transitions, or hook elements occur.
- Write ALL text (summary, critiques, suggestions, broRoast, labels) STRICTLY in ${lang === "es" ? "SPANISH (Español)" : "ENGLISH"}.
- mascotReaction must be chosen strictly based on the moment quality:
  * "happy": Great visual hook, crisp transition, or clean visual dynamic.
  * "bored": Static frame, no movement, or slow pacing.
  * "confused": Jarring cut, unreadable text, or awkward framing.
  * "shocked": Immediate viewer drop-off risk, bad start, or cut error.
  * "encouraging": Solid concept that needs a specific tweak.
- viralityScore must reflect the real retention quality from 0 to 100.
`;

    // Configuración con Schema Estricto garantizado por Vertex AI
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: [
        {
          inlineData: {
            data: base64Video,
            mimeType: mimeType,
          },
        },
        prompt,
      ],
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            viralityScore: { type: Type.INTEGER },
            summary: { type: Type.STRING },
            overallMood: { type: Type.STRING },
            broRoast: { type: Type.STRING },
            timelineFeedback: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  timestampSeconds: { type: Type.INTEGER },
                  mascotReaction: { type: Type.STRING },
                  critique: { type: Type.STRING },
                  suggestion: { type: Type.STRING },
                  type: { type: Type.STRING },
                },
                required: [
                  "timestampSeconds",
                  "mascotReaction",
                  "critique",
                  "suggestion",
                  "type",
                ],
              },
            },
            editingKit: {
              type: Type.OBJECT,
              properties: {
                sfx: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      useCase: { type: Type.STRING },
                    },
                    required: ["name", "useCase"],
                  },
                },
                fonts: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      style: { type: Type.STRING },
                    },
                    required: ["name", "style"],
                  },
                },
                effects: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      name: { type: Type.STRING },
                      moment: { type: Type.STRING },
                    },
                    required: ["name", "moment"],
                  },
                },
                colorPalette: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      label: { type: Type.STRING },
                      hex: { type: Type.STRING },
                    },
                    required: ["label", "hex"],
                  },
                },
              },
              required: ["sfx", "fonts", "effects", "colorPalette"],
            },
          },
          required: [
            "viralityScore",
            "summary",
            "overallMood",
            "broRoast",
            "timelineFeedback",
            "editingKit",
          ],
        },
      },
    });

    let responseText = response.text || "{}";
    let raw;
    try {
      raw = safeParseJSON(responseText);
    } catch (parseErr) {
      console.error("Fatal JSON parse failure. Raw text was:", responseText);
      throw new Error("AI returned malformed temporal data. Please retry.");
    }

    const kit = raw.editingKit || {};

    const sfx =
      Array.isArray(kit.sfx) && kit.sfx.length > 0
        ? kit.sfx
        : [
            { name: "Whoosh Swoosh Fast", useCase: "Scene transition" },
            { name: "Camera Shutter Fast", useCase: "Visual hook change" },
            { name: "Digital Chime Pop", useCase: "Keyword emphasis" },
          ];

    const fonts =
      Array.isArray(kit.fonts) && kit.fonts.length > 0
        ? kit.fonts
        : [
            {
              name: "Montserrat Black",
              style: "Uppercase bold + black stroke",
            },
            { name: "The Bold Font", style: "Initial hook text" },
            { name: "Futura Bold", style: "Dynamic subtitles" },
          ];

    const effects =
      Array.isArray(kit.effects) && kit.effects.length > 0
        ? kit.effects
        : [
            { name: "Fast Zoom In (115%)", moment: "Second 00:02 hook" },
            { name: "Whip Pan Blur", moment: "Mid cut" },
            { name: "Flash Glow Cut", moment: "Call to action" },
          ];

    const colorPalette =
      Array.isArray(kit.colorPalette) && kit.colorPalette.length > 0
        ? kit.colorPalette
        : [
            { label: "Viral Yellow", hex: "#FFE600" },
            { label: "Neon Emerald", hex: "#10B981" },
            { label: "Pure White", hex: "#FFFFFF" },
          ];

    const finalEditingKit = { sfx, fonts, effects, colorPalette };

    const auditResult = {
      ...raw,
      editingKit: finalEditingKit,
      sfx,
      fonts,
      effects,
      colorPalette,
    };

    if (fs.existsSync(videoPath)) {
      fs.unlinkSync(videoPath);
    }

    return res.json(auditResult);
  } catch (error) {
    console.error("Audit Error:", error);
    if (videoPath && fs.existsSync(videoPath)) {
      fs.unlink(videoPath, () => {});
    }
    return res.status(500).json({
      error: "Error auditing video",
      details: error.message,
    });
  }
});

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "cutty-backend",
    model: "gemini-3.5-flash",
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
