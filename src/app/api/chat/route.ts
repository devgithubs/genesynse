import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "Missing OpenAI API Key" }, { status: 500 });
  }

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) {
    const error = await res.text();
    return NextResponse.json({ error }, { status: res.status });
  }

  const data = await res.json();
  return NextResponse.json({ reply: data.choices?.[0]?.message?.content ?? "No reply." });
}
