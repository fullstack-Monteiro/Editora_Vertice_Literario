import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.tsx';
import AuthorsPage from './pages/AuthorsPage.tsx';
import AuthorDetailPage from './pages/AuthorDetailPage.tsx';
import CatalogPage from './pages/CatalogPage.tsx';
import BookDetailPage from './pages/BookDetailPage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import BlogPage from './pages/BlogPage.tsx';
import PostDetailPage from './pages/PostDetailPage.tsx';
import { ErrorBoundary } from './ErrorBoundary.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/autores" element={<AuthorsPage />} />
          <Route path="/autor/:id" element={<AuthorDetailPage />} />
          <Route path="/catalogo" element={<CatalogPage />} />
          <Route path="/livro/:id" element={<BookDetailPage />} />
          <Route path="/sobre" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<PostDetailPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
);
