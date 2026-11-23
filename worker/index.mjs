const facts = `Bryan Kim Calipes is a BS Information Technology student at St. Paul University Surigao. He started building websites with PHP, HTML and MySQL, then moved to Python and Django. His tools include React, TypeScript, Next.js, Bootstrap, Tailwind CSS, PostgreSQL, Arduino and ESP32. He enjoys Mobile Legends, Albion Online and DOTA 2.
Codoria (formerly PauliCode) is his team's gamified programming and cybersecurity education capstone for students and teachers, with classrooms, grading and anti-cheating features. Aralaro is a math learning app inspired by tutoring his Grade 6 niece, with diagrams, color highlights and games.
He passed CodeChum’s Basic Programming Fundamentals Certification Exam for C Programming 1 on May 12, 2023 with 75%. He passed the CSC exam. His team placed second in the Philippine Army TRON Cyber Defense Competition on March 28, 2026. His GitHub handle is calipes-dev and contact email is bryankimcalipes@gmail.com.`

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin')
    if (origin !== env.PORTFOLIO_ORIGIN || !origin) return new Response(null, { status: 403 })
    const headers = {
      'Access-Control-Allow-Origin': origin, 'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type', 'Cache-Control': 'no-store', Vary: 'Origin',
    }
    const empty = status => new Response(null, { status, headers })
    if (request.method === 'OPTIONS') return empty(204)
    if (request.method !== 'POST') return empty(405)
    if (!request.headers.get('Content-Type')?.startsWith('application/json')) return empty(415)
    if (Number(request.headers.get('Content-Length')) > 8192) return empty(413)
    const body = await request.json().catch(() => null)
    if (typeof body?.question !== 'string' || !body.question.trim() || body.question.length > 1000) return empty(400)
    if (!env.GEMINI_API_KEY) return empty(503)
    try {
      const model = encodeURIComponent(env.GEMINI_MODEL || 'gemini-flash-lite-latest')
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: 'POST', signal: AbortSignal.timeout(12000),
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: 'Answer briefly in plain text about Bryan using only these public facts. If the facts do not answer the question or the question is unrelated, reply UNKNOWN.\n' + facts }] },
          contents: [{ role: 'user', parts: [{ text: body.question }] }],
          generationConfig: { maxOutputTokens: 256 },
        }),
      })
      if (!response.ok) return empty(response.status === 429 ? 429 : 503)
      const candidate = (await response.json()).candidates?.[0]
      const answer = candidate?.content?.parts?.filter(part => !part.thought).map(part => part.text).join('').trim()
      if (candidate?.finishReason !== 'STOP' || !answer || /^UNKNOWN[.!]?$/i.test(answer)) return empty(204)
      return Response.json({ answer }, { headers })
    } catch { return empty(503) }
  },
}
