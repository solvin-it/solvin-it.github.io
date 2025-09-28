import { useState, useEffect, useRef } from 'react';
import { CHAT_API_ENDPOINT, ChatRequestPayload, ChatResponsePayload } from '../config/chat';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Handle mobile keyboard and viewport changes
  useEffect(() => {
    if (!isOpen) return;

    const handleResize = () => {
      // Detect keyboard on mobile by comparing viewport height
      const vh = window.visualViewport?.height || window.innerHeight;
      const windowHeight = window.screen.height;
      const keyboardOffset = windowHeight - vh;
      
      setKeyboardHeight(keyboardOffset > 150 ? keyboardOffset : 0);
    };

    const handleVisualViewportChange = () => {
      if (window.visualViewport) {
        const keyboardOffset = window.innerHeight - window.visualViewport.height;
        setKeyboardHeight(keyboardOffset > 150 ? keyboardOffset : 0);
      }
    };

    // Listen for viewport changes
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleVisualViewportChange);
    } else {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleVisualViewportChange);
      } else {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [isOpen]);

  // Prevent body scroll when chat is open (mobile)
  useEffect(() => {
    if (!isOpen) return;
    
    // Store original body style
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalPosition = window.getComputedStyle(document.body).position;
    
    // Prevent scroll
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${window.scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    
    return () => {
      // Restore scroll
      const scrollY = document.body.style.top;
      document.body.style.overflow = originalStyle;
      document.body.style.position = originalPosition;
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    };
  }, [isOpen]);

  // Initial welcome message
  useEffect(() => {
    setMessages([
      {
        id: '1',
        content: "Good day. I am Fred, the AI butler of Mr. Gonzales. He told me you might inquire about his career, skills, or projects, and that I shall provide the details. Shall we begin?",
        isUser: false,
        timestamp: new Date(),
      },
    ]);
  }, []);

  // Scroll to bottom when messages change or keyboard appears
  useEffect(() => {
    if (!messagesEndRef.current || !isOpen) return;
    
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      });
    };
    
    // Delay to account for DOM updates and keyboard animations
    const timeoutId = setTimeout(scrollToBottom, keyboardHeight > 0 ? 300 : 100);
    return () => clearTimeout(timeoutId);
  }, [messages, isOpen, keyboardHeight]);

  // Focus input when drawer opens (with delay for mobile)
  useEffect(() => {
    if (!isOpen || !inputRef.current) return;
    
    // Longer delay on mobile to account for animations and keyboard
    const delay = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) ? 300 : 100;
    const timeoutId = setTimeout(() => {
      inputRef.current?.focus({ preventScroll: true });
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  const parseAssistantMessage = (payload: ChatResponsePayload | string): string => {
    const fallback = "I'm having trouble reading the assistant's reply right now. Please try again.";

    if (typeof payload === 'string') {
      return payload.trim() || fallback;
    }

    // Handle your specific API response format
    if (payload.output && payload.output.messages) {
      return payload.output.messages.trim();
    }

    // Fallback to other common formats
    const candidates: Array<keyof ChatResponsePayload | string> = [
      'response',
      'reply',
      'message',
      'answer',
      'content',
    ];

    for (const key of candidates) {
      const value = payload[key as keyof ChatResponsePayload];
      if (typeof value === 'string' && value.trim()) {
        return value.trim();
      }
    }

    const choices = payload.choices;
    if (Array.isArray(choices)) {
      for (const choice of choices) {
        const content = choice?.message?.content;
        if (typeof content === 'string' && content.trim()) {
          return content.trim();
        }
      }
    }

    return fallback;
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const payload: ChatRequestPayload = {
        messages: [
          {
            role: 'human',
            content: userMessage.content
          }
        ],
        thread_id: `thread-${Date.now()}`
      };
      
      const response = await fetch(CHAT_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = (await response.json()) as ChatResponsePayload | string;
      const content = parseAssistantMessage(data);

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      
      // Refocus input after response on mobile for follow-up questions
      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) && inputRef.current) {
        setTimeout(() => {
          inputRef.current?.focus({ preventScroll: true });
        }, 500); // Wait for keyboard animation and message rendering
      }
    } catch (error) {
      console.error('Failed to fetch chat response', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm having trouble connecting to Jose's AI assistant at the moment. Please try again shortly.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorResponse]);
      
      // Refocus input even after error on mobile
      if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) && inputRef.current) {
        setTimeout(() => {
          inputRef.current?.focus({ preventScroll: true });
        }, 500);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Focus trap
  useEffect(() => {
    if (!isOpen) return;

    const drawer = document.querySelector('[data-chat-drawer]');
    if (!drawer) return;

    const focusableElements = drawer.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen]);

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 bg-tuxedo-black hover:bg-primary-800 text-tuxedo-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-label="Open chat with AI Butler"
        title="Chat with my AI Butler"
        data-chat-fab
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-tuxedo-black/50 z-40 transition-opacity duration-300 ease-in-out"
          onClick={handleOverlayClick}
        />
      )}

      {/* Chat Drawer */}
      <div
        ref={drawerRef}
        data-chat-drawer
        className={`fixed top-0 right-0 w-full max-w-md bg-tuxedo-white dark:bg-tuxedo-midnight shadow-2xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ 
          height: keyboardHeight > 0 
            ? `${window.innerHeight - keyboardHeight}px` 
            : '100vh',
          maxHeight: keyboardHeight > 0 
            ? `${window.innerHeight - keyboardHeight}px` 
            : '100vh'
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-primary-200 dark:border-primary-800">
          <h2
            id="chat-title"
            className="text-lg font-semibold text-tuxedo-black dark:text-tuxedo-pearl"
          >
            Chat with my AI Butler
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 text-primary-600 dark:text-primary-400 hover:text-tuxedo-black dark:hover:text-tuxedo-pearl hover:bg-primary-100 dark:hover:bg-primary-800 rounded-lg transition-colors"
            aria-label="Close chat"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0" style={{ 
          paddingBottom: keyboardHeight > 0 ? '1rem' : '1rem',
          scrollBehavior: 'smooth'
        }}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.isUser
                    ? 'bg-tuxedo-black text-tuxedo-white'
                    : 'bg-primary-100 dark:bg-primary-900 text-tuxedo-black dark:text-tuxedo-pearl'
                }`}
              >
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

        {/* Input */}
        <div className="flex-shrink-0 p-4 border-t border-primary-200 dark:border-primary-800 bg-tuxedo-white dark:bg-tuxedo-midnight">
          <div className="flex space-x-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about Jose's experience..."
              className="flex-1 px-4 py-3 border border-primary-300 dark:border-primary-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-tuxedo-white dark:bg-tuxedo-midnight text-tuxedo-black dark:text-tuxedo-pearl placeholder-primary-500 dark:placeholder-primary-400 text-base"
              disabled={isLoading}
              autoComplete="off"
              autoCapitalize="sentences"
              autoCorrect="on"
            />
            <button
              onClick={() => void handleSendMessage()}
              disabled={!inputValue.trim() || isLoading}
              className="px-4 py-3 bg-tuxedo-black hover:bg-primary-800 disabled:bg-primary-300 dark:disabled:bg-primary-700 text-tuxedo-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed flex-shrink-0"
              aria-label="Send message"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
