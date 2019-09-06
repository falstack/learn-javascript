module.exports = {
  base: process.env.NODE_ENV === 'production' ? '/learn-javascript/' : '/',
  theme: 'simple',
  themeConfig: {
    author: '冰淤'
  },
  plugins: ['permalink-pinyin']
}
