const themeDir = __dirname + '/../../';

module.exports = {
    plugins: [
        require('postcss-import')({
            path: [themeDir]
        }), 
        require('postcss-simple-vars'),
        require('postcss-nested'),
        require('tailwindcss')(themeDir + 'assets/css/tailwind.config.js'),
        require('postcss-font-magician')({ 
            custom: {
                Nunito: { 
                    variants: {
                        normal: {
                            normal: {
                                url: {
                                    woff2: '/fonts/nunito-v14-regular.woff2',
                                    woff: '/fonts/nunito-v14-regular.woff',
                                }
                            },
                            600: {
                                url: {
                                    woff2: '/fonts/nunito-v14-600.woff2',
                                    woff: '/fonts/nunito-v14-600.woff',
                                }
                            },
                            bold: {
                                url: {
                                    woff2: '/fonts/nunito-v14-700.woff2',
                                    woff: '/fonts/nunito-v14-700.woff',
                                }
                            }
                        },
                        italic: {
                            normal: {
                                url: {
                                    woff2: '/fonts/nunito-v14-italic.woff2',
                                    woff: '/fonts/nunito-v14-italic.woff',
                                }
                            },
                            bold: {
                                url: {
                                    woff2: '/fonts/nunito-v14-700italic.woff2',
                                    woff: '/fonts/nunito-v14-700italic.woff',
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
                                    woff: '/fonts/Bellota-BoldItalic.woff'
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
                                    woff: '/fonts/JetBrainsMono-Regular.woff'
                                }
                            },
                            bold: {
                                url: {
                                    woff2: '/fonts/JetBrainsMono-Bold.woff2',
                                    woff: '/fonts/JetBrainsMono-Bold.woff'
                                }
                            }
                        },
                        italic: {
                            normal: {
                                url: {
                                    woff2: '/fonts/JetBrainsMono-Italic.woff2',
                                    woff: '/fonts/JetBrainsMono-Italic.woff'
                                }
                            },
                            bold: {
                                url: {
                                    woff2: '/fonts/JetBrainsMono-Bold-Italic.woff2',
                                    woff: '/fonts/JetBrainsMono-Bold-Italic.woff'
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