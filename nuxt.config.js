export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  mode: 'universal',
  head: {
    title: 'ADVon.me - Платформа для рекламодателей',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    {
      src: '@/assets/styles/index.scss', lang: 'scss'
    }
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/main',
    { src: "~/plugins/google-maps", ssr: true },
    { src: "~/plugins/chart", ssr: true },
    { src: "~/plugins/filters", ssr: true },
    { src: '~/plugins/vue-awesome-swiper', ssr: false },
  ],


  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/robots',
    '@nuxt/http',
    '@nuxtjs/recaptcha',
    '@nuxtjs/device',
  ],

  recaptcha: {
    siteKey: '6Lcgq9oUAAAAACPRo1uGg-9f5pdeYCbGOM9KbDDs',
    version: 2,
    dataSize: 'normal',
    size: 'normal'
  },

  robots: {
    UserAgent: '*',
    Disallow: '/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config, ctx) {
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))
      svgRule.test = /\.(png|jpe?g|gif|webp)$/
      config.module.rules.push({
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /inline/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  plugins: ['@babel/plugin-proposal-object-rest-spread']
                }
              },
              {
                loader: 'vue-svg-loader'
              }
            ]
          },
          {
            loader: 'file-loader',
            query: {
              name: 'assets/[name].[hash:8].[ext]'
            }
          }
        ]
      })
      config.module.rules.push({
        test: /\.js$/,
        include: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-proposal-object-rest-spread']
            }
          }
        ]
      })
      config.resolve.alias.Mixins = '~/mixins'
    },
    extractCSS: { ignoreOrder: true },
    transpile: [/^vue2-google-maps($|\/)/],
  },

  styleResources: {
    scss: [
      '@/assets/styles/base/_variables.scss',
      '@/assets/styles/base/_mixins.scss'
    ]
  },
  axios: {
    baseURL: 'https://api.advon.test.ut.in.ua/api/v1/',
    proxyHeaders: false,
    credentials: false
  },
  auth: {
    strategies: {
      local: {
        scheme: 'refresh',
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24
        },
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'data.token' },
          refresh: { url: '/refresh', method: 'post', propertyName: 'data.token' },
          user: { url: '/getProfile', method: 'get', propertyName: 'data' },
          logout: false
        }
      }
    }
  }
}
