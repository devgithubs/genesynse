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
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>

      <h1 className="text-2xl font-semibold mb-4">Welcome to <span className='text-yellow'>Liberty</span> Assistant</h1>

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
        Liberty Assistant | Made by Arthur
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
