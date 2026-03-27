import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster 
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#1F2937',
          color: '#F3F4F6',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
        },
        success: {
          iconTheme: {
            primary: '#10B981',
            secondary: '#1F2937',
          },
        },
        error: {
          iconTheme: {
            primary: '#EF4444',
            secondary: '#1F2937',
          },
        },
      }}
    />
  </StrictMode>,
)
