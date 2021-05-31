const gulp = require('gulp');
const shell = require('gulp-shell');
const del = require('del')

gulp.task('hugoServe', shell.task('hugo server -D --watch --i18n-warnings --path-warnings --disableFastRender', {
    env: { MODE: 'development', ...process.env }
}));

gulp.task('hugoBuild', shell.task('hugo -e "production" --minify --debug --i18n-warnings --path-warnings', {
    env: { MODE: 'production', 'NODE_ENV': 'production', ...process.env }
}));

function cleanOutput() {
    return del(['./output/']);
}

const watch = gulp.series('hugoServe');
const build = gulp.series(cleanOutput,'hugoBuild');


// expose tasks to CLI
exports.watch = watch;
exports.build = build;
exports.default = watch;