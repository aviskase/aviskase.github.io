const themeDir = __dirname + '/../../';

module.exports = {
    plugins: [
        require('postcss-import')({
            path: [themeDir]
        }), 
        require('postcss-simple-vars'),
        require('postcss-nested'),
        require('tailwindcss')(themeDir + 'assets/css/tailwind.config.js'),
        require('autoprefixer')({
            path: [themeDir]
        }),
    ]
}