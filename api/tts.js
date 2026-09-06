export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const text = typeof req.body?.text === "string" ? req.body.text.trim() : "";
  if (!text || text.length > 1200) {
    res.status(400).json({ error: "Invalid text" });
    return;
  }

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "OPENAI_API_KEY is not configured" });
    return;
  }

  const response = await fetch("https://api.openai.com/v1/audio/speech", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini-tts",
      voice: "shimmer",
      input: text,
      instructions:
        "Speak in clear standard British English. Use a bright, warm, youthful female-presenter style suitable for a three-year-old child. Sound like a friendly British children's TV presenter or excellent nursery teacher: sunny, natural, confident, affectionate and engaging. Use crisp articulation, gentle energy, a light smile in the voice, and slightly slower pacing for language learning. Avoid breathiness, raspiness, vocal fry, whispering, exaggerated baby talk, theatrical acting, or an American accent. Keep instructions playful and stories expressive but calm.",
      response_format: "mp3",
      speed: 0.92
    })
  });

  if (!response.ok) {
    const detail = await response.text();
    console.error("OpenAI TTS error:", response.status, detail);
    res.status(502).json({ error: "Voice generation failed" });
    return;
  }

  const arrayBuffer = await response.arrayBuffer();
  const audio = Buffer.from(arrayBuffer);

  res.setHeader("Content-Type", "audio/mpeg");
  res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
  res.status(200).send(audio);
}
