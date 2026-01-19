// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui', '@pinia/nuxt', 'nuxt-auth-utils'],

  app: {
    head: {
      title: 'EventO app',
    },
  },
  css: ['./app/assets/css/main.css'],
  ui: {
    colorMode: false,
  },

  runtimeConfig: {
    session: {
      maxAge: 60 * 60 * 24 * 30,
      password: process.env.NUXT_SESSION_PASSWORD!,
    },
  },
});
