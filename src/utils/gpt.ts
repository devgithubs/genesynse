export async function getBotReply(prompt: string): Promise<string> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });

  const data = await res.json();
  if (!res.ok) {
    console.error('OpenAI Error:', data.error);
    return "Oops! Couldn't get a reply.";
  }

  return data.reply;
}
