import * as child from 'child_process'
import react from '@vitejs/plugin-react'
import * as git from 'tiny-git-rev-sync'
import { defineConfig } from 'vite'
import { analyzer } from 'vite-bundle-analyzer'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

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
    // analyzer(),
  ],
})
