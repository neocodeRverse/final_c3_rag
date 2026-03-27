# RAG System Frontend

A modern, production-ready React frontend for Retrieval-Augmented Generation (RAG) systems with authentication, document upload, and query capabilities.

## 🎯 Features

### Core Functionality
- **Query Interface**: Clean chat-like interface to query the RAG system
- **Document Upload**: Upload PDF and DOCX files to update the knowledge base
- **Authentication**: Frontend-based login system with default credentials
- **Real-time Responses**: Display RAG responses in formatted cards with loading states

### UI/UX Design
- **Modern Design**: Glassmorphism effects with soft shadows and smooth transitions
- **Dark Mode**: Premium dark theme optimized for extended use
- **Responsive Layout**: Fully responsive on mobile and desktop
- **Smooth Animations**: Loading spinners and fade-in effects
- **Toast Notifications**: Real-time feedback for user actions

### Security & Validation
- **File Type Validation**: Only PDF and DOCX files accepted
- **File Size Limit**: Maximum 25MB per file
- **Input Validation**: Question length validation (minimum 3 characters)
- **Error Handling**: Comprehensive error messages for all operations

## 📁 Project Structure

```
src/
├── components/
│   ├── Loader.tsx              # Loading spinner animation
│   ├── Navbar.tsx              # Navigation bar with logout
│   └── ResponseCard.tsx         # Response display component
├── pages/
│   ├── LoginPage.tsx           # Authentication page
│   ├── QueryPage.tsx           # RAG query interface
│   └── UploadPage.tsx          # Document upload interface
├── services/
│   └── api.ts                  # Centralized API service
├── context/
│   └── AuthContext.tsx         # Authentication context
├── App.tsx                     # Main app component
├── App.css                     # Global styles
├── main.tsx                    # React entry point
└── index.css                   # Tailwind CSS directives
```

## 🔐 Authentication

### Default Credentials
- **Username**: `Admin123`
- **Password**: `Password@12345`

### Authentication Flow
1. User logs in on the login page
2. Credentials are validated on the frontend
3. Authentication state is stored in `localStorage`
4. User is redirected to the Query page
5. Upload page is only accessible after login

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies**:
```bash
npm install
```

2. **Configure API Endpoint** (Optional):
   Create a `.env` file in the root directory:
   ```
   VITE_API_URL=http://localhost:8000/api
   ```
   Or set the environment variable before running:
   ```bash
   export REACT_APP_API_URL=http://localhost:8000/api
   ```

3. **Start development server**:
```bash
npm run dev
```

The application will start at `http://localhost:5173/`

## 📦 Build for Production

