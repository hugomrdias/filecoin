import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import ecTwoSlash from 'expressive-code-twoslash'
import starlightLlmsTxt from 'starlight-llms-txt'
import starlightTypeDoc, { typeDocSidebarGroup } from 'starlight-typedoc'

const site = 'https://filecoin.hugomrdias.dev'
// https://astro.build/config
export default defineConfig({
  site,
  integrations: [
    starlight({
      title: 'iso-filecoin',
      logo: { src: './public/filecoin-logo.svg', alt: 'iso-filecoin' },
      favicon: 'filecoin-logo.svg',
      head: [
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: new URL('og.jpg?v=1', site).href,
          },
        },
        {
          tag: 'meta',
          attrs: {
            property: 'og:image:alt',
            content: 'Connect apps to the Filecoin blockhain with iso-filecoin',
          },
        },
      ],
      social: {
        github: 'https://github.com/hugomrdias/filecoin',
        'x.com': 'https://x.com/hugomrdias',
      },
      editLink: {
        baseUrl: 'https://github.com/hugomrdias/filecoin/edit/main/docs/',
      },
      lastUpdated: true,
      sidebar: [
        {
          label: 'Introduction',
          autogenerate: { directory: 'intro' },
        },
        {
          label: 'Integrations',
          autogenerate: { directory: 'reference' },
        },
        // Add the typedoc generated sidebar group to the sidebar.
        typeDocSidebarGroup,
      ],
      expressiveCode: {
        plugins: [ecTwoSlash()],
      },
      plugins: [
        starlightLlmsTxt(),
        starlightTypeDoc({
          pagination: true,
          sidebar: {
            label: 'API Reference',
            collapsed: false,
          },
          entryPoints: [
            '../packages/iso-filecoin/src/address.js',
            '../packages/iso-filecoin/src/chains.js',
            '../packages/iso-filecoin/src/ledger.js',
            '../packages/iso-filecoin/src/message.js',
            '../packages/iso-filecoin/src/rpc.js',
            '../packages/iso-filecoin/src/signature.js',
            '../packages/iso-filecoin/src/token.js',
            '../packages/iso-filecoin/src/types.js',
            '../packages/iso-filecoin/src/utils.js',
            '../packages/iso-filecoin/src/wallet.js',
            '../packages/iso-filecoin/src/adapters/*.js',
          ],
          typeDoc: {
            githubPages: true,
            gitRevision: 'main',
            plugin: [
              'typedoc-plugin-missing-exports',
              'typedoc-plugin-zod',
              'typedoc-plugin-mdn-links',
            ],
            parametersFormat: 'table',
            expandObjects: true,
            expandParameters: true,
            useCodeBlocks: true,
          },
          tsconfig: '../packages/iso-filecoin/tsconfig.json',
        }),
      ],
    }),
  ],
})
