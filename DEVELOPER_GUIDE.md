# RAG System Frontend - Developer Guide

## Project Overview

This is a production-ready React frontend for a Retrieval-Augmented Generation (RAG) system. It provides a modern, user-friendly interface for querying documents and managing a knowledge base.

## Architecture

### Technology Stack
- **Framework**: React 19.2 with TypeScript
- **Build Tool**: Vite (Lightning-fast build)
- **Styling**: Tailwind CSS 3
- **State Management**: React Hooks + Context API
- **UI Components**: Custom components + Lucide Icons
- **Notifications**: React Hot Toast
- **File Upload**: React Dropzone

### Folder Structure

```
src/
├── components/          # Reusable UI components
│   ├── Loader.tsx      # Loading spinner
│   ├── Navbar.tsx      # Navigation bar
│   └── ResponseCard.tsx # Response display
├── pages/              # Page components
│   ├── LoginPage.tsx   # Authentication
│   ├── QueryPage.tsx   # Main query interface
│   └── UploadPage.tsx  # Document upload
├── services/           # API and business logic
│   └── api.ts         # Centralized API client
├── context/           # React context
│   └── AuthContext.tsx # Auth state management
├── App.tsx            # Main app component
├── App.css            # Global styles
├── main.tsx           # React entry point
└── index.css          # Tailwind directives
```

## Key Components

### 1. **AuthContext** (`src/context/AuthContext.tsx`)
Manages authentication state globally using React Context.

**Features**:
- `isAuthenticated`: Boolean flag for auth state
- `login(username, password)`: Validates credentials and updates state
- `logout()`: Clears auth state
- localStorage persistence

**Default Credentials**:
- Username: `Admin123`
- Password: `Password@12345`

### 2. **API Service** (`src/services/api.ts`)
Centralized API client for all backend communication.

**Key Functions**:
- `sendQuery(question)`: Submit questions to RAG system
- `uploadDocument(file)`: Upload PDF/DOCX files
- `testConnection()`: Check API connectivity

**Error Handling**: All requests include try-catch blocks and return consistent response format.

### 3. **Pages**

#### LoginPage.tsx
- Simple login form with validation
- Shows default credentials
- Redirects to Query page on successful login
- Toast notifications for feedback

#### QueryPage.tsx
- Single textarea for questions
- Response display with loading animation
- Help section with feature highlights
- Character counter and clear button
- Responsive design for mobile/tablet

#### UploadPage.tsx
- Drag-and-drop zone for file upload
- File type/size validation
- Progress indicators
- Success/error status display
- File removal functionality

### 4. **Components**

#### Loader.tsx
Animated loading spinner with CSS animations.

#### Navbar.tsx
Navigation bar with:
- Logo and branding
- Query/Upload page links
- Logout button
- Active page highlighting

#### ResponseCard.tsx
Displays RAG responses with:
- Glassmorphism design
- Formatted text display
- Loading animation support

## State Management

### Authentication State
```typescript
const { isAuthenticated, login, logout } = useAuth();
```

### Page Navigation
```typescript
const [currentPage, setCurrentPage] = useState<'query' | 'upload'>('query');
```

### Query Page State
```typescript
const [question, setQuestion] = useState('');
const [response, setResponse] = useState('');
const [loading, setLoading] = useState(false);
```

### Upload Page State
```typescript
interface UploadedFile {
  name: string;
  size: number;
  status: 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
}
const [files, setFiles] = useState<UploadedFile[]>([]);
```

## API Integration

### Base URL Configuration
Update in `src/services/api.ts`:
```typescript
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
```

Or set environment variable:
```bash
VITE_API_URL=http://your-api.com/api
```

### Expected API Endpoints

#### POST `/query`
```json
Request:
{
  "question": "What is RAG?"
}

Response:
{
  "answer": "RAG (Retrieval-Augmented Generation) is..."
}
```

#### POST `/upload`
```
Request: FormData with file
Response:
{
  "message": "File uploaded successfully",
  "documentId": "doc_123"
}
```

## Validation Rules

### File Upload Validation
- **Accepted Types**: PDF, DOCX
- **Max Size**: 25MB
- **Max Filename**: 255 characters

### Question Validation
- **Min Length**: 3 characters
- **Required**: Yes

### Authentication
- **Username**: Exact match with `Admin123`
- **Password**: Exact match with `Password@12345`

