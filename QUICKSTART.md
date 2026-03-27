# Quick Start Guide - RAG System Frontend

## 🚀 Get Running in 5 Minutes

### Prerequisites
- Node.js 16+ installed
- npm or yarn

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Configure Backend URL (Optional)
Create a `.env` file:
```
VITE_API_URL=http://localhost:8000/api
```

### Step 3: Start Development Server
```bash
npm run dev
```

Open http://localhost:5173/ in your browser.

## 🔐 Login

**Demo Credentials:**
- **Username**: `Admin123`
- **Password**: `Password@12345`

## 💡 What You Can Do

### 1. Query the RAG System
1. After login, you'll see the Query page
2. Enter a question in the textarea
3. Click "Send" button
4. Wait for the response
5. Clear to ask another question

### 2. Upload Documents
1. Click "Upload KB" in navbar
2. Drag and drop PDF/DOCX files OR click to select
3. Watch upload progress
4. See success/error status
5. Remove individual files or clear all

## 📋 Working with Files

**Accepted File Types:**
- PDF files (*.pdf)
- Word documents (*.docx)

**File Size Limit:** 25MB per file

**What happens after upload:**
- Files are sent to backend
- Backend indexes them
- They become part of the knowledge base
- You can query them immediately

## 🔧 Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🎯 API Configuration

The app connects to your backend API at: **`http://localhost:8000/api`**

To change this:
1. Create `.env` file
2. Add: `VITE_API_URL=http://your-api:port/api`
3. Restart dev server

### Expected API Responses

**Query endpoint (`POST /query`):**
```json
Request: { "question": "What is this?" }
Response: { "answer": "This is..." }
```

**Upload endpoint (`POST /upload`):**
```
Request: FormData with file field
Response: { "message": "success", "documentId": "123" }
```

## 🐛 Common Issues

### Server won't start
```bash
# Check if port 5173 is in use
lsof -ti:5173 | xargs kill -9
npm run dev
```

### API connection fails
1. Check backend is running
2. Verify API URL in `.env`
3. Look at browser console (F12) for CORS errors
4. Test with curl: `curl http://localhost:8000/api/health`

### Build errors
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Authentication not working
- Username must be: `Admin123` (case-sensitive)
- Password must be: `Password@12345` (case-sensitive)
- Clear browser cache if stuck on login

## 📱 Test on Mobile

Run with network access:
```bash
npm run dev -- --host
```

Then visit: `http://your-ip:5173` from mobile

## 📦 Production Deployment

### Build optimized version
```bash
npm run build
```

This creates a `dist/` folder with:
- `index.html` - Main HTML file
- `assets/` - Optimized CSS and JS

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Deploy to Netlify
1. Push code to GitHub
2. Connect repo to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### Deploy to Your Server
```bash
# Build
npm run build

# Copy dist/ to your web server
# Point web server to dist/index.html for all routes
```

## 🎨 Customize

### Change Colors
Edit `tailwind.config.js`:
```js
theme: {
  extend: {
    colors: {
      primary: '#your-color',
    }
  }
}
```

### Update Credentials
Edit `src/context/AuthContext.tsx`:
```typescript
const VALID_USERNAME = 'your-username';
const VALID_PASSWORD = 'your-password';
```

### Change API Endpoints
Edit `src/services/api.ts`:
```typescript
const BASE_URL = 'your-api-url';
```

## 📚 Project Structure

```
rag-app/
├── src/
│   ├── components/      # UI components
│   ├── pages/         # Page components
│   ├── services/      # API client
│   ├── context/       # Auth state
│   ├── App.tsx        # Main app
│   └── main.tsx       # Entry point
├── public/            # Static files
├── dist/              # Build output
├── index.html         # HTML template
├── package.json       # Dependencies
├── vite.config.ts     # Vite config
└── tailwind.config.js # Tailwind config
```

## 🔗 Useful Links

- API Documentation: See [DEVELOPER_GUIDE.md](./DEVELOPER_GUIDE.md)
- Full README: See [README.md](./README.md)
- Tailwind Docs: https://tailwindcss.com
- React Docs: https://react.dev
- Vite Docs: https://vitejs.dev

## ✅ Checklist Before Going Live

- [ ] Change default credentials
- [ ] Update VITE_API_URL to production API
- [ ] Test all features (query and upload)
- [ ] Test on mobile devices
- [ ] Check console for errors (F12)
- [ ] Run `npm run build` with no warnings
- [ ] Set up environment variables in production
- [ ] Enable HTTPS in production
- [ ] Test CORS on production backend
- [ ] Set up monitoring/error tracking

## 📞 Need Help?

1. Check DEVELOPER_GUIDE.md for detailed info
2. Look at component comments in the code
3. Check browser console (F12) for errors
4. Test API manually with curl or Postman

---

**Next Steps:**
1. Start the dev server: `npm run dev`
2. Open http://localhost:5173
3. Log in with Admin123 / Password@12345
4. Start querying!
