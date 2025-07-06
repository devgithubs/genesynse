'use client';
import { useState } from 'react';
import MessageBubble from './MessageBubble';
import { getBotReply } from '@/utils/gpt';
import { supabase } from '@/lib/supabase';

export default function Chat({ userName }: { userName: string }) {
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { from: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Log user message to Supabase
    await supabase.from('messages').insert([
      { from_user: true, message: input, user_name: userName }
    ]);

    // Get reply from OpenAI (no userName passed)
    const botReply = await getBotReply(input);
    const botMsg = { from: 'bot', text: botReply };

    // Log bot reply to Supabase
    await supabase.from('messages').insert([
      { from_user: false, message: botReply, user_name: userName }
    ]);

    setMessages(prev => [...prev, botMsg]);
    setLoading(false);
  };

  const handleEscalate = async () => {
    await supabase.from('messages').insert([
      { from_user: true, message: `[Escalation Request]`, user_name: userName }
    ]);
    alert("An agent has been notified.");
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="h-[60vh] overflow-y-auto border rounded-md p-3 bg-white shadow-sm mb-4">
        {messages.map((m, i) => (
          <MessageBubble key={i} from={m.from} text={m.text} />
        ))}
        {loading && <MessageBubble from="bot" text="Typing..." />}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded">
          Send
        </button>
      </div>
      <button
        onClick={handleEscalate}
        className="mt-4 w-full bg-red-600 text-white py-2 rounded"
      >
        Escalate to Agent
      </button>
    </div>
  );
}
