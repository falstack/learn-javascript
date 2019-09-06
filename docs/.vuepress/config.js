module.exports = {
  base: process.env.NODE_ENV === 'production' ? '/learn-javascript/' : '/',
  title: '{ do something }',
  description: '用简单的言语，表达超载的心',
  theme: 'simple',
  themeConfig: {
    author: '冰淤'
  },
  plugins: ['permalink-pinyin']
}
