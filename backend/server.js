import "dotenv/config";
import express from "express";
import cors from "cors";
import multer from "multer";
import { VertexAI } from "@google-cloud/vertexai";
import fs from "fs";

const app = express();
app.use(cors());
app.use(express.json());

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

const upload = multer({ dest: "uploads/" });

// Inicialización de Vertex AI usando las credenciales de gcloud ADC
const project =
  process.env.GOOGLE_CLOUD_PROJECT || "project-525de637-e380-4184-b17";
const location = process.env.GOOGLE_CLOUD_LOCATION || "us-central1";

const vertexAI = new VertexAI({ project, location });

// Esquema JSON para la respuesta estructurada
const responseSchema = {
  type: "OBJECT",
  properties: {
    viralityScore: {
      type: "NUMBER",
      description: "Overall virality and retention score from 0 to 100",
    },
    overallMood: {
      type: "STRING",
      enum: [
        "happy",
        "bored",
        "analyzing",
        "confused",
        "shocked",
        "encouraging",
      ],
    },
    summary: {
      type: "STRING",
      description: "Professional director verdict",
    },
    broRoast: {
      type: "STRING",
      description:
        "Humorous, modern Gen-Z / 'Bro' unfiltered reaction to the video content (funny roast if low score, hype praise if high score). Keep it witty and viral.",
    },
    timelineFeedback: {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          timestampSeconds: { type: "NUMBER" },
          type: {
            type: "STRING",
            enum: ["pacing", "hook", "visual", "audio"],
          },
          critique: { type: "STRING" },
          suggestion: { type: "STRING" },
          mascotReaction: {
            type: "STRING",
            enum: [
              "happy",
              "bored",
              "analyzing",
              "confused",
              "shocked",
              "encouraging",
            ],
          },
        },
        required: [
          "timestampSeconds",
          "type",
          "critique",
          "suggestion",
          "mascotReaction",
        ],
      },
    },
    editingKit: {
      type: "OBJECT",
      description:
        "Curated real-world editing assets for CapCut/Premiere tailored to this video vibe",
      properties: {
        sfx: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              name: { type: "STRING" },
              useCase: { type: "STRING" },
            },
            required: ["name", "useCase"],
          },
        },
        fonts: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              name: { type: "STRING" },
              style: { type: "STRING" },
            },
            required: ["name", "style"],
          },
        },
        effects: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              name: { type: "STRING" },
              moment: { type: "STRING" },
            },
            required: ["name", "moment"],
          },
        },
        colorPalette: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              hex: { type: "STRING" },
              label: { type: "STRING" },
            },
            required: ["hex", "label"],
          },
        },
      },
      required: ["sfx", "fonts", "effects", "colorPalette"],
    },
  },
  required: [
    "viralityScore",
    "overallMood",
    "summary",
    "broRoast",
    "timelineFeedback",
    "editingKit",
  ],
};

// Configuración del modelo en Vertex AI
const generativeModel = vertexAI.getGenerativeModel({
  model: "gemini-3.5-flash",
  generationConfig: {
    responseMimeType: "application/json",
    responseSchema: responseSchema,
  },
});

app.post("/api/audit-video", upload.single("video"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No se subió ningún video" });
    }

    const language = req.body.language === "en" ? "English" : "Spanish";

    console.log(`1. Preparando video para Vertex AI (Idioma: ${language})...`);
    const videoBuffer = fs.readFileSync(req.file.path);
    const videoBase64 = videoBuffer.toString("base64");
    const mimeType = req.file.mimetype || "video/mp4";

    const prompt = `
      You are Cutty, an expert social media video director and editor. 
      Analyze this vertical video for pacing, retention hooks, visual dynamism, and audio balance.

      Generate:
      1. 'summary': A professional director critique.
      2. 'broRoast': A brutally honest, funny, modern 'Bro Talk' reaction as a viewer on TikTok.
          - If score < 75: A hilarious roast teasing the slow moments (e.g. "Hermano, si me quisiera dormir me pongo un documental, recorta ese inicio que me quedo tieso zzz").
          - If score >= 75: Pure hype compliment (e.g. "Sinceramente con esos planos sí voy a ese lugar de una, qué buen ritmo bro").
      3. 'timelineFeedback': Granular second-by-second cuts.
      4. 'editingKit': Real-world SFX, CapCut fonts, and transitions.

      IMPORTANT LANGUAGE RULE:
      Write all responses (summary, broRoast, critiques, suggestions, editingKit) strictly in ${language}.
    `;

    console.log("2. Analizando con Gemini en Vertex AI (Google Cloud)...");
    const reqData = {
      contents: [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                data: videoBase64,
                mimeType: mimeType,
              },
            },
            { text: prompt },
          ],
        },
      ],
    };

    const responseStream = await generativeModel.generateContent(reqData);
    const responseResult = await responseStream.response;
    const text = responseResult.candidates[0].content.parts[0].text;

    // Limpiar archivo local temporal
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    const cleanJson = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const auditData = JSON.parse(cleanJson);

    console.log(
      "3. ¡Análisis, Roast y Kit completados con éxito desde Google Cloud!",
    );
    res.json(auditData);
  } catch (error) {
    console.error("--- ERROR DETALLADO VERTEX AI ---");
    console.error(error);
    console.error("--------------------------------");
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({
      error: error.message || "Error al auditar el video en Vertex AI",
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `🚀 Cutty Backend corriendo con Vertex AI en http://localhost:${PORT}`,
  ),
);
