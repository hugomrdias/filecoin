import starlight from '@astrojs/starlight'
import { docsPlugin } from '@hugomrdias/docs/starlight-typedoc'
import { defineConfig } from 'astro/config'
import ecTwoSlash from 'expressive-code-twoslash'
import starlightLlmsTxt from 'starlight-llms-txt'

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
      social: [
        {
          icon: 'github',
          label: 'Github',
          href: 'https://github.com/hugomrdias/filecoin',
        },
        {
          icon: 'x.com',
          label: 'X',
          href: 'https://x.com/hugomrdias',
        },
      ],
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
          label: 'Guides',
          autogenerate: { directory: 'guides' },
        },
        {
          label: 'Reference',
          collapsed: true,
          autogenerate: { directory: 'reference' },
        },
      ],
      expressiveCode: {
        plugins: [
          ecTwoSlash({
            twoslashOptions: {
              compilerOptions: {
                allowUmdGlobalAccess: true,
                lib: ['ESNext', 'DOM', 'DOM.Iterable'],
              },
            },
          }),
        ],
      },
      plugins: [
        starlightLlmsTxt(),
        docsPlugin({
          pagination: true,
          outputDirectory: 'reference',
          typeDocOptions: {
            entryPointStrategy: 'packages',
            entryPoints: ['../packages/*'],
            tsconfig: '../tsconfig.json',
            gitRevision: 'main',
            // useCodeBlocks: true,
            parametersFormat: 'table',
            indexFormat: 'table',
            plugin: ['typedoc-plugin-mdn-links'],
          },
        }),
      ],
    }),
  ],
})
