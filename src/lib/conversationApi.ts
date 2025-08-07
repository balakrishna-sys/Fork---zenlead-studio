import { toast } from 'sonner';

// Types matching your backend
export interface ConversationRequest {
  message: string;
  category?: string;
}

export interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface ConversationSummary {
  uid: string;
  user_id: string;
  title?: string;
  category?: string;
  message_count: number;
  last_message?: string;
  created_at: string;
  updated_at: string;
}

export interface ConversationDetail {
  uid: string;
  user_id: string;
  title?: string;
  messages: ConversationMessage[];
  category?: string;
  created_at: string;
  updated_at: string;
}

export interface StreamingData {
  type: 'metadata' | 'content' | 'complete' | 'error';
  conversation_id?: string;
  category?: string;
  content?: string;
  title?: string;
  error?: string;
}

export class ConversationAPI {
  private baseURL: string;
  private token: string;

  constructor(baseURL: string, token: string) {
    this.baseURL = baseURL;
    this.token = token;
  }

  private getHeaders() {
    return {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Create a new conversation with streaming response
   */
  async createConversation(
    request: ConversationRequest,
    onStream: (data: StreamingData) => void
  ): Promise<string | null> {
    try {
      const response = await fetch(`${this.baseURL}/api/conversation/new`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        if (response.status === 422 && errorData?.detail) {
          const errorMessage = errorData.detail[0]?.msg || 'Validation error';
          throw new Error(errorMessage);
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return this.handleStreamingResponse(response, onStream);
    } catch (error) {
      console.error('Failed to create conversation:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create conversation');
      throw error;
    }
  }

  /**
   * Continue existing conversation with streaming response
   */
  async continueConversation(
    conversationId: string,
    request: ConversationRequest,
    onStream: (data: StreamingData) => void
  ): Promise<void> {
    try {
      const response = await fetch(`${this.baseURL}/api/conversation/${conversationId}/message`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        if (response.status === 422 && errorData?.detail) {
          const errorMessage = errorData.detail[0]?.msg || 'Validation error';
          throw new Error(errorMessage);
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      await this.handleStreamingResponse(response, onStream);
    } catch (error) {
      console.error('Failed to continue conversation:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to send message');
      throw error;
    }
  }

  /**
   * Handle streaming response from FastAPI
   */
  private async handleStreamingResponse(
    response: Response,
    onStream: (data: StreamingData) => void
  ): Promise<string | null> {
    const reader = response.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('Response body is not readable');
    }

    let conversationId: string | null = null;

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const jsonData = line.substring(6).trim();
              if (jsonData) {
                const data: StreamingData = JSON.parse(jsonData);
                
                // Track conversation ID
                if (data.type === 'metadata' && data.conversation_id) {
                  conversationId = data.conversation_id;
                }
                
                // Call the stream handler
                onStream(data);
                
                // Break on completion or error
                if (data.type === 'complete' || data.type === 'error') {
                  break;
                }
              }
            } catch (parseError) {
              console.error('Error parsing SSE data:', parseError, 'Line:', line);
            }
          }
        }
      }
    } finally {
      reader.releaseLock();
    }

    return conversationId;
  }

  /**
   * Get user's conversations with pagination
   */
  async getConversations(limit: number = 20, offset: number = 0): Promise<ConversationSummary[]> {
    try {
      const url = new URL(`${this.baseURL}/api/conversation/`);
      url.searchParams.append('limit', limit.toString());
      url.searchParams.append('offset', offset.toString());

      const response = await fetch(url.toString(), {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Handle different response formats
      if (data.success && data.data) {
        return data.data;
      } else if (Array.isArray(data)) {
        return data;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Failed to get conversations:', error);
      toast.error('Failed to load conversations');
      return [];
    }
  }

  /**
   * Get specific conversation details
   */
  async getConversation(conversationId: string): Promise<ConversationDetail | null> {
    try {
      const response = await fetch(`${this.baseURL}/api/conversation/${conversationId}`, {
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        if (response.status === 404) {
          toast.error('Conversation not found');
          return null;
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      // Handle different response formats
      if (data.success && data.data) {
        return data.data;
      } else if (data.uid) {
        return data;
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Failed to get conversation:', error);
      toast.error('Failed to load conversation');
      return null;
    }
  }

  /**
   * Delete a conversation
   */
  async deleteConversation(conversationId: string): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/api/conversation/${conversationId}`, {
        method: 'DELETE',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        if (response.status === 404) {
          toast.error('Conversation not found');
          return false;
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.success || response.status === 200) {
        toast.success('Conversation deleted successfully');
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Failed to delete conversation:', error);
      toast.error('Failed to delete conversation');
      return false;
    }
  }
}

/**
 * Create API instance helper
 */
export const createConversationAPI = (token: string): ConversationAPI => {
  const baseURL = import.meta.env.VITE_API_URL || 'https://api.zenlead.ai';
  return new ConversationAPI(baseURL, token);
};
