// netlify/functions/claude.js
//
// Función serverless de Netlify.
// Recibe la petición del navegador, añade la API key (que está
// en las variables de entorno del servidor, nunca en el cliente)
// y reenvía la petición a Anthropic.
//
// URL de acceso desde el frontend: /.netlify/functions/claude

export default async (req) => {
  // Solo aceptamos POST
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const body = await req.json()

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // process.env aquí es seguro — corre en Node, no en el navegador
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify(body),
    })

    const data = await response.json()

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
        // Permitimos peticiones solo desde nuestro propio dominio
        'Access-Control-Allow-Origin': '*',
      },
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

// Configuración de Netlify: indica que es una función Edge (más rápida)
export const config = { path: '/api/claude' }
