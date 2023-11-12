'use client';
import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className='flex justify-center items-center'>
      <div className='mx-80'>
        {messages.map(m => (
          <div key={m.id} className='mt-5 mb-5'>
            {m.role}: {m.content}
          </div>
        ))}

        <form onSubmit={handleSubmit}>
          <input
            value={input}
            placeholder="Message"
            onChange={handleInputChange}
            style={{ width: '100%' }} // Set width to 100%
          />
        </form>
      </div>
    </div>
  );
}
