import { useRef, useState } from 'react';
import { CHAT_API_ENDPOINT, ChatRequestPayload, ChatResponsePayload } from '../../config/chat';

type SendResult = ChatResponsePayload | string;

export default function useChatApi() {
  const controllerRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const abort = () => {
    if (controllerRef.current) {
      controllerRef.current.abort();
      controllerRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsLoading(false);
  };

  const sendMessage = async (payload: ChatRequestPayload): Promise<SendResult> => {
    if (!navigator.onLine) {
      const err: any = new Error('offline');
      err.type = 'offline';
      throw err;
    }

    // Cancel previous
    abort();

    const controller = new AbortController();
    controllerRef.current = controller;
    setIsLoading(true);

    // Timeout in ms
    const TIMEOUT = 20000;
    timeoutRef.current = window.setTimeout(() => controller.abort(), TIMEOUT);

    try {
      const res = await fetch(CHAT_API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      if (!res.ok) {
        const err: any = new Error(`status:${res.status}`);
        err.type = 'server';
        throw err;
      }

      const data = (await res.json()) as ChatResponsePayload | string;
      return data;
    } catch (e: any) {
      if (e?.name === 'AbortError') {
        const err: any = new Error('timeout');
        err.type = 'timeout';
        throw err;
      }
      // preserve offline/server/network
      if (!e.type) e.type = 'network';
      throw e;
    } finally {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      controllerRef.current = null;
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading, abort } as const;
}
