import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOHeadProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  schema?: Record<string, any>;
  keywords?: string;
  type?: 'website' | 'article' | 'book';
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  image = 'https://editoraverticeliterario.vercel.app/logo.png',
  url,
  schema,
  keywords,
  type = 'website'
}) => {
  const location = useLocation();
  const fullUrl = url || `https://editoraverticeliterario.vercel.app${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = `${title} | Editora Vértice Literário`;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    }

    // Update meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // Update og:title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);

    // Update og:description
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', description);

    // Update og:image
    let ogImage = document.querySelector('meta[property="og:image"]');
    if (!ogImage) {
      ogImage = document.createElement('meta');
      ogImage.setAttribute('property', 'og:image');
      document.head.appendChild(ogImage);
    }
    ogImage.setAttribute('content', image);

    // Update og:url
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', fullUrl);

    // Update canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', fullUrl);

    // Add schema markup if provided
    if (schema) {
      let schemaScript = document.querySelector('script[data-type="schema-markup"]');
      if (schemaScript) {
        schemaScript.remove();
      }
      const newSchemaScript = document.createElement('script');
      newSchemaScript.setAttribute('type', 'application/ld+json');
      newSchemaScript.setAttribute('data-type', 'schema-markup');
      newSchemaScript.textContent = JSON.stringify(schema);
      document.head.appendChild(newSchemaScript);
    }
  }, [title, description, image, fullUrl, schema, keywords]);

  return null; // This component doesn't render anything
};

export default SEOHead;