```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🔌 API Integration

All API calls are centralized in `src/services/api.ts`:

### Available Functions

#### `sendQuery(question: string)`
Sends a question to the RAG system.

```typescript
const result = await sendQuery('What is RAG?');
if (result.success) {
  console.log(result.data?.answer);
} else {
  console.error(result.error);
}
```

#### `uploadDocument(file: File)`
Uploads a document to the knowledge base.

```typescript
const result = await uploadDocument(file);
if (result.success) {
  console.log('Upload successful');
} else {
  console.error(result.error);
}
```

### Configure Backend URL
Update the `BASE_URL` in `src/services/api.ts`:

```typescript
const BASE_URL = 'http://your-backend-url/api';
```

Or use environment variables:
```typescript
const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
```

## 📝 Component Details

### LoginPage
- Clean login form with validation
- Demonstrates default credentials
- Simple login flow with timeout simulation
- Error messages for invalid credentials

### QueryPage
- Single textarea for question input
- Send button with loading state
- Response card displaying RAG output
- Loading animation during processing
- Character counter and clear button
- Help section with feature highlights

### UploadPage
- Drag-and-drop file upload zone
- File validation (type and size)
- Upload progress indication
- Success/error status for each file
- File removal functionality
- Clear all button

### Navbar
- Logo with icon
- Query/Upload navigation
- Logout button
- Active page highlighting

## 🎨 UI Components

### Loader
Animated loading spinner with concentric rings.

### ResponseCard
Formatted card for displaying RAG responses with loading state.

### Toast Notifications
Real-time feedback for:
- Success messages
- Error alerts
- Loading states

## 🛠 Tech Stack

- **React 19.2** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Routing (built into app structure)
- **React Hot Toast** - Notification system
- **React Dropzone** - File upload handling
- **Lucide React** - Icon library

## 📋 Dependencies

```json
{
  "dependencies": {
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "react-router-dom": "latest",
    "react-hot-toast": "latest",
    "react-dropzone": "latest",
    "lucide-react": "latest"
  },
  "devDependencies": {
    "tailwindcss": "^3.x",
    "postcss": "latest",
    "autoprefixer": "latest",
    "typescript": "~5.9.3",
    "vite": "^8.0.1"
  }
}
```

## 🔍 File Validation

### Supported File Types
- **PDF**: `application/pdf`
- **DOCX**: `application/vnd.openxmlformats-officedocument.wordprocessingml.document`

### File Constraints
- Maximum size: 25MB
- Maximum filename length: 255 characters

## 🎯 Key Features Implementation

### 1. Authentication Context
Uses React Context API for global authentication state management.

### 2. Centralized API Service
All backend calls go through `src/services/api.ts` with consistent error handling.

### 3. Form Validation
- Minimum question length: 3 characters
- File type checking (PDF/DOCX only)
- File size validation (≤25MB)
- Required field validation

### 4. State Management
Uses React hooks (`useState`, `useEffect`) with Context API for auth state.

### 5. Error Handling
- Try-catch blocks in API calls
- User-friendly error messages via toast
- Form validation errors
- File upload error tracking

## 📱 Responsive Design

- **Mobile**: Optimized for screens < 640px
- **Tablet**: Responsive layout for 640px - 1024px
- **Desktop**: Full-featured layout for screens > 1024px

## 🎨 Customization

### Change Theme Colors
Edit the Tailwind config in `tailwind.config.js`:

```typescript
theme: {
  extend: {
    colors: {
      // Add custom colors here
    }
  }
}
```

### Modify API Endpoints
Update `src/services/api.ts`:

```typescript
const BASE_URL = 'your-api-endpoint';

export async function sendQuery(question: string) {
  // Modify endpoint path if needed
  return apiCall('/custom-endpoint', {
    method: 'POST',
    body: JSON.stringify({ question }),
  });
}
```

### Update Default Credentials
In `src/context/AuthContext.tsx`:

```typescript
const VALID_USERNAME = 'your-username';
const VALID_PASSWORD = 'your-password';
```

## 🐛 Troubleshooting

### CORS Issues
If you encounter CORS errors when connecting to the backend:
1. Ensure backend has CORS enabled
2. Check the backend URL in `src/services/api.ts`
3. Verify both frontend and backend are running

### File Upload Not Working
1. Check file type (must be PDF or DOCX)
2. Verify file size is < 25MB
3. Check backend API endpoint is accessible
4. Look at browser console for error details

### Authentication Issues
1. Ensure you're using correct credentials: `Admin123` / `Password@12345`
2. Check localStorage for `rag_authenticated` key
3. Clear browser cache if authentication persists

## 📄 License

This project is provided as-is for educational and commercial use.

## 👨‍💻 Development Notes

- The app uses `localStorage` for authentication persistence
- All API calls are mocked in demonstration mode (update `api.ts` with real endpoints)
- Toast notifications appear in the top-right corner
- Loading animations provide visual feedback during operations
- Components are fully typed with TypeScript for better development experience

## 🚀 Deployment

### Build Optimization
```bash
npm run build
```

### Environment Setup for Production
Create `.env.production`:
```
REACT_APP_API_URL=https://your-production-api.com/api
```

### Deploy to Vercel
```bash
npm install -g vercel
vercel
```

---

**Built with ❤️ using React + TypeScript + Tailwind CSS**
```
