module.exports = {
  base: process.env.NODE_ENV === 'production' ? '/learn-javascript/' : '/',
  title: '{ do something }',
  description: '用简单的言语，表达超载的心',
  theme: 'simple',
  evergreen: true,
  themeConfig: {
    author: '冰淤'
  },
  head: [
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }]
  ],
  plugins: [
    'clean-urls',
    'permalink-pinyin',
    ['vuepress-plugin-zooming', {
      selector: '.content__default :not(a) > img',
    }],
    'vuepress-plugin-nprogress',
    ['mathjax', {
      target: 'svg',
      macros: {
        '*': '\\times',
      },
    }],
  ]
}
