// import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import '@/translate/i18n';
//Import Mixpanel SDK
import mixpanel from 'mixpanel-browser';

// Near entry of your product, init Mixpanel
mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN, {
  debug: import.meta.env.DEV,
  track_pageview: true,
  persistence: 'localStorage',
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);
