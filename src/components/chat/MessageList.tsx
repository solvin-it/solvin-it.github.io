import React from 'react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface Props {
  messages: Message[];
  isLoading: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export default function MessageList({ messages, isLoading, messagesEndRef }: Props) {
  return (
    <div data-chat-messages className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollBehavior: 'auto', overscrollBehavior: 'contain' }}>
      <div aria-live="polite" className="sr-only" id="chat-live" />

      {messages.map((message) => (
        <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
          <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
            message.isUser
              ? 'bg-tuxedo-black text-tuxedo-white'
              : 'bg-primary-100 dark:bg-primary-900 text-tuxedo-black dark:text-tuxedo-pearl'
          }`}>
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-primary-100 dark:bg-primary-900 px-4 py-2 rounded-2xl">
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
