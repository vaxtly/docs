import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Vaxtly Docs',
  description: 'User manual for Vaxtly — a fast, native API client',
  base: '/docs/',

  head: [
    ['link', { rel: 'icon', href: '/docs/favicon.ico' }]
  ],

  appearance: 'dark',

  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Vaxtly',

    nav: [
      { text: 'Home', link: 'https://vaxtly.app' },
      { text: 'Download', link: 'https://vaxtly.app/#download' }
    ],

    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/getting-started' },
          { text: 'Collections & Folders', link: '/collections-folders' },
          { text: 'Request Builder', link: '/request-builder' },
          { text: 'Headers & Query Params', link: '/headers-params' },
          { text: 'Request Body', link: '/request-body' },
          { text: 'Authentication', link: '/authentication' },
          { text: 'Environments & Variables', link: '/environments' },
          { text: 'Scripts', link: '/scripts' },
          { text: 'Response Viewer', link: '/response-viewer' },
          { text: 'Code Generation', link: '/code-generation' }
        ]
      },
      {
        text: 'Advanced',
        items: [
          { text: 'Remote Sync (Git)', link: '/remote-sync' },
          { text: 'Vault Integration', link: '/vault' },
          { text: 'Data Management', link: '/data-management' },
          { text: 'Keyboard Shortcuts', link: '/keyboard-shortcuts' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vaxtly/app' }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: 'Built with VitePress',
      copyright: '© 2025 Vaxtly'
    }
  }
})
