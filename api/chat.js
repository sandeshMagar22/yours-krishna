export const config = {
    runtime: 'edge',
};

export default async function handler(req) {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    }

    try {
        const { messages, model } = await req.json();

        // The key is safely injected into the server by Vercel!
        // It is NEVER exposed to the public browser
        const API_KEY = process.env.VITE_OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY;

        if (!API_KEY) {
            return new Response(JSON.stringify({ error: 'Server misconfigured. Missing OPENROUTER_API_KEY in Vercel environment variables.' }), { status: 500 });
        }

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://yourskrishna.com',
                'X-Title': 'Yours Krishna',
            },
            body: JSON.stringify({
                model: model || 'qwen/qwen3-next-80b-a3b-instruct:free',
                messages: messages,
                stream: true,
                temperature: 0.9,
            }),
        });

        if (!response.ok) {
            const errText = await response.text();
            return new Response(errText, { status: response.status });
        }

        // Securely proxy the stream text back to the browser
        return new Response(response.body, {
            headers: {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
            },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
