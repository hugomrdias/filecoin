import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'
import ecTwoSlash from 'expressive-code-twoslash'
import starlightLlmsTxt from 'starlight-llms-txt'
import starlightTypeDoc, { typeDocSidebarGroup } from 'starlight-typedoc'

// https://astro.build/config
export default defineConfig({
  site: 'https://hugomrdias.github.io/filecoin',
  integrations: [
    starlight({
      title: 'iso-filecoin',
      logo: { src: './public/filecoin-logo.svg' },
      favicon: 'filecoin-logo.svg',
      social: {
        github: 'https://github.com/hugomrdias/filecoin',
        'x.com': 'https://x.com/hugomrdias',
      },
      editLink: {
        baseUrl: 'https://github.com/hugomrdias/filecoin/edit/main/website/',
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
        plugins: [
          ecTwoSlash({
            twoslashOptions: {
              compilerOptions: {
                composite: true,
              },
            },
          }),
        ],
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
            '../packages/iso-filecoin/src/*.js',
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
