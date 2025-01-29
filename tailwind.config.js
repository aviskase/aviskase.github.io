/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '');
const rem = (px) => `${round(px / 16)}rem`
const em = (px, base) => `${round(px / base)}em`;

const extraSizes = {
  sm: {
    css: {
      'p > code, li > code': { // kbd
        fontSize: em(12, 14),
        borderRadius: rem(5),
        paddingTop: em(2, 14),
        paddingRight: em(5, 14),
        paddingBottom: em(2, 14),
        paddingLeft: em(5, 14),
      },
      'thead th': {
        paddingTop: em(8, 12)
      },
      'thead th:first-child, tbody td:first-child, tfoot td:first-child': {
        paddingLeft: em(12, 12)
      },
      'thead th:last-child, tbody td:last-child, tfoot td:last-child': {
        paddingRight: em(12, 12)
      },
      '.callout': { // blockquote
        marginTop: em(24+6, 18),
        marginBottom: em(24, 18),
        paddingLeft: em(20, 18),
      }
    }
  },
  lg: {
    css: {
      'p > code, li > code': { // kbd
        fontSize: em(16, 18),
        borderRadius: rem(5),
        paddingTop: em(4, 18),
        paddingRight: em(8, 18),
        paddingBottom: em(4, 18),
        paddingLeft: em(8, 18),
      },
      'thead th': {
        paddingTop: em(12, 16)
      },
      'thead th:first-child, tbody td:first-child, tfoot td:first-child': {
        paddingLeft: em(12, 16)
      },
      'thead th:last-child, tbody td:last-child, tfoot td:last-child': {
        paddingRight: em(12, 16)
      },
      '.callout': { // blockquote
        marginTop: em(40+6, 24),
        marginBottom: em(40, 24),
        paddingLeft: em(24, 24),
      }
    }
  },
  xl: {
    css: {
      'p > code, li > code': { // kbd
        fontSize: em(18, 20),
        borderRadius: rem(5),
        paddingTop: em(5, 20),
        paddingRight: em(8, 20),
        paddingBottom: em(5, 20),
        paddingLeft: em(8, 20),
      },
      'thead th': {
        paddingTop: em(16, 18)
      },
      'thead th:first-child, tbody td:first-child, tfoot td:first-child': {
        paddingLeft: em(12, 18)
      },
      'thead th:last-child, tbody td:last-child, tfoot td:last-child': {
        paddingRight: em(12, 18)
      },
      '.callout': { // blockquote
        marginTop: em(48+6, 30),
        marginBottom: em(48, 30),
        paddingLeft: em(32, 30),
      }
    }
  },
  '2xl': {
    css: {
      'p > code, li > code': { // kbd
        fontSize: em(20, 24),
        borderRadius: rem(6),
        paddingTop: em(6, 24),
        paddingRight: em(8, 24),
        paddingBottom: em(6, 24),
        paddingLeft: em(8, 24),
      },
      'thead th': {
        paddingTop: em(16, 20)
      },
      'thead th:first-child, tbody td:first-child, tfoot td:first-child': {
        paddingLeft: em(12, 20)
      },
      'thead th:last-child, tbody td:last-child, tfoot td:last-child': {
        paddingRight: em(12, 20)
      },
      '.callout': { // blockquote
        marginTop: em(64+6, 36),
        marginBottom: em(64, 36),
        paddingLeft: em(40, 36),
      }
    }
  }
}

module.exports = {
  content: ['./hugo_stats.json'],
  theme: {
    fontFamily: {
      'mono': '"JetBrains Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    },
    extend: {
      // TODO: use variables for colors - theme
      // TODO: header
      typography: (theme) => ({
        DEFAULT: {
          css: {
            code: {
              fontWeight: 'regular',
            },
            'p > code, li > code': {
              fontSize: em(14, 16),
              borderRadius: rem(5),
              paddingTop: em(3, 16),
              paddingRight: em(6, 16),
              paddingBottom: em(3, 16),
              paddingLeft: em(6, 16),
              backgroundColor: theme('colors.slate.200')
            },
            'p > code::before, li > code::before': {
              content: 'none'
            },
            'p > code::after, li > code::after': {
              content: 'none'
            },
            'ol > li::marker': {
              color: theme('colors.blue.500'),
            },
            'ul > li::marker': {
              color: theme('colors.blue.500'),
            },
            hr: {
              border: 'none',
              height: '1px',
              background: `radial-gradient(circle, ${theme('colors.blue.500')} 0%, ${theme('colors.blue.400')} 50%, ${theme('colors.amber.300')}, transparent)`,
            },
            em: {
              color: theme('colors.blue.500'),
              letterSpacing: '-0.025em',
            },
            a: { 
              color: 'var(--tw-prose-body)',
              textDecorationLine: 'none',
            },
            'thead': {
              backgroundColor: theme('colors.amber.300'),
              border: 'none',
            },
            'tbody tr': {
              borderBottomColor: theme('colors.amber.300')
            },
            'thead th': {
              paddingTop: em(8, 14)
            },
            'thead th:first-child, tbody td:first-child, tfoot td:first-child': {
              paddingLeft: em(8, 14)
            },
            'thead th:last-child, tbody td:last-child, tfoot td:last-child': {
              paddingRight: em(8, 14)
            },
            blockquote: {
              paddingTop: rem(1),
              paddingRight: rem(6),
              paddingBottom: rem(1),
              borderRadius: `${rem(3)} ${rem(6)} ${rem(6)} ${rem(3)}`,
              fontStyle: 'regular',
              quotes: 'none',
              color: 'var(--tw-prose-body)',
              borderLeftColor: theme('colors.slate.500'),
              backgroundColor: theme('colors.slate.100'),
            },
            '.callout': {
              marginTop: em(32+6, 20),
              marginBottom: em(32, 20),
              paddingLeft: em(20, 20),
              paddingTop: rem(1),
              paddingRight: rem(1),
              paddingBottom: rem(1),
              borderRadius: `${rem(3)} ${rem(6)} ${rem(6)} ${rem(3)}`,
              position: 'relative',
              fontWeight: '500',
              borderLeftWidth: '0.25rem',

              '& .callout-icon': {
                position: 'absolute',
                borderRadius: '50%',
                top: 0,
                left: 0,
                transform: 'translate(-50%, -50%)',
                padding: rem(6),
                backgroundColor: theme('colors.white'),
              },

              '&.note': {
                borderLeftColor: theme('colors.indigo.500'),
                backgroundColor: theme('colors.indigo.100'),
                '& .callout-icon': { color: theme('colors.indigo.500')}
              },
              '&.warning': {
                borderLeftColor: theme('colors.rose.500'),
                backgroundColor: theme('colors.rose.100'),
                '& .callout-icon': { color: theme('colors.rose.500')}
              },
              '&.cta': {
                borderLeftColor: theme('colors.yellow.500'),
                backgroundColor: theme('colors.yellow.100'),
                '& .callout-icon': { color: theme('colors.yellow.500')}
              }
            }
          },
        },
        ...extraSizes,
      })
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}