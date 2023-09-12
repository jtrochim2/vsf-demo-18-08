// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    typeCheck: true,
  },
  runtimeConfig: {
    public: {
      NUXT_PUBLIC_SDK_SAPCC_API_URL: process.env.NUXT_PUBLIC_SDK_SAPCC_API_URL ?? 'http://localhost:8181/sapcc',
      NUXT_PUBLIC_SDK_SAPCC_SSR_API_URL: process.env.NUXT_PUBLIC_SDK_SAPCC_SSR_API_URL ?? 'http://localhost:8181/sapcc',
      NUXT_PUBLIC_SDK_CNTF_API_URL: process.env.NUXT_PUBLIC_SDK_CNTF_API_URL ?? 'http://localhost:8181/cntf',
      NUXT_PUBLIC_CATEGORY_ITEMS_PER_PAGE: process.env.NUXT_PUBLIC_CATEGORY_ITEMS_PER_PAGE ?? '24',
      NUXT_PUBLIC_MAX_VISIBLE_CATEGORIES: process.env.NUXT_PUBLIC_MAX_VISIBLE_CATEGORIES ?? '5',
    },
  },
  app: {
    head: {
      viewport: 'minimum-scale=1, initial-scale=1, width=device-width',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { name: 'description', content: 'VSF x Nuxt3 (Boilerplate)' },
        { name: 'theme-color', content: '#018937' },
      ],
      link: [
        { rel: 'icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/icons/apple-touch-icon-180x180.png' },
      ],
    },
  },
  appConfig: {
    titleSuffix: 'Vue Storefront Nuxt3 Boilerplate',
  },
  imports: {
    dirs: ['composables/**', 'utils/**'],
  },
  css: ['~/assets/style.scss'],
  image: {
    screens: {
      '4xl': 1920,
      '3xl': 1536,
      '2xl': 1366,
      xl: 1280,
      lg: 1024,
      md: 768,
      sm: 640,
      xs: 376,
      '2xs': 360,
    },
    cloudinary: {
      baseURL: process.env.NUXT_PUBLIC_CLOUDINARY_BASE_URL ?? 'https://res.cloudinary.com/vsf-sap/image/upload/',
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          'Red Hat Display': [400, 500, 700],
          'Red Hat Text': [300, 400, 500, 700],
        },
      },
    ],
    [
      '@nuxtjs/i18n',
      {
        locales: [
          {
            code: 'en',
            file: 'en.json',
          },
        ],
        lazy: true,
        langDir: 'lang',
        defaultLocale: 'en',
      },
    ],
    '@nuxt/image',
    '@vite-pwa/nuxt',
    'nuxt-vitest',
  ],
  nitro: {
    compressPublicAssets: true,
  },
  routeRules: {
    '/_ipx/**': { headers: { 'cache-control': `public, max-age=31536000, immutable` } },
    '/icons/**': { headers: { 'cache-control': `public, max-age=31536000, immutable` } },
    '/favicon.ico': { headers: { 'cache-control': `public, max-age=31536000, immutable` } },
    '/category': { swr: 3600 },
  },
  pwa: {
    registerType: 'autoUpdate',
    workbox: {
      navigateFallback: null,
      globPatterns: ['**/*.{js,json,css,html,ico,svg,png,webp,ico,woff,woff2,ttf,eit,otf}', 'icons/*'],
      globIgnores: ['manifest**.webmanifest'],
      additionalManifestEntries: [
        {
          url: '/offline',
          revision: Math.random().toString(32),
        },
      ],
      navigationPreload: true,
      runtimeCaching: [
        {
          urlPattern: ({ url, request }) => {
            const isSameOrigin = self.origin === url.origin;
            if (!isSameOrigin) return false;
            const { pathname } = url;
            /* Have to validate this condition otherwise empty `prefetch` request would be cached there */
            return !pathname.startsWith('/api/') && request.headers.get('purpose') !== 'prefetch';
          },
          handler: 'NetworkFirst',
          options: {
            cacheName: 'others',
            expiration: {
              maxEntries: 32,
              maxAgeSeconds: 60 * 60 * 24, // one day [s]
            },
            networkTimeoutSeconds: 10,
          },
        },
        {
          urlPattern: ({ request }) => request.mode === 'navigate',
          handler: 'NetworkOnly',
          options: {
            precacheFallback: {
              fallbackURL: '/offline',
            },
          },
        },
      ],
      cleanupOutdatedCaches: true,
    },
    manifest: {
      name: 'VSF x Nuxt3 (Boilerplate)',
      short_name: 'VSFNuxt3Boilerplate',
      theme_color: '#018937',
      icons: [
        {
          src: 'icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: 'icons/icon-512x512.maskable.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
    registerWebManifestInRouteRules: true,
  },
});
