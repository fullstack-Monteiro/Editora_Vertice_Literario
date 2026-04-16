import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import AuthorsPage from './pages/AuthorsPage.tsx';
import CatalogPage from './pages/CatalogPage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import { ErrorBoundary } from './ErrorBoundary.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/autores" element={<AuthorsPage />} />
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/sobre" element={<AboutPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
