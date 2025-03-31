import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import ecTwoSlash from 'expressive-code-twoslash'
import starlightLlmsTxt from 'starlight-llms-txt'
import { createStarlightTypeDocPlugin } from 'starlight-typedoc'

const [corePlugin, coreSidebar] = createStarlightTypeDocPlugin()

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
          label: 'Packages',
          autogenerate: { directory: 'packages' },
        },
        // Add the typedoc generated sidebar group to the sidebar.
        coreSidebar,
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
        corePlugin({
          pagination: true,
          sidebar: {
            label: 'Reference',
            collapsed: false,
          },

          entryPoints: ['../packages/*'],
          typeDoc: {
            entryPointStrategy: 'packages',
            packageOptions: {
              readme: 'none',
              groupOrder: [
                'Functions',
                'Classes',
                'Variables',
                'Interfaces',
                'Enums',
                'Type Aliases',
                'References',
              ],
              // excludeExternals: true,
              gitRevision: 'main',
              // placeInternalsInOwningModule: true,
            },
            plugin: [
              // 'typedoc-plugin-missing-exports',
              'typedoc-plugin-zod',
              'typedoc-plugin-mdn-links',
            ],
            parametersFormat: 'table',
            expandObjects: true,
            expandParameters: true,
            useCodeBlocks: true,
          },
          tsconfig: '../tsconfig.json',
        }),
      ],
    }),
  ],
})
