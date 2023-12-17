const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./hugo_stats.json'],
  theme: {
    screens: {
      'normal': '50em',
    },
    fontSize: {
      '16': '1.6rem',
      '19': '1.9rem',
      '24': '2.4rem'
    },
    fontFamily: {
      'mono': '"JetBrains Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      'sans': 'Nunito, Univers, Calibri, "Gill Sans", "Gill Sans MT", "Myriad Pro", Myriad, "DejaVu Sans Condensed", "Liberation Sans", "Nimbus Sans L", Tahoma, Geneva, "Helvetica Neue", Helvetica, Arial, sans-serif',
      'serif': ['Bellota', ...defaultTheme.fontFamily.serif],
    },
    extend: {
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
        'r32': '3.2rem',
        'bleed': '2.25rem',
        'bleed-negative': '-2.25rem',
      }
    },
  },
  plugins: [],
}