export async function getBotReply(message: string): Promise<string> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt: message }),
  });

  const data = await res.json();

  if (data.error) {
    console.error('OpenAI Error:', data.error);
    return 'Something went wrong with the AI response.';
  }

  return data.reply ?? 'Sorry, I didn’t understand that.';
}