## Styling & Design

### Theme
- **Mode**: Dark mode with gradient backgrounds
- **Color Palette**: 
  - Primary: Purple (#A855F7) to Blue (#3B82F6)
  - Background: Slate gradient
  - Text: Light gray (#E5E7EB)

### CSS Framework
Tailwind CSS with custom animations:
- `animate-fadeIn`: Fade in animation
- `animate-spin`: Rotation animation
- `animate-pulse`: Pulsing animation
- `backdrop-blur-md`: Glassmorphism effect

### Responsive Breakpoints
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## Development Workflow

### Add New Component
1. Create file in `src/components/CompName.tsx`
2. Export React functional component
3. Import and use in pages
4. Add TypeScript interfaces for props

### Add API Endpoint
1. Create function in `src/services/api.ts`
2. Use generic `apiCall()` wrapper
3. Return `ApiResponse<T>` type
4. Call from components using async/await

### Fix Styling Issues
1. Use Tailwind classes first
2. Add global styles to `App.css` if needed
3. Avoid inline styles
4. Test responsive design at all breakpoints

## Error Handling

### API Errors
```typescript
const result = await sendQuery(question);
if (!result.success) {
  toast.error(result.error);
}
```

### Form Validation
```typescript
if (!question.trim()) {
  toast.error('Question is required');
  return;
}
```

### File Upload Errors
- Invalid file type
- File too large
- Network failure
- Server error

All display as toast notifications.

## Performance Optimization

### Bundle Size
- Vite tree-shaking removes unused code
- CSS is minified by Tailwind
- JavaScript is compressed in production

### Lazy Loading
Components are imported directly (no code splitting needed for this size).

### Image Optimization
Only SVG icons used (Lucide React) - no large images.

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile browsers supporting ES6

## Security Considerations

### Frontend Authentication
- ⚠️ Credentials are hardcoded (for demo only)
- Use backend authentication in production
- Add HTTPS in production
- Use secure tokens (JWT) for real apps

### File Upload
- Validate file type on frontend AND backend
- Scan files for malware in production
- Use signed URLs for file storage
- Implement file size limits on server

### API Communication
- Use HTTPS in production
- Implement CORS properly on backend
- Validate all user input
- Sanitize displayed content

## Troubleshooting

### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Dev Server Issues
```bash
# Kill existing process on port 5173
lsof -ti:5173 | xargs kill -9
npm run dev
```

### TypeScript Errors
- Check that all imports are correct
- Verify type definitions are installed
- Use `as any` only as last resort
- Run `npm run build` to see all errors

### API Connection Issues
1. Verify backend is running
2. Check BASE_URL in api.ts
3. Check browser console for CORS errors
4. Test with curl: `curl http://localhost:8000/api/health`

## Production Deployment

### Build for Production
```bash
npm run build
# Creates optimized dist/ folder
```

### Environment Setup
Create `.env.production`:
```
VITE_API_URL=https://production-api.com/api
```

### Deploy Options
- **Vercel**: Push to GitHub, auto-deploy
- **Netlify**: Similar to Vercel
- **AWS S3 + CloudFront**: Manual S3 upload
- **Docker**: Create Dockerfile with Node/Nginx

### Pre-deployment Checklist
- [ ] Update VITE_API_URL to production endpoint
- [ ] Run full test of functionality
- [ ] Check console for warnings/errors
- [ ] Test on mobile devices
- [ ] Verify all images/fonts load
- [ ] Check bundle size (`npm run build` shows sizes)
- [ ] Test error scenarios

## Contributing Guidelines

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes following existing code style
3. Test thoroughly
4. Submit pull request with clear description
5. Request code review

### Code Style
- Use TypeScript consistently
- Component names in PascalCase
- Hook names starting with `use`
- Variables in camelCase
- Constants in UPPER_SNAKE_CASE
- Comments for complex logic

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vitejs.dev/guide)
- [React Hot Toast](https://react-hot-toast.com)
- [React Dropzone](https://react-dropzone.js.org)
- [Lucide Icons](https://lucide.dev)

## Support

For issues or questions:
1. Check this document first
2. Review component code comments
3. Check browser console for errors
4. Create an issue with detailed description

---

**Last Updated**: March 27, 2026
**Version**: 1.0.0
