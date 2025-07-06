export async function getBotReply(userMessage: string, userName: string): Promise<string> {
  const systemPrompt = `You are a helpful, friendly assistant talking to a user named ${userName}. Always address them by name and be kind but concise.`;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userMessage },
      ],
    }),
  });

  const data = await res.json();

  return data.choices?.[0]?.message?.content ?? "Sorry, I didn't understand that.";
}
