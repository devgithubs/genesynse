'use client';
import { useState } from 'react';
import Chat from '@/components/Chat';


export default function Home() {
  const [name, setName] = useState('');
  const [started, setStarted] = useState(false);

  const handleStart = () => {
    if (name.trim()) setStarted(true);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      {!started ? (
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Welcome to Genesynse</h1>
          <input
            placeholder="Enter your name"
            className="border px-3 py-2 rounded"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <br />
          <button onClick={handleStart} className="bg-green-600 text-white px-4 py-2 rounded">Start Chat</button>
        </div>
      ) : (
        <Chat userName={name} />
      )}
    </main>
  );
}
