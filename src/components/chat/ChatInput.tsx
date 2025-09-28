import React from 'react';

interface Props {
  inputRef: React.RefObject<HTMLTextAreaElement>;
  inputValue: string;
  isLoading: boolean;
  isMobile: boolean;
  keyboardHeight: number;
  inputHeight?: number;
  error: { message: string; retryable: boolean } | null;
  setError: (e: any) => void;
  setInputValue: (v: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleSendMessage: () => Promise<void> | void;
  setIsComposing: (v: boolean) => void;
}

export default function ChatInput({
  inputRef,
  inputValue,
  isLoading,
  isMobile,
  keyboardHeight,
  inputHeight = 72,
  error,
  setError,
  setInputValue,
  handleInputChange,
  handleKeyDown,
  handleSendMessage,
  setIsComposing,
}: Props) {
  // Mobile: fixed positioning to stick above keyboard
  // Desktop: sticky positioning within drawer
  const containerStyle = isMobile
    ? {
        position: 'fixed' as const,
        left: 0,
        right: 0,
        bottom: `calc(${keyboardHeight}px + env(safe-area-inset-bottom, 0px))`,
        zIndex: 60,
        padding: '0.75rem',
        boxShadow: '0 -6px 20px rgba(0,0,0,0.12)',
      }
    : {
        position: 'sticky' as const,
        bottom: 0,
        zIndex: 10,
        paddingBottom: '1rem',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)',
      };

  return (
    <div 
      data-chat-input-root
      className={`flex-shrink-0 border-t border-primary-200 dark:border-primary-800 bg-tuxedo-white dark:bg-tuxedo-midnight ${!isMobile ? 'p-4' : ''}`}
      style={containerStyle}
    >
      <div className="flex space-x-2 items-end">
        <textarea
          ref={inputRef}
          rows={1}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          placeholder={isLoading ? 'AI is thinking...' : "Ask about Jose's experience..."}
          className={`flex-1 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-tuxedo-white dark:bg-tuxedo-midnight text-tuxedo-black dark:text-tuxedo-pearl transition-all duration-200 resize-none ${isLoading ? 'border-primary-400 dark:border-primary-500 bg-gray-50 dark:bg-gray-800' : 'border-primary-300 dark:border-primary-600'} ${isMobile ? 'py-4 text-base min-h-[52px]' : 'py-3 text-sm'}`}
          disabled={isLoading}
          autoComplete="off"
          autoCapitalize="sentences"
          autoCorrect="on"
          spellCheck="true"
          aria-label="Type your message"
          aria-describedby={error ? 'chat-error' : undefined}
          style={{ fontSize: isMobile ? '16px' : undefined, WebkitAppearance: 'none', appearance: 'none', transform: 'translateZ(0)', willChange: 'transform', maxHeight: '144px' }}
        />
        <button
          onClick={() => void handleSendMessage()}
          disabled={!inputValue.trim() || isLoading}
          className={`rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:cursor-not-allowed flex-shrink-0 ${isMobile ? 'px-4 py-4 min-w-[52px] min-h-[52px]' : 'px-4 py-3'} ${isLoading ? 'bg-primary-400 text-white' : !inputValue.trim() ? 'bg-gray-300 dark:bg-gray-700 text-gray-500 dark:text-gray-400' : 'bg-tuxedo-black hover:bg-primary-800 text-tuxedo-white shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95'}`}
          aria-label={isLoading ? 'Sending message...' : 'Send message'}
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

      {error && (
        <div id="chat-error" className="mt-2 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg" role="alert">
          <p className="text-sm text-red-700 dark:text-red-400">{error.message}</p>
          {error.retryable && (
            <button onClick={() => { setError(null); void handleSendMessage(); }} className="mt-1 text-xs text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200 underline">Try again</button>
          )}
        </div>
      )}

      {isMobile && (
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-3 text-center">
          {error ? 'There was an issue. Please try again.' : keyboardHeight > 0 ? 'Enter to send' : isLoading ? 'Processing your question...' : 'Tap input field • Enter to send'}
        </div>
      )}
    </div>
  );
}
