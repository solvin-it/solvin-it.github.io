const defaultBaseUrl = 'http://127.0.0.1:8000';

// Exported so the widget can easily update request targets when deploying.
export const CHAT_API_BASE_URL =
  import.meta.env.PUBLIC_CHAT_API_BASE_URL?.replace(/\/+$/, '') ?? defaultBaseUrl;

export const CHAT_API_ENDPOINT = `${CHAT_API_BASE_URL}/chat`;

export interface ChatRequestPayload {
  messages: Array<{
    role: string;
    content: string;
  }>;
  thread_id: string;
}

export interface ChatResponsePayload {
  output?: {
    messages?: string;
  };
  checkpoint_id?: string;
  num_messages?: number;
  response?: string;
  reply?: string;
  message?: string;
  answer?: string;
  content?: string;
  choices?: Array<{ message?: { content?: string } }>;
  [key: string]: unknown;
}
