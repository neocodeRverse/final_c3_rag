# API Integration Guide

## Overview

This document describes how to integrate the RAG System Frontend with your backend API.

## Base URL Configuration

The frontend expects your backend API at a configurable URL. By default, it's set to `http://localhost:8000/api`.

### Change the Base URL

**Option 1: Environment Variable (Recommended)**
Create a `.env` file:
```
VITE_API_URL=http://your-backend-url/api
```

**Option 2: Direct Modification**
Edit `src/services/api.ts`:
```typescript
const BASE_URL = 'http://your-backend-url/api';
```

**Option 3: Environment-Specific**
```
# .env (development)
VITE_API_URL=http://localhost:8000/api

# .env.production (production)
VITE_API_URL=https://api.production.com/api
```

## API Endpoints

### 1. Query Endpoint

**Method:** `POST`  
**Path:** `/query`  
**Base URL:** `{VITE_API_URL}/query`

#### Request
```json
{
  "question": "What is machine learning?"
}
```

#### Response (Success)
```json
{
  "answer": "Machine learning is a subset of artificial intelligence..."
}
```

#### Response (Error)
```json
{
  "error": "Invalid question format"
}
```

#### Frontend Code
```typescript
import { sendQuery } from './services/api';

const result = await sendQuery('What is machine learning?');
if (result.success) {
  console.log(result.data?.answer);
} else {
  console.error(result.error);
}
```

### 2. Upload Endpoint

**Method:** `POST`  
**Path:** `/upload`  
**Base URL:** `{VITE_API_URL}/upload`  
**Content-Type:** `multipart/form-data`

#### Request
```
FormData:
- file: File (PDF or DOCX)
```

#### Response (Success)
```json
{
  "message": "Document uploaded successfully",
  "documentId": "doc_1234567890"
}
```

#### Response (Error)
```json
{
  "error": "File size exceeds maximum limit"
}
```

#### Frontend Code
```typescript
import { uploadDocument } from './services/api';

const result = await uploadDocument(file);
if (result.success) {
  console.log('Upload successful:', result.data?.documentId);
} else {
  console.error(result.error);
}
```

### 3. Health Check Endpoint (Optional)

**Method:** `GET`  
**Path:** `/health`

Used internally to test connection:
```typescript
const isConnected = await testConnection();
```

## Request/Response Format

### all API Responses Follow This Format

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
```

## Error Handling

The frontend handles these error scenarios:

1. **Network Error**: Connection refused
   - Message: "Network error" or connection error message
   
2. **Server Error**: HTTP 500
   - Message: Server error response or "HTTP 500"
   
3. **Not Found**: HTTP 404
   - Message: "HTTP 404"
   
4. **Bad Request**: HTTP 400
   - Message: Error details from server or "HTTP 400"
   
5. **File Error**: Invalid file
   - Message: File validation error

## CORS Requirements

Your backend must implement CORS to allow requests from the frontend:

### NodeJS/Express Example
```javascript
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
```

### Python/Flask Example
```python
from flask_cors import CORS
cors = CORS(app, origins=['http://localhost:5173'])
```

### FastAPI Example
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=['http://localhost:5173'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)
```

## File Upload Details

### Supported File Types
- **PDF** (`application/pdf`)
- **DOCX** (`application/vnd.openxmlformats-officedocument.wordprocessingml.document`)

### File Constraints
- **Maximum Size**: 25MB (enforced by frontend)
- **Maximum Filename**: 255 characters
- **Allowed Extensions**: .pdf, .docx

### Upload Process
1. Frontend validates file type and size
2. File is sent as FormData with key `file`
3. Backend processes the document
4. Backend returns status with documentId
5. Frontend shows success/error message

## Testing the API

### Using cURL

**Test Query Endpoint:**
```bash
curl -X POST http://localhost:8000/api/query \
  -H "Content-Type: application/json" \
  -d '{"question": "What is RAG?"}'
```

**Test Upload Endpoint:**
```bash
curl -X POST http://localhost:8000/api/upload \
  -F "file=@document.pdf"
```

**Test Health Check:**
```bash
curl http://localhost:8000/api/health
```

### Using Postman

1. Create new POST request
2. Set URL: `http://localhost:8000/api/query`
3. Go to Body tab
4. Select "raw" and "JSON"
5. Enter: `{"question": "Your question here"}`
6. Click Send

