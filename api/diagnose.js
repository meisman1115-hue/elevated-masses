// Vercel serverless function (Node.js runtime) — POST /api/diagnose
//
// Takes a plant photo (base64) + symptoms, asks Claude to diagnose it, and
// returns structured JSON. Requires ANTHROPIC_API_KEY as a Vercel
// environment variable (server-side only — no VITE_ prefix, so it never
// reaches the browser bundle).
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic() // reads ANTHROPIC_API_KEY from the environment

const DIAGNOSIS_SCHEMA = {
  type: 'object',
  properties: {
    issue: {
      type: 'string',
      description: 'Short name of the most likely issue, e.g. "Nitrogen deficiency" or "Spider mites"',
    },
    confidence: { type: 'string', enum: ['low', 'medium', 'high'] },
    causes: {
      type: 'array',
      items: { type: 'string' },
      description: '2-4 short bullet points on what is likely causing this, based on the photo and description',
    },
    fixes: {
      type: 'array',
      items: { type: 'string' },
      description: '2-4 short, concrete, actionable bullet points on how to fix it',
    },
  },
  required: ['issue', 'confidence', 'causes', 'fixes'],
  additionalProperties: false,
}

const SYSTEM_PROMPT = `You are a plant health assistant for Elevated Masses, a hydroponics and indoor-growing community site. A grower has submitted a photo and description of a plant problem. Give a practical, likely diagnosis based on visible symptoms in the photo (leaf color, spots, curling, wilting, discoloration pattern, etc.) combined with the grower's description.

Focus on the most common causes in hydroponic/indoor growing: nutrient deficiencies or toxicities, pH/EC imbalance and nutrient lockout, light stress (too close/far, burn, or insufficient), pests (spider mites, aphids, fungus gnats, etc.), overwatering/underwatering or root problems (rot, poor oxygenation), and heat/humidity stress. Be concrete and specific rather than vague — name the most likely single issue, not a list of possibilities. This is general guidance, not a certain diagnosis; growers should keep monitoring and change one variable at a time.`

const ALLOWED_MEDIA_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp'])
const MAX_BASE64_CHARS = 8_000_000 // ~6MB decoded, comfortably under Vercel's request body limit

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    res.status(500).json({ error: 'Plant AI is not configured yet — missing API key.' })
    return
  }

  const { imageBase64, imageMediaType, plantType, symptoms } = req.body || {}

  if (!imageBase64 || typeof imageBase64 !== 'string') {
    res.status(400).json({ error: 'A photo is required.' })
    return
  }
  if (!ALLOWED_MEDIA_TYPES.has(imageMediaType)) {
    res.status(400).json({ error: 'Photo must be a JPEG, PNG, or WebP image.' })
    return
  }
  if (imageBase64.length > MAX_BASE64_CHARS) {
    res.status(413).json({ error: 'Photo is too large. Please try a smaller image.' })
    return
  }

  try {
    const response = await anthropic.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      output_config: {
        effort: 'medium',
        format: { type: 'json_schema', schema: DIAGNOSIS_SCHEMA },
      },
      messages: [
        {
          role: 'user',
          content: [
            { type: 'image', source: { type: 'base64', media_type: imageMediaType, data: imageBase64 } },
            {
              type: 'text',
              text: `Plant type: ${plantType || 'not specified'}\nSymptoms described by the grower: ${symptoms || '(none provided — go by the photo alone)'}`,
            },
          ],
        },
      ],
    })

    if (response.stop_reason === 'refusal') {
      res.status(422).json({ error: "Couldn't analyze this photo. Please try a different image." })
      return
    }

    const textBlock = response.content.find((b) => b.type === 'text')
    if (!textBlock) {
      res.status(502).json({ error: 'No diagnosis returned. Please try again.' })
      return
    }

    const diagnosis = JSON.parse(textBlock.text)
    res.status(200).json({ diagnosis })
  } catch (err) {
    console.error('diagnose error:', err)
    res.status(500).json({ error: 'Could not analyze the photo right now. Please try again in a moment.' })
  }
}
