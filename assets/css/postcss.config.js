const themeDir = __dirname + '/../../';

module.exports = {
    plugins: [
        require('postcss-import')({
            path: [themeDir]
        }), 
        require('postcss-simple-vars'),
        require('tailwindcss/nesting'),
        require('tailwindcss')(themeDir + 'assets/css/tailwind.config.js'),
        require('postcss-font-magician')({ 
            custom: {
                Nunito: { 
                    variants: {
                        normal: {
                            normal: {
                                url: {
                                    woff2: '/fonts/nunito-v14-regular.woff2',
                                }
                            },
                            600: {
                                url: {
                                    woff2: '/fonts/nunito-v14-600.woff2',
                                }
                            },
                            bold: {
                                url: {
                                    woff2: '/fonts/nunito-v14-700.woff2',
                                }
                            }
                        },
                        italic: {
                            normal: {
                                url: {
                                    woff2: '/fonts/nunito-v14-italic.woff2',
                                }
                            },
                            bold: {
                                url: {
                                    woff2: '/fonts/nunito-v14-700italic.woff2',
                                }
                            }
                        }
                    }
                },
                Bellota: {
                    variants: {
                        italic: {
                            bold: {
                                url: {
                                    woff2: '/fonts/Bellota-BoldItalic.woff2',
                                }
                            }
                        }
                    }
                },
                'JetBrains Mono': {
                    variants: {
                        normal: {
                            normal: {
                                url: {
                                    woff2: '/fonts/JetBrainsMono-Regular.woff2',
                                }
                            },
                            bold: {
                                url: {
                                    woff2: '/fonts/JetBrainsMono-Bold.woff2',
                                }
                            }
                        },
                        italic: {
                            normal: {
                                url: {
                                    woff2: '/fonts/JetBrainsMono-Italic.woff2',
                                }
                            },
                            bold: {
                                url: {
                                    woff2: '/fonts/JetBrainsMono-BoldItalic.woff2',
                                }
                            }
                        }
                    }
                }
            }
        }),
        require('autoprefixer')({
            path: [themeDir]
        }),
    ]
}