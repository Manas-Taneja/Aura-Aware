import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), 
    reactRouter(), 
    tsconfigPaths(),
    VitePWA({
      // This ensures the service worker is updated automatically
      // so the user always has the latest version.
      registerType: 'autoUpdate',
      
      // This tells the service worker to cache these assets
      // as soon as it's installed. Make sure these files exist
      // in your `public` folder.
      includeAssets: ['favicon.svg', 'apple-touch-icon.png'],
      
      // This is the core configuration for the install prompt.
      manifest: {
        name: 'Aura Aware',
        short_name: 'AuraAware',
        description: 'Your partner in proactive breast health.',
        theme_color: '#ffffff', // Often the main app background
        background_color: '#fdf2f8', // Color for the splash screen
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png', // Place in `public` folder
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png', // Place in `public` folder
            sizes: '512x512',
            type: 'image/png'
          },
          {
            // A "maskable" icon is required for a good experience on Android.
            src: 'pwa-512x512.png', // Place in `public` folder
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
});
