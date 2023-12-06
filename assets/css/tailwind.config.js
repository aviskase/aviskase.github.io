const themeDir = __dirname + '/../../';

module.exports = {
  // === Removing unused css === //

  // 1. Provide an array of paths to all of your template files using the purge option
  content: [
    themeDir + 'layouts/**/*.html',
    themeDir + 'content/**/*.html',
    'layouts/**/*.html',
    'content/**/*.html',
    'exampleSite/layouts/**/*.html',
    'exampleSite/content/**/*.html',
  ],
  theme: {
    screens: {
      'normal': '50em',
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
        bglight: 'var(--color-bglight)',
        bgcode: 'var(--color-bg-code)'
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
  plugins: [],
}