// components/Chat.js
'use client'
import React, { useState, ChangeEvent } from 'react';

interface Message {
  text: string;
  type: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      setMessages([...messages, { text: inputValue, type: 'user' }]);
      // Add your chatbot logic here if needed
      setInputValue('');
    }
  };

  return (
    <div className='flex'>
  <div className="min-h-200 border-1 border-solid border-gray-300 p-10 rounded-md">
    {messages.map((message, index) => (
      <div key={index} className={`mb-10 text-${message.type === 'user' ? 'right' : 'left'}`}>
        {message.text}
      </div>
    ))}
  </div>
  <div className="flex mt-4">
    <input
      className="block w-full border-0 p-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 mr-2"
      type="text"
      value={inputValue}
      onChange={handleInputChange}
    />
    <button
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      onClick={handleSendMessage}
    >
      Send
    </button>
  </div>
</div>

  );
};

export default Chat;
