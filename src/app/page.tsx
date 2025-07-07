'use client';

import { useState } from 'react';
import Chat from '@/components/Chat';
import { QRCodeCanvas } from 'qrcode.react';

export default function Home() {
  const [name, setName] = useState('');
  const [nameSubmitted, setNameSubmitted] = useState(false);

  const handleSubmitName = () => {
    if (name.trim()) {
      setNameSubmitted(true);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-white text-black min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Welcome to Genesys Assistant</h1>

      {!nameSubmitted ? (
        <div className="space-y-4 flex flex-col items-center">
          <input
            type="text"
            placeholder="Enter your name to begin..."
            className="border p-2 rounded w-64"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSubmitName()}
          />

          <button
            onClick={handleSubmitName}
            className="bg-blue-600 text-white px-4 py-2 rounded w-64"
          >
            Start Chatting
          </button>
        </div>
      ) : (
        <Chat userName={name} />
      )}

      <div className="mt-10 flex flex-col items-center">
        <QRCodeCanvas value="https://genesynse.vercel.app/" size={128} />
        <p className="mt-2 text-sm text-gray-500 text-center">
          Scan to open on mobile
        </p>
      </div>

      <footer className="mt-10 text-center text-sm text-gray-500">
        Made by Arthur for Antonio @ Genesys
        <div className="mt-8 text-black">
          <a
            href="https://github.com/devgithubs/genesynse?tab=readme-ov-file#genesynse"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github Repo
          </a>
        </div>
      </footer>
    </main>
  );
}
