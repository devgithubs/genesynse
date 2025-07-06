// components/MessageBubble.tsx
export default function MessageBubble({ from, text }: { from: string; text: string }) {
  const isUser = from === 'user';
  return (
    <div className={`my-2 ${isUser ? 'text-right' : 'text-left'}`}>
      <span className={`inline-block px-4 py-2 rounded-xl ${isUser ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
        {text}
      </span>
    </div>
  );
}
