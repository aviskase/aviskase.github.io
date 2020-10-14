const themeDir = __dirname + '/../../';

module.exports = {
  // === Removing unused css === //

  // 1. Provide an array of paths to all of your template files using the purge option
  purge: [
    themeDir + 'layouts/**/*.html',
    themeDir + 'content/**/*.html',
    'layouts/**/*.html',
    'content/**/*.html',
    'exampleSite/layouts/**/*.html',
    'exampleSite/content/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        // This colors are defined on the theme stylesheet
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        bgdark: 'var(--color-bgdark)',
        bglight: 'var(--color-bglight)'
      },
      fontFamily: {
        nunito: 'Nunito'
      }
    },
  },
  variants: {},
  plugins: [],
}