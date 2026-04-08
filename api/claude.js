// api/claude.js
//
// Función serverless de Vercel.
// Vercel detecta automáticamente cualquier archivo dentro de /api
// y lo convierte en un endpoint serverless.
//
// URL de acceso desde el frontend: /api/claude

export default async function handler(req, res) {
  // Solo aceptamos POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // process.env aquí es seguro — corre en Node, no en el navegador
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(req.body),
    })

    const data = await response.json()
    return res.status(response.status).json(data)

  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
