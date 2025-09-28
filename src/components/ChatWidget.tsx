import { useState, useEffect, useRef } from 'react';
import { CHAT_API_ENDPOINT, ChatRequestPayload, ChatResponsePayload } from '../config/chat';
import useKeyboardInset from './chat/useKeyboardInset';
import MessageList from './chat/MessageList';
import ChatInput from './chat/ChatInput';
import useChatApi from './chat/useChatApi';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatError {
  type: 'network' | 'timeout' | 'server' | 'offline';
  message: string;
  retryable: boolean;
}

const generateId = () => Math.random().toString(36).substring(2, 15);

const isMobileDevice = () => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
         ('ontouchstart' in window && window.innerWidth < 768);
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isComposing, setIsComposing] = useState(false);
  const [error, setError] = useState<ChatError | null>(null);
  const [inputHeight, setInputHeight] = useState(72);
  // chat API hook
  const { sendMessage, isLoading: apiLoading, abort } = useChatApi();
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);
  const focusTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const liveRegionRef = useRef<HTMLDivElement>(null);

  // Helper function to reset textarea height and update input height state
  const resetTextareaHeight = () => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.max(inputRef.current.scrollHeight, isMobile ? 52 : 40)}px`;
      
      // Update input height state for proper message list spacing
      setTimeout(() => {
        // Prefer reading the ChatInput container height
        const container = document.querySelector('[data-chat-input-root]') as HTMLElement | null;
        if (container) {
          setInputHeight(container.offsetHeight);
        } else if (inputRef.current) {
          const height = inputRef.current.offsetHeight;
          setInputHeight(height + 24);
        }

        // Ensure message list scrolls to the end so input visually sits at bottom
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
        }
      }, 0);
    }
  };

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(isMobileDevice());
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Use extracted hook for keyboard inset
  const keyboardInset = useKeyboardInset(isOpen, isMobile);
  useEffect(() => setKeyboardHeight(keyboardInset), [keyboardInset]);

  // Mirror API loading state
  useEffect(() => setIsLoading(apiLoading), [apiLoading]);

  // Measure input height for proper message list padding
  useEffect(() => {
    const updateInputHeight = () => {
      // Prefer measuring the input container (ChatInput root) if present
      const container = document.querySelector('[data-chat-input-root]') as HTMLElement | null;
      if (container) {
        setInputHeight(container.offsetHeight);
        return;
      }

      if (inputRef.current) {
        // Fallback: measure textarea and include estimated container chrome
        const height = inputRef.current.offsetHeight;
        const containerHeight = height + 24; // small fallback padding
        setInputHeight(containerHeight);
      }
    };
    
    updateInputHeight();
    window.addEventListener('resize', updateInputHeight);
    return () => window.removeEventListener('resize', updateInputHeight);
  }, [inputValue, keyboardHeight, isMobile]);

  // orientation handling is inside the hook now

  // Prevent body scroll when chat is open (mobile only)
  useEffect(() => {
    if (!isOpen || !isMobile) return;
    
    const originalStyle = window.getComputedStyle(document.body).overflow;
    const originalPosition = window.getComputedStyle(document.body).position;
    const scrollY = window.scrollY;
    
    // Prevent scroll on mobile
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    
    return () => {
      // Restore scroll
      document.body.style.overflow = originalStyle;
      document.body.style.position = originalPosition;
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollY);
    };
  }, [isOpen, isMobile]);

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

  // Smart focus management
  const focusInput = (preventScroll = true) => {
    if (focusTimeoutRef.current) {
      clearTimeout(focusTimeoutRef.current);
    }
    
    focusTimeoutRef.current = setTimeout(() => {
      if (inputRef.current && isOpen) {
        // Special handling for iOS
        if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
          // Force focus and keyboard on iOS
          inputRef.current.focus();
          inputRef.current.click(); // Additional trigger for iOS keyboard
        } else {
          inputRef.current.focus({ preventScroll });
        }
      }
    }, isMobile ? 100 : 50);
  };

  // Initial focus when drawer opens
  useEffect(() => {
    if (!isOpen || !inputRef.current) return;
    
    const delay = isMobile ? 300 : 100;
    focusTimeoutRef.current = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus({ preventScroll: true });
      }
    }, delay);
    
    return () => {
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current);
      }
    };
  }, [isOpen, isMobile]);

  // Mobile-specific keyboard persistence
  useEffect(() => {
    if (!isOpen || !isMobile || !inputRef.current) return;
    
    const inputElement = inputRef.current;
    let blurTimeout: NodeJS.Timeout;
    let preventBlur = false;
    
    const handleTouchStart = () => {
      // Prevent blur when user is interacting with the input area
      preventBlur = true;
      setTimeout(() => { preventBlur = false; }, 300);
    };
    
    const handleFocus = () => {
      if (blurTimeout) clearTimeout(blurTimeout);
      // Force keyboard to appear on iOS
      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        inputElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    };
    
    const handleBlur = (e: FocusEvent) => {
      // Don't prevent blur if user is clicking outside the chat
      const relatedTarget = e.relatedTarget as Element;
      const isClickingInDrawer = drawerRef.current?.contains(relatedTarget);
      
      if (!preventBlur && isOpen && !relatedTarget && isClickingInDrawer !== false) {
        blurTimeout = setTimeout(() => {
          if (isOpen && inputRef.current && !preventBlur) {
            inputRef.current.focus();
          }
        }, 150);
      }
    };
    
    // Enhanced input event handling for iOS
    const handleInput = () => {
      // Ensure cursor visibility on iOS
      if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        inputElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    };
    
    inputElement.addEventListener('touchstart', handleTouchStart, { passive: true });
    inputElement.addEventListener('focus', handleFocus);
    inputElement.addEventListener('blur', handleBlur);
    inputElement.addEventListener('input', handleInput);
    
    return () => {
      inputElement.removeEventListener('touchstart', handleTouchStart);
      inputElement.removeEventListener('focus', handleFocus);
      inputElement.removeEventListener('blur', handleBlur);
      inputElement.removeEventListener('input', handleInput);
      if (blurTimeout) clearTimeout(blurTimeout);
    };
  }, [isOpen, isMobile]);

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

    // Clear any previous errors
    setError(null);
    
    // Cancel any previous request
    abort();
    
    // Check if offline
    if (!navigator.onLine) {
      setError({
        type: 'offline',
        message: 'You appear to be offline. Please check your connection.',
        retryable: true
      });
      return;
    }

    const userMessage: Message = {
      id: generateId(),
      content: inputValue.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Reset textarea height when input is cleared
    resetTextareaHeight();
    
    setIsLoading(true);

  // We'll use sendMessage from the hook which handles abort & timeout

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

      const data = await sendMessage(payload);
      const content = parseAssistantMessage(data as ChatResponsePayload | string);

      const aiResponse: Message = {
        id: generateId(),
        content,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);
      
      // Announce new message to screen readers
      if (liveRegionRef.current) {
        liveRegionRef.current.textContent = `New message: ${content.slice(0, 120)}`;
      }
      
    } catch (err: any) {
      if (err?.type === 'timeout') {
        setError({ type: 'timeout', message: 'The request took too long. Please try again.', retryable: true });
        return;
      }

      if (err?.type === 'offline') {
        setError({ type: 'offline', message: 'You appear to be offline. Please check your connection.', retryable: true });
        return;
      }

      const errorType: ChatError['type'] = err?.type || 'server';
      setError({ type: errorType, message: "I'm having trouble connecting to Jose's AI assistant at the moment. Please try again shortly.", retryable: true });

      const errorResponse: Message = { id: generateId(), content: "I'm having trouble connecting right now. Please try again shortly.", isUser: false, timestamp: new Date() };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      // Response processing complete - no automatic focus restoration
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (isComposing) return; // Don't send during IME composition
    
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target;
    setInputValue(target.value);
    
    // Auto-resize textarea
    target.style.height = 'auto';
    target.style.height = `${Math.min(target.scrollHeight, 6 * 24 + 24)}px`;
    
    // Update input height for proper message list spacing
    setTimeout(() => {
      if (inputRef.current) {
        const height = inputRef.current.offsetHeight;
        const containerHeight = height + (isMobile ? 24 : 32) + 16;
        setInputHeight(containerHeight);
      }
    }, 0);
  };

  const toggleChat = () => {
    if (isOpen) {
      setIsOpen(false);
      // Return focus to FAB after closing
      setTimeout(() => fabRef.current?.focus(), 100);
    } else {
      setIsOpen(true);
    }
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

  // Enhanced focus trap for better accessibility
  useEffect(() => {
    if (!isOpen) return;

    const drawer = drawerRef.current;
    if (!drawer) return;

    const focusableElements = drawer.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      // On mobile, prefer keeping focus on input for better UX
      if (isMobile && inputRef.current && !isLoading) {
        e.preventDefault();
        inputRef.current.focus({ preventScroll: true });
        return;
      }

      // Desktop tab navigation
      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement?.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isOpen, isMobile, isLoading]);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (focusTimeoutRef.current) {
        clearTimeout(focusTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Floating Action Button */}
      <button
        ref={fabRef}
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 bg-tuxedo-black hover:bg-primary-800 text-tuxedo-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        aria-label="Open chat with AI Butler"
        aria-expanded={isOpen}
        aria-controls="chat-drawer"
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
        id="chat-drawer"
        data-chat-drawer
        className={`fixed top-0 right-0 w-full max-w-md bg-tuxedo-white dark:bg-tuxedo-midnight shadow-2xl transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ bottom: 0 }}
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
        <MessageList 
          messages={messages} 
          isLoading={isLoading} 
          messagesEndRef={messagesEndRef}
          inputHeight={inputHeight}
          keyboardHeight={keyboardHeight}
          isMobile={isMobile}
        />

        {/* Input */}
        <ChatInput
          inputRef={inputRef}
          inputValue={inputValue}
          isLoading={isLoading}
          isMobile={isMobile}
          keyboardHeight={keyboardHeight}
          inputHeight={inputHeight}
          error={error}
          setError={setError}
          setInputValue={setInputValue}
          handleInputChange={handleInputChange}
          handleKeyDown={handleKeyDown}
          handleSendMessage={handleSendMessage}
          setIsComposing={setIsComposing}
        />
      </div>
    </>
  );
}
