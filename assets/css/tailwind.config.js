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
      'normal': '47.5em',
    },
    fontSize: {
      '16': '1.6rem',
      '19': '1.9rem',
      '24': '2.4rem'
    },
    extend: {
      colors: {
        // This colors are defined on the theme stylesheet
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        tertiary: 'var(--color-tertiary)',
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
        articleContent: '1fr min(76rem, calc(100% - 3rem)) 1fr'
      },
      maxWidth: {
        normal: '76rem'
      },
      spacing: {
        '4.5': '4.5rem',
        'r32': '3.2rem'
      }
    },
  },
  variants: {},
  plugins: [],
}