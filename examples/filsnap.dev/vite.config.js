import react from '@vitejs/plugin-react'
import * as child from 'child_process'
import * as git from 'tiny-git-rev-sync'
import { defineConfig } from 'vite'
import { analyzer } from 'vite-bundle-analyzer'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import { VitePWA } from 'vite-plugin-pwa'

const commitHash = child.execSync('git rev-parse HEAD').toString()

export default defineConfig({
  define: {
    'import.meta.env.GIT_COMMIT_HASH': JSON.stringify(commitHash),
    'import.meta.env.GIT_BRANCH': JSON.stringify(git.gitBranch()),
    'import.meta.env.GIT_DATE': JSON.stringify(git.gitDate()),
    'import.meta.env.GIT_TAG': JSON.stringify(git.gitTag()),
    'import.meta.env.GITHUB_WORKFLOW_ID': JSON.stringify(
      process.env.GITHUB_WORKFLOW_ID
    ),
  },
  build: {
    minify: true,
  },
  plugins: [
    nodePolyfills({
      include: ['buffer'],
      globals: {
        Buffer: true,
      },
    }),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['filecoin-logo.svg'],
      manifest: {
        name: 'Filsnap',
        short_name: 'Filsnap',
        description:
          'Connect to all native Filecoin wallets, FEVM accounts and send FIL to Native and FEVM accounts.',
        categories: ['finance', 'wallet', 'blockchain', 'ethereum', 'filecoin'],
        theme_color: '#0290FF',
        background_color: '#121212',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        screenshots: [
          {
            src: '/2560x1440_wide-2-optimized.png',
            sizes: '2560x1440',
            type: 'image/png',
            form_factor: 'wide',
          },
          {
            src: '/2560x1440_wide-1-optimized.png',
            sizes: '2560x1440',
            type: 'image/png',
            form_factor: 'wide',
          },
          {
            src: '/2560x1440_wide-3-optimized.png',
            sizes: '2560x1440',
            type: 'image/png',
            form_factor: 'wide',
          },
          {
            src: '/1290x2796_narrow-3-optimized.png',
            sizes: '1290x2796',
            type: 'image/png',
            form_factor: 'narrow',
          },
          {
            src: '/1290x2796_narrow-2-optimized.png',
            sizes: '1290x2796',
            type: 'image/png',
            form_factor: 'narrow',
          },
          {
            src: '/1290x2796_narrow-1-optimized.png',
            sizes: '1290x2796',
            type: 'image/png',
            form_factor: 'narrow',
          },
        ],
      },
      workbox: {
        navigateFallback: '/',
        globPatterns: ['**/*.{js,css,html,png,svg,ico,txt,xml}'],
      },
      pwaAssets: {
        image: 'public/filecoin-logo.svg',
      },
    }),
    // analyzer(),
  ],
})
