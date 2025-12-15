import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './utils/AuthProvider'; // Import your AuthProvider

import TagManager from "react-gtm-module";
const root = ReactDOM.createRoot(document.getElementById('root'));
TagManager.initialize({ gtmId: "GTM-5FS6LH32" });
root.render(
  <React.StrictMode>
    <AuthProvider> {/* Wrap your app with AuthProvider */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
