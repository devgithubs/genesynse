export async function getBotReply(message: string): Promise<string> {
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a helpful support assistant named Genesynse. Keep replies friendly and professional.",
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("OpenAI Error:", data);
      return "Sorry, I had an issue understanding that. Please try again.";
    }

    return data.choices?.[0]?.message?.content ?? "Sorry, I didn't understand that.";
  } catch (err) {
    console.error("OpenAI Fetch Error:", err);
    return "There was a problem reaching the assistant.";
  }
}
