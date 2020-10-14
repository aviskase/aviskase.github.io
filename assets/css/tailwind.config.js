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
    screens: {
      'normal': '48em',
    },
    extend: {
      colors: {
        // This colors are defined on the theme stylesheet
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        bgdark: 'var(--color-bgdark)',
        bglight: 'var(--color-bglight)'
      },
      fontFamily: {
        primary: 'var(--font-primary)'
      },
      gridTemplateRows: {
        mainLayout: 'auto 1fr auto'
      },
      gridTemplateColumns: {
        articleContent: '1fr min(65ch, calc(100% - 3rem)) 1fr'
      }
    },
  },
  variants: {},
  plugins: [],
}