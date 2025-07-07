import React, { useState } from 'react';
import './App.css';

interface Message {
  sender: 'me' | 'friend';
  text: string;
}

const friends = ['navjot', 'rohit', 'pranav'];

export default function MessengerApp() {
  const [chats, setChats] = useState<Record<string, Message[]>>({});
  const [selectedFriend, setSelectedFriend] = useState(friends[0]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setChats((prev) => ({
      ...prev,
      [selectedFriend]: [...(prev[selectedFriend] || []), { sender: 'me', text: trimmed }],
    }));

    setInput('');
  };

  return (
    <div className="messenger">
      <div className="messenger__container">
        <aside className="messenger__sidebar">
          <h2>Friends</h2>
          {friends.map((friend) => (
            <button
              key={friend}
              className={`friend-button ${friend === selectedFriend ? 'active' : ''}`}
              onClick={() => setSelectedFriend(friend)}
            >
              {friend}
            </button>
          ))}
        </aside>

        <section className="messenger__chat">
          <header className="chat__header">{selectedFriend}</header>

          <div className="chat__messages">
            {(chats[selectedFriend] || []).map((msg, i) => (
              <div
                key={i}
                className={`chat__bubble ${msg.sender === 'me' ? 'chat__bubble--me' : 'chat__bubble--friend'}`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <footer className="chat__input-row">
            <button onClick={handleSend} className="send-button">Send</button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="chat-input"
            />
          </footer>
        </section>
      </div>
    </div>
  );
}
