import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { FavoritesProvider } from './context/FavoritesContext';
import { AuthProvider } from './context/AuthContext';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
 <AuthProvider>
  <FavoritesProvider>

    <App />
  </FavoritesProvider>
  </AuthProvider>
  </BrowserRouter>
);