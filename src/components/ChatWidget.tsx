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
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const focusTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const userAgent = navigator.userAgent;
      const isMobileDevice = /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      setIsMobile(isMobileDevice || (isTouchDevice && window.innerWidth < 768));
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Enhanced mobile keyboard detection with better viewport handling
  useEffect(() => {
    if (!isOpen) return;

    let initialViewportHeight = window.innerHeight;
    let initialVisualViewportHeight = window.visualViewport?.height || window.innerHeight;
    
    const updateKeyboardHeight = () => {
      const currentViewportHeight = window.innerHeight;
      const currentVisualHeight = window.visualViewport?.height || currentViewportHeight;
      
      // Use the most reliable method based on device
      let keyboardOffset = 0;
      
      if (window.visualViewport) {
        // Use Visual Viewport API when available (modern browsers)
        keyboardOffset = initialVisualViewportHeight - currentVisualHeight;
      } else {
        // Fallback for older browsers
        keyboardOffset = initialViewportHeight - currentViewportHeight;
      }
      
      // Only consider it a keyboard if the change is significant
      const newKeyboardHeight = keyboardOffset > 150 ? keyboardOffset : 0;
      
      console.log('Keyboard height update:', { 
        initialViewportHeight, 
        currentViewportHeight, 
        initialVisualViewportHeight, 
        currentVisualHeight, 
        keyboardOffset, 
        newKeyboardHeight 
      });
      
      setKeyboardHeight(newKeyboardHeight);
    };

    // Listen for both viewport and visual viewport changes
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', updateKeyboardHeight);
    }
    window.addEventListener('resize', updateKeyboardHeight);
    
    // Also listen for orientationchange
    window.addEventListener('orientationchange', () => {
      setTimeout(() => {
        initialViewportHeight = window.innerHeight;
        initialVisualViewportHeight = window.visualViewport?.height || window.innerHeight;
        updateKeyboardHeight();
      }, 500);
    });

    return () => {
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', updateKeyboardHeight);
      }
      window.removeEventListener('resize', updateKeyboardHeight);
    };
  }, [isOpen]);

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

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Immediate focus restoration after clearing input
    focusInput();

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
    } finally {
      setIsLoading(false);
      
      // Final focus restoration after response
      setTimeout(() => {
        focusInput();
      }, isMobile ? 200 : 50);
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
          height: isMobile 
            ? (keyboardHeight > 0 
                ? `${Math.max(window.innerHeight - keyboardHeight, 400)}px`
                : '100vh')
            : '100vh',
          maxHeight: isMobile 
            ? (keyboardHeight > 0 
                ? `${Math.max(window.innerHeight - keyboardHeight, 400)}px`
                : '100vh')
            : '100vh',
          // Ensure drawer is positioned correctly
          bottom: isMobile && keyboardHeight > 0 ? `${keyboardHeight}px` : '0'
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
        <div 
          className="flex-1 overflow-y-auto p-4 space-y-4" 
          style={{ 
            scrollBehavior: 'smooth',
            // Calculate available space: total height - header (72px) - input area (estimated 120px)
            minHeight: isMobile 
              ? `${Math.max((keyboardHeight > 0 ? window.innerHeight - keyboardHeight : window.innerHeight) - 192, 200)}px`
              : 'calc(100vh - 192px)',
            maxHeight: isMobile 
              ? `${Math.max((keyboardHeight > 0 ? window.innerHeight - keyboardHeight : window.innerHeight) - 192, 200)}px`
              : 'calc(100vh - 192px)'
          }}
        >
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

        {/* Input - Fixed at bottom with enhanced visibility */}
        <div 
          className={`flex-shrink-0 border-t border-primary-200 dark:border-primary-800 bg-tuxedo-white dark:bg-tuxedo-midnight ${
            isMobile ? 'p-3' : 'p-4'
          }`}
          style={{
            // Ensure input area is always visible and properly positioned
            position: 'sticky',
            bottom: 0,
            zIndex: 10,
            // Add extra padding for mobile keyboards and safe areas
            paddingBottom: isMobile 
              ? `calc(1rem + ${keyboardHeight > 0 ? '0px' : 'env(safe-area-inset-bottom, 20px)'})`
              : '1rem',
            // Ensure minimum height for touch targets
            minHeight: isMobile ? '100px' : '80px',
            // Add visual separation
            boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
          }}
        >
          <div className="flex space-x-2 items-end">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={isLoading ? "AI is thinking..." : "Ask about Jose's experience..."}
              className={`flex-1 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-tuxedo-white dark:bg-tuxedo-midnight text-tuxedo-black dark:text-tuxedo-pearl transition-all duration-200 ${
                isLoading 
                  ? 'border-primary-400 dark:border-primary-500 bg-gray-50 dark:bg-gray-800' 
                  : 'border-primary-300 dark:border-primary-600'
              } ${
                isMobile ? 'py-4 text-base min-h-[52px]' : 'py-3 text-sm'
              }`}
              disabled={isLoading}
              autoComplete="off"
              autoCapitalize="sentences"
              autoCorrect="on"
              spellCheck="true"
              inputMode="text"
              enterKeyHint="send"
              // iOS specific attributes
              style={{
                fontSize: isMobile ? '16px' : undefined,
                WebkitAppearance: 'none',
                appearance: 'none',
                // Ensure input stays above keyboard
                transform: 'translateZ(0)',
                willChange: 'transform'
              }}
            />
            <button
              onClick={() => void handleSendMessage()}
              disabled={!inputValue.trim() || isLoading}
              className={`rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed flex-shrink-0 ${
                isMobile ? 'px-4 py-4 min-w-[52px] min-h-[52px]' : 'px-4 py-3'
              } ${
                isLoading
                  ? 'bg-primary-400 text-white'
                  : !inputValue.trim()
                  ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                  : 'bg-tuxedo-black hover:bg-primary-800 text-tuxedo-white shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95'
              }`}
              aria-label={isLoading ? "Sending message..." : "Send message"}
              style={{ transform: 'translateZ(0)' }}
            >
              {isLoading ? (
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              )}
            </button>
          </div>
          {isMobile && (
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
              {keyboardHeight > 0 
                ? "Keyboard active - ready to type!" 
                : isLoading 
                ? "Processing your question..." 
                : "Tap the input field to start chatting"}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
