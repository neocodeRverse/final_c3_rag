/**
 * Centralized API Service
 * All API calls should be made through this service
 * Update the BASE_URL to point to your actual backend
 */

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * Generic fetch wrapper with error handling
 */
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${BASE_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    // Handle non-200 responses
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: response.statusText,
      }));
      return {
        success: false,
        error: errorData.error || `HTTP ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('API Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Send query to RAG system
 * @param question - User's question/query
 * @returns Response from the RAG system
 */
export async function sendQuery(question: string): Promise<ApiResponse<{ answer: string }>> {
  return apiCall('/query', {
    method: 'POST',
    body: JSON.stringify({ question }),
  });
}

/**
 * Upload document to knowledge base
 * @param file - PDF or DOCX file to upload
 * @returns Upload status and response
 */
export async function uploadDocument(file: File): Promise<ApiResponse<{ message: string; documentId?: string }>> {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header for FormData - browser will set it automatically
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: response.statusText,
      }));
      return {
        success: false,
        error: errorData.error || `HTTP ${response.status}`,
      };
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error('Upload Error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
}

/**
 * Test API connectivity
 */
export async function testConnection(): Promise<boolean> {
  try {
    const response = await fetch(`${BASE_URL}/health`, {
      method: 'GET',
    });
    return response.ok;
  } catch {
    return false;
  }
}
