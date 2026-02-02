import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import remarkGfm from 'remark-gfm';
import { remarkAlert } from 'remark-github-blockquote-alert';

export default defineConfig({
  site: 'https://mututuki456.com',
  integrations: [mdx(), sitemap()],
  
  markdown: {
    shikiConfig: {
      theme: 'dark-plus',
      wrap: false,
    },
    remarkPlugins: [
      remarkGfm,
      remarkAlert, 
    ],
  },
  vite: {
    plugins: [tailwindcss()],
  },
});