// src/main.jsx (or src/index.jsx)

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // 👈 Import these

// 1. Create a client instance
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 2. Provide the client to your App */}
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)