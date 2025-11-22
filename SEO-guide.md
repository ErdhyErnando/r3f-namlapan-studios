# SEO Guide for Vite + React (Client-Side Rendered)

This guide will walk you through implementing SEO best practices for your Vite + React single-page application (SPA). Since SPAs are rendered on the client-side, we need to take extra steps to ensure search engines can crawl and index our content effectively.

## Table of Contents
1.  [Dynamic Meta Tags with `react-helmet-async`](#1-dynamic-meta-tags-with-react-helmet-async)
2.  [Adding a `sitemap.xml`](#2-adding-a-sitemapxml)
3.  [Adding a `robots.txt`](#3-adding-a-robotstxt)
4.  [Open Graph (OG) and Social Media Sharing](#4-open-graph-og-and-social-media-sharing)
5.  [Lighthouse and Performance Optimization](#5-lighthouse-and-performance-optimization)
6.  [Structured Data (Schema Markup)](#6-structured-data-schema-markup)

---

### 1. Dynamic Meta Tags with `react-helmet-async`

For an SPA, the content of `<head>` is not updated on route changes by default. We need a library to manage document head changes. `react-helmet-async` is a great choice for this. It allows you to control your document head from your components.

**Step 1: Installation**
```bash
pnpm add react-helmet-async
```

**Step 2: Setup `HelmetProvider`**
Wrap your application with `HelmetProvider` to provide the context for `react-helmet-async`. This is best done in your entry file.

In `src/main.jsx`:
```jsx
// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router';
import { HelmetProvider } from 'react-helmet-async'; // Import
import './index.css'
import App from './App.jsx';
import ClientProjectPage from './pages/ClientProjectPage.jsx';
import PricingPage from './pages/PricingPage.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <HelmetProvider> {/* Add HelmetProvider here */}
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/project/:clientName" element={<ClientProjectPage />} />
          <Route path="/pricing" element={<PricingPage />} />
        </Routes>
      </HelmetProvider>
    </StrictMode>
  </BrowserRouter>
)
```

**Step 3: Use the `Helmet` component**
Now you can use the `<Helmet>` component in your page components to set meta tags.

Example for your `App.jsx` (Home Page):
```jsx
// src/App.jsx
import { Helmet } from 'react-helmet-async';
// ... other imports

export default function App() {
  // ... component logic
  return (
    <>
      <Helmet>
        <title>Namlapan Studios - Creative Digital Solutions</title>
        <meta name="description" content="Namlapan Studios offers creative digital solutions including web development, 3D modeling, and interactive experiences." />
        <link rel="canonical" href="https://yourwebsite.com/" />
      </Helmet>
      {/* ... rest of your component */}
    </>
  );
}
```

For dynamic pages like `ClientProjectPage.jsx`, you can use route parameters to generate unique titles and descriptions.

---

### 2. Adding a `sitemap.xml`

A sitemap helps search engines discover all the pages on your site. We can use `vite-plugin-sitemap` to generate it at build time.

**Step 1: Installation**
```bash
pnpm add -D vite-plugin-sitemap
```

**Step 2: Configure Vite**
Add the plugin to your `vite.config.js`.

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import sitemap from 'vite-plugin-sitemap' // Import

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(), 
    sitemap({
      hostname: 'https://yourwebsite.com', // Replace with your domain
      // You can add dynamic routes here if needed
      // dynamicRoutes: ['/project/project-a', '/project/project-b'] 
    })
  ],
  // ... other config
})
```
When you run `pnpm build`, a `sitemap.xml` will be generated in your `dist` folder.

---

### 3. Adding a `robots.txt`

The `robots.txt` file tells search engine crawlers which pages or files the crawler can or can't request from your site. `vite-plugin-robots` is a good option.

**Step 1: Installation**
```bash
pnpm add -D vite-plugin-robots
```

**Step 2: Configure Vite**
Add it to `vite.config.js`.

```js
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import sitemap from 'vite-plugin-sitemap'
import robots from 'vite-plugin-robots' // Import

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(), 
    sitemap({ hostname: 'https://yourwebsite.com' }),
    robots({
      UserAgent: '*',
      Allow: '/',
      Sitemap: 'https://yourwebsite.com/sitemap.xml',
    })
  ],
  // ... other config
})
```
This will generate a `robots.txt` in your `dist` folder upon build.

---

### 4. Open Graph (OG) and Social Media Sharing

Open Graph meta tags control how your content appears when shared on social media platforms like Facebook, Twitter, and LinkedIn. You can add these using `react-helmet-async`.

Place an image (e.g., `og-image.png`) in your `public` folder.

Example in `App.jsx`:
```jsx
// src/App.jsx
<Helmet>
  <title>Namlapan Studios - Creative Digital Solutions</title>
  <meta name="description" content="Namlapan Studios offers creative digital solutions..." />
  
  {/* Open Graph / Facebook */}
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://yourwebsite.com/" />
  <meta property="og:title" content="Namlapan Studios - Creative Digital Solutions" />
  <meta property="og:description" content="Namlapan Studios offers creative digital solutions..." />
  <meta property="og:image" content="https://yourwebsite.com/og-image.png" />

  {/* Twitter */}
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://yourwebsite.com/" />
  <meta property="twitter:title" content="Namlapan Studios - Creative Digital Solutions" />
  <meta property="twitter:description" content="Namlapan Studios offers creative digital solutions..." />
  <meta property="twitter:image" content="https://yourwebsite.com/og-image.png" />
</Helmet>
```

---

### 5. Lighthouse and Performance Optimization

Lighthouse is a tool that audits your site for performance, accessibility, and SEO.

*   **Performance**: Your project uses Vite, which already does a great job with bundling and optimization. Ensure your images are optimized (e.g., using WebP format) and that your 3D models are compressed as much as possible without losing quality.
*   **Accessibility**: Use semantic HTML. For example, use `<nav>`, `<main>`, `<section>`, and `<footer>` elements. Ensure all interactive elements are keyboard-navigable and that images have `alt` tags.
*   **Best Practices**: Your project seems to be using HTTPS, which is great.

---

### 6. Structured Data (Schema Markup)

Structured data helps search engines understand the content of your page. For a studio/agency website, you can use `LocalBusiness` or `Organization` schema.

You can add this as a `<script type="application/ld+json">` tag using `react-helmet-async`.

Example in `App.jsx`:
```jsx
// src/App.jsx
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Namlapan Studios",
  "url": "https://yourwebsite.com/",
  "logo": "https://yourwebsite.com/namlapan-favicon.svg",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-XXX-XXX-XXXX", // Your phone number
    "contactType": "customer service"
  }
};

// In your component's return statement:
<Helmet>
  {/* ... other tags */}
  <script type="application/ld+json">
    {JSON.stringify(structuredData)}
  </script>
</Helmet>
```

By following these steps, you will significantly improve the SEO of your client-side rendered React application. Remember to replace placeholder URLs like `https://yourwebsite.com` with your actual domain name.
