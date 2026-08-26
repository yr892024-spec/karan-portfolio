import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Google Analytics (gtag.js) Injection Helper
const initializeGA = (measurementId) => {
  if (!measurementId || measurementId === 'G-XXXXXXXXXX') {
    console.log('[Analytics] Google Analytics ID is placeholder or unset. Tracking disabled.');
    return;
  }
  
  // Inject gtag.js script tag dynamically
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  // Initialize dataLayer global tracker
  window.dataLayer = window.dataLayer || [];
  window.gtag = function() { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', measurementId);
  
  console.log(`[Analytics] Google Analytics initialized successfully with ID: ${measurementId}`);
};

// Retrieve environment variable or fallback to placeholder
const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';
initializeGA(GA_ID);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