## Response Handling Examples

### Success Response
```typescript
const result = await sendQuery('What is AI?');
if (result.success && result.data) {
  console.log('Answer:', result.data.answer);
  // Display to user
} else {
  // Handle error with result.error
}
```

### Error Response
```typescript
const result = await uploadDocument(file);
if (!result.success) {
  // result.error contains the error message
  console.error('Upload failed:', result.error);
  // Show error toast to user
}
```

## Authentication

**Note**: The frontend currently doesn't use backend authentication. The login is frontend-only.

For production with backend authentication:

1. Add authentication endpoint
2. Modify `src/services/api.ts` to include auth headers
3. Store JWT token after login
4. Add token to all subsequent requests

Example with JWT:
```typescript
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('authToken');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };
  
  // Make request with headers
};
```

## Rate Limiting

If your backend implements rate limiting:
- The frontend will receive a relevant HTTP status (429)
- Implement retry logic or show rate limit message:

```typescript
const result = await sendQuery(question);
if (result.error?.includes('429')) {
  toast.error('Too many requests. Please wait a moment.');
}
```

## Timeout Configuration

Default timeout is handled by browser's fetch API (usually 30-60 seconds).

To add custom timeout:
```typescript
// In src/services/api.ts
async function apiCall(endpoint, options = {}, timeout = 30000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timer);
    // Handle response
  } catch (error) {
    if (error.name === 'AbortError') {
      return { success: false, error: 'Request timeout' };
    }
  }
}
```

## Logging

All API calls are logged to browser console:
```typescript
console.error('API Error:', error);
```

For production debugging:
1. Implement error tracking (e.g., Sentry)
2. Log all errors to your monitoring service
3. Review logs for debugging

## Performance Considerations

### Query Caching
Consider caching recent queries to avoid redundant requests:
```typescript
const [cache, setCache] = useState<Map<string, string>>(new Map());

const sendQueryWithCache = async (question: string) => {
  if (cache.has(question)) {
    return { success: true, data: { answer: cache.get(question) } };
  }
  
  const result = await sendQuery(question);
  if (result.success && result.data) {
    setCache(prev => new Map(prev).set(question, result.data.answer));
  }
  return result;
};
```

### Request Debouncing
Avoid excessive requests while user is typing:
```typescript
import { useEffect, useRef } from 'react';

const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

const debouncedQuery = useRef(
  debounce((q) => sendQuery(q), 500)
);
```

## Versioning

API version in base URL (recommended):
```
VITE_API_URL=http://localhost:8000/api/v1
```

## Migration Guide

### Updating Backend URL
1. Stop dev server: `Ctrl+C`
2. Update `.env` file with new URL
3. Restart: `npm run dev`

### Changing API Structure
If backend API structure changes:

1. Update endpoint path in `src/services/api.ts`
2. Update request/response types
3. Update component code that calls API
4. Test thoroughly

Example:
```typescript
// Old
export async function sendQuery(question: string) {
  return apiCall('/query', { ...});
}

// New
export async function sendQuery(question: string) {
  return apiCall('/v2/rag/query', { ...});
}
```

## Troubleshooting

### 1. CORS Error
```
Access to XMLHttpRequest at 'http://localhost:8000/api/query' 
from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solution**: Enable CORS on your backend.

### 2. 404 Not Found
```
POST http://localhost:8000/api/query 404 (Not Found)
```

**Solution**: 
- Verify endpoint path
- Check backend is running
- Check base URL in `.env`

### 3. Connection Refused
```
Failed to fetch: Connection refused
```

**Solution**:
- Start backend server
- Verify base URL is correct
- Check firewall settings

### 4. Timeout
No response after 30+ seconds

**Solution**:
- Backend might be slow
- Check network connection
- Verify API is processing request
- Add longer timeout

### 5. File Upload Failed
```
Failed to upload: 413 Payload Too Large
```

**Solution**:
- File exceeds 25MB limit
- Check backend file size limits
- Increase server timeout

## Support

For API integration issues:
1. Check this guide
2. Review DEVELOPER_GUIDE.md
3. Test with cURL/Postman
4. Check browser console (F12)
5. Check backend logs

---

**Last Updated**: March 27, 2026
**Version**: 1.0.0
