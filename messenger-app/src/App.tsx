import React, { useState } from 'react';

// Types
interface Message {
  sender: 'me' | 'friend';
  text: string;
}

const friendsList = ['Alice', 'Bob', 'Charlie'];

// Reusable UI Components
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`border rounded-md ${className}`}>{children}</div>
);

const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={className}>{children}</div>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input className="border p-2 rounded w-full" {...props} />
);

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, ...props }) => (
  <button className="bg-blue-500 text-white px-3 py-1 rounded" {...props}>
    {children}
  </button>
);

// Main Component
const MessengerApp: React.FC = () => {
  const [chats, setChats] = useState<Record<string, Message[]>>({});
  const [selectedFriend, setSelectedFriend] = useState<string>('Alice');
  const [input, setInput] = useState<string>('');

  const handleSend = () => {
    const trimmed = input.trim();
    if (trimmed.length === 0) return;

    setChats((prev) => {
      const messages = prev[selectedFriend] || [];
      return {
        ...prev,
        [selectedFriend]: [...messages, { sender: 'me', text: input }],
      };
    });

    setInput('');
  };

  return (
    <div className="flex h-screen p-4 gap-4">
      {/* Sidebar: Friends List */}
      <Card className="w-1/4">
        <CardContent className="p-2">
          <h2 className="text-lg font-semibold mb-3">Friends</h2>
          {friendsList.map((friend) => (
            <Button
              key={friend}
              onClick={() => setSelectedFriend(friend)}
              className={`w-full mb-2 ${
                selectedFriend === friend ? 'bg-blue-600' : 'bg-blue-500'
              }`}
            >
              {friend}
            </Button>
          ))}
        </CardContent>
      </Card>

      {/* Chat Window */}
      <Card className="flex-1 flex flex-col">
        <CardContent className="flex-1 p-2 overflow-y-auto space-y-2">
          {(chats[selectedFriend] || []).map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-md max-w-xs ${
                msg.sender === 'me' ? 'bg-blue-100 self-end' : 'bg-gray-200 self-start'
              }`}
            >
              {msg.text}
            </div>
          ))}
        </CardContent>

        {/* Input Area */}
        <div className="p-2 border-t flex gap-2">
          <Input
            value={input}
            placeholder="Type a message..."
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
          />
          <Button onClick={handleSend}>Send</Button>
        </div>
      </Card>
    </div>
  );
};

export default MessengerApp;
