var gulp = require('gulp');
var stylus = require('./gulp/stylus');
var javascript = require('./gulp/javascript');
var livereload = require('gulp-livereload')


//Imported tasks
gulp.task('lint', require('./gulp/eslint'));

// gulp.task('analyze', []);

gulp.task('compile stylus', stylus.compile());
gulp.task('build css', stylus.cssBuild());
gulp.task('watch stylus', stylus.watchStylus());
gulp.task('watch css', stylus.watchCss());

gulp.task('build plugins js' , javascript.buildPlugins())
gulp.task('build scripts js' , javascript.buildScripts())
gulp.task('build js', ['build plugins js', 'build scripts js']);
gulp.task('watch js', javascript.watch());


gulp.task('livereload watch', livereload.listen());

gulp.task('default', [
    // 'analyze',
                    // 'livereload watch',
                    // 'compile stylus',
                    // 'build css',
                    'build js',
                    // 'watch css',
                    // 'watch stylus',
                    // 'watch js'])

