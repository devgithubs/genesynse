// utils/gpt.ts
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
    console.error("API Route Error:", data.error);
    return "Sorry, something went wrong.";
  }

  return data.reply;
}
