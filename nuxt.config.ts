// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],
  components: [
    {
      path: '~/components',
      pathPrefix: true, 
    },
  ],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Интернет-магазин компьютерной техники в Ташкенте | BRANDSTORE.UZ',
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' } 
  },
})